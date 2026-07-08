"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type SimProps = { count: number };

function Sim({ count }: SimProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { viewport, pointer, gl } = useThree();
  const burst = useRef({ x: 0, y: 0, t: 0 });

  // click/tap anywhere over the hero fires a radial shockwave
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      )
        return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      burst.current = {
        x: (nx * viewport.width) / 2,
        y: (ny * viewport.height) / 2,
        t: 0.5,
      };
    };
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, [gl, viewport.width, viewport.height]);

  const { home, pos, vel, colors, pairs, linePositions } = useMemo(() => {
    const w = Math.max(viewport.width, 10);
    const h = Math.max(viewport.height, 6);
    const home = new Float32Array(count * 3);
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const coral = new THREE.Color("#ff4d4d");
    const dim = new THREE.Color("#3c3c4a");

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * w * 1.15;
      const y = (Math.random() - 0.5) * h * 1.15;
      const z = (Math.random() - 0.5) * 1.5;
      home.set([x, y, z], i * 3);
      pos.set([x, y, z], i * 3);
      const c = Math.random() < 0.18 ? coral : dim;
      colors.set([c.r, c.g, c.b], i * 3);
    }

    // precompute neighbour pairs (neural-net edges) from home positions
    const pairs: number[] = [];
    const maxDist = Math.min(w, h) / 9;
    const maxPairs = count * 2;
    outer: for (let i = 0; i < count; i++) {
      let linked = 0;
      for (let j = i + 1; j < count && linked < 2; j++) {
        const dx = home[i * 3] - home[j * 3];
        const dy = home[i * 3 + 1] - home[j * 3 + 1];
        if (dx * dx + dy * dy < maxDist * maxDist) {
          pairs.push(i, j);
          linked++;
          if (pairs.length >= maxPairs * 2) break outer;
        }
      }
    }
    const linePositions = new Float32Array(pairs.length * 3);
    return { home, pos, vel, colors, pairs, linePositions };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const mx = (pointer.x * viewport.width) / 2;
    const my = (pointer.y * viewport.height) / 2;
    const repelR = 2.2;
    const repelR2 = repelR * repelR;

    const b = burst.current;
    const bursting = b.t > 0;
    if (bursting) b.t -= delta;
    const burstR = 3.6;
    const burstR2 = burstR * burstR;
    const burstDecay = bursting ? b.t / 0.5 : 0;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const dx = pos[ix] - mx;
      const dy = pos[ix + 1] - my;
      const d2 = dx * dx + dy * dy;

      // repel from cursor
      if (d2 < repelR2 && d2 > 0.0001) {
        const d = Math.sqrt(d2);
        const f = ((repelR - d) / repelR) * 14;
        vel[ix] += (dx / d) * f * delta;
        vel[ix + 1] += (dy / d) * f * delta;
      }

      // click shockwave — strong radial impulse that decays over ~0.5s
      if (bursting) {
        const bx = pos[ix] - b.x;
        const by = pos[ix + 1] - b.y;
        const bd2 = bx * bx + by * by;
        if (bd2 < burstR2 && bd2 > 0.0001) {
          const bd = Math.sqrt(bd2);
          const bf = ((burstR - bd) / burstR) * 95 * burstDecay;
          vel[ix] += (bx / bd) * bf * delta;
          vel[ix + 1] += (by / bd) * bf * delta;
        }
      }

      // spring home + damping
      vel[ix] += (home[ix] - pos[ix]) * 1.6 * delta;
      vel[ix + 1] += (home[ix + 1] - pos[ix + 1]) * 1.6 * delta;
      vel[ix] *= 0.94;
      vel[ix + 1] *= 0.94;

      pos[ix] += vel[ix] * delta * 60 * 0.016;
      pos[ix + 1] += vel[ix + 1] * delta * 60 * 0.016;
    }

    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.attributes
        .position as THREE.BufferAttribute;
      attr.array = pos;
      attr.needsUpdate = true;
    }

    if (linesRef.current) {
      for (let p = 0; p < pairs.length; p++) {
        const src = pairs[p] * 3;
        linePositions[p * 3] = pos[src];
        linePositions[p * 3 + 1] = pos[src + 1];
        linePositions[p * 3 + 2] = pos[src + 2];
      }
      const attr = linesRef.current.geometry.attributes
        .position as THREE.BufferAttribute;
      attr.array = linePositions;
      attr.needsUpdate = true;
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#ff4d4d"
          transparent
          opacity={0.07}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
}

export default function ParticleField({ count = 1400 }: { count?: number }) {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 8], fov: 55 }}
      dpr={[1, 1.75]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <Sim count={count} />
    </Canvas>
  );
}
