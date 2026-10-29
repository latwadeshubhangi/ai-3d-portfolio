import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Particle field that drifts slowly and follows the mouse (parallax). */
function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < a.length; i++) a[i] = (Math.random() - 0.5) * 12;
    return a;
  }, [count]);
  useFrame((s, dt) => {
    const p = ref.current; if (!p) return;
    p.rotation.y += dt * 0.03;
    p.position.x = THREE.MathUtils.lerp(p.position.x, s.pointer.x * 0.4, 0.05);
    p.position.y = THREE.MathUtils.lerp(p.position.y, s.pointer.y * 0.3, 0.05);
  });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial size={0.03} color="#7dd3fc" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

/** Floating wireframe shape. */
function Shape({ kind, pos, speed }: { kind: 'ico' | 'oct' | 'torus'; pos: [number, number, number]; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(s => {
    const m = ref.current; if (!m) return;
    const t = s.clock.elapsedTime * speed;
    m.rotation.set(t, t * 0.7, 0);
    m.position.y = pos[1] + Math.sin(t) * 0.2;
  });
  return (
    <mesh ref={ref} position={pos}>
      {kind === 'ico' ? <icosahedronGeometry args={[0.6, 0]} /> : kind === 'oct' ? <octahedronGeometry args={[0.5, 0]} /> : <torusGeometry args={[0.4, 0.12, 8, 24]} />}
      <meshStandardMaterial color="#38bdf8" wireframe />
    </mesh>
  );
}

export default function Scene3D({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  return (
    <Canvas dpr={[1, 1.5]} frameloop={reduced ? 'demand' : 'always'} camera={{ position: [0, 0, 5], fov: 60 }}
            gl={{ antialias: !mobile, powerPreference: 'low-power' }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 3]} intensity={30} />
      <Particles count={mobile ? 250 : 900} />
      <Shape kind="ico" pos={[-3, 1, -1]} speed={0.4} />
      {!mobile && <Shape kind="oct" pos={[3.2, -1, -2]} speed={0.3} />}
      {!mobile && <Shape kind="torus" pos={[2.4, 1.6, -3]} speed={0.35} />}
    </Canvas>
  );
}
