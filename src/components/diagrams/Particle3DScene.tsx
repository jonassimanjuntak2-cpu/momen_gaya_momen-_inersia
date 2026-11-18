import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RotateCcw } from 'lucide-react';

interface ParticleSpec {
  id: string;
  label: string;
  coordsText: string;
  mass: number;
  position: [number, number, number];
  color: number;
  radius: number;
}

const PARTICLES: ParticleSpec[] = [
  {
    id: 'm1',
    label: 'm₁ = 2 kg',
    coordsText: '(3, 0, 4)',
    mass: 2,
    position: [3, 0, 4],
    color: 0x0f766e, // Deep teal
    radius: 0.24,
  },
  {
    id: 'm2',
    label: 'm₂ = 3 kg',
    coordsText: '(0, 2, -2)',
    mass: 3,
    position: [0, 2, -2],
    color: 0xd97706, // Amber
    radius: 0.28,
  },
  {
    id: 'm3',
    label: 'm₃ = 1 kg',
    coordsText: '(-2, 4, 0)',
    mass: 1,
    position: [-2, 4, 0],
    color: 0x0284c7, // Sky blue
    radius: 0.2,
  },
  {
    id: 'm4',
    label: 'm₄ = 4 kg',
    coordsText: '(1, -1, 2)',
    mass: 4,
    position: [1, -1, 2],
    color: 0xdc2626, // Coral red
    radius: 0.31,
  },
];

function detectSoftwareWebGL(): boolean {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl = probeCanvas.getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) ?? '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

function createTextSprite(
  title: string,
  subtitle: string | null,
  accentHex: string,
): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 360;
  canvas.height = subtitle ? 116 : 74;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Pill-free clean technical card tag
    ctx.fillStyle = 'rgba(255, 255, 255, 0.94)';
    ctx.strokeStyle = accentHex;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(6, 6, canvas.width - 12, canvas.height - 12, 14);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 28px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(title, canvas.width / 2, subtitle ? 40 : canvas.height / 2);

    if (subtitle) {
      ctx.fillStyle = accentHex;
      ctx.font = '600 25px "JetBrains Mono", monospace';
      ctx.fillText(subtitle, canvas.width / 2, 80);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(subtitle ? 2.15 : 1.35, subtitle ? 0.69 : 0.44, 1);
  sprite.renderOrder = 20;
  return sprite;
}

function buildAxisGroup(
  dir: THREE.Vector3,
  length: number,
  colorHex: number,
  posLabel: string,
  negLabel: string,
  cssColor: string,
): THREE.Group {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: colorHex,
    roughness: 0.4,
    metalness: 0.15,
  });

  // Main cylinder spanning -length to +length
  const cylGeo = new THREE.CylinderGeometry(0.032, 0.032, length * 2, 12);
  const cyl = new THREE.Mesh(cylGeo, mat);
  const up = new THREE.Vector3(0, 1, 0);
  cyl.quaternion.setFromUnitVectors(up, dir.clone().normalize());
  group.add(cyl);

  // Positive arrow cone
  const coneGeo = new THREE.ConeGeometry(0.11, 0.34, 14);
  const cone = new THREE.Mesh(coneGeo, mat);
  cone.position.copy(dir.clone().normalize().multiplyScalar(length));
  cone.quaternion.setFromUnitVectors(up, dir.clone().normalize());
  group.add(cone);

  const posSprite = createTextSprite(posLabel, null, cssColor);
  posSprite.position.copy(dir.clone().normalize().multiplyScalar(length + 0.55));
  posSprite.scale.set(1.05, 0.42, 1);
  group.add(posSprite);

  const negSprite = createTextSprite(negLabel, null, '#64748B');
  negSprite.position.copy(dir.clone().normalize().multiplyScalar(-(length + 0.45)));
  negSprite.scale.set(0.95, 0.38, 1);
  group.add(negSprite);

  return group;
}

function buildShiftedAxisGroup(
  origin: THREE.Vector3,
  dir: THREE.Vector3,
  length: number,
  colorHex: number,
  label: string,
  cssColor: string,
): THREE.Group {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: colorHex,
    roughness: 0.35,
    metalness: 0.2,
  });

  const norm = dir.clone().normalize();
  const cylGeo = new THREE.CylinderGeometry(0.038, 0.038, length * 2, 12);
  const cyl = new THREE.Mesh(cylGeo, mat);
  cyl.position.copy(origin);
  cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), norm);
  group.add(cyl);

  const sprite = createTextSprite(label, null, cssColor);
  sprite.position.copy(origin.clone().add(norm.clone().multiplyScalar(length + 0.45)));
  sprite.scale.set(1.75, 0.45, 1);
  group.add(sprite);

  return group;
}

interface AxisToggles {
  x: boolean;
  y: boolean;
  z: boolean;
  l1: boolean;
  l2: boolean;
}

export const Particle3DScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [axesVisible, setAxesVisible] = useState<AxisToggles>({
    x: true,
    y: true,
    z: true,
    l1: true,
    l2: true,
  });
  const [cameraResetNonce, setCameraResetNonce] = useState(0);

  const axisRefs = useRef<{
    x?: THREE.Group;
    y?: THREE.Group;
    z?: THREE.Group;
    l1?: THREE.Group;
    l2?: THREE.Group;
    requestRender?: () => void;
    resetCamera?: () => void;
  }>({});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const width = Math.max(container.clientWidth || 320, 260);
    const height = Math.max(container.clientHeight || 340, 300);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);

    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100);
    const initialCamPos = new THREE.Vector3(10.6, 7.6, 11.4);
    camera.position.copy(initialCamPos);
    camera.lookAt(0.4, 1.3, 0.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = false;

    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.touchAction = 'none';
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTex = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    pmremGenerator.dispose();

    // Lighting rig: warm key + cool hemisphere fill
    const hemi = new THREE.HemisphereLight(0xe0f2fe, 0xcbd5e1, 0.85);
    scene.add(hemi);
    const keyLight = new THREE.DirectionalLight(0xfffbeb, 1.4);
    keyLight.position.set(7, 11, 8);
    scene.add(keyLight);

    // Reference XZ ground grid at y = 0 (offset slightly so zero Z-fighting with axes)
    const grid = new THREE.GridHelper(10, 10, 0x94a3b8, 0xe2e8f0);
    grid.position.y = -0.005;
    scene.add(grid);

    // Origin marker
    const originMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.11, 14, 14),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4, metalness: 0.2 }),
    );
    scene.add(originMesh);
    const originLabel = createTextSprite('O (0,0,0)', null, '#0F172A');
    originLabel.position.set(0, -0.5, 0);
    originLabel.scale.set(1.1, 0.36, 1);
    scene.add(originLabel);

    // Build main axes & shifted parallel axes
    const xAxis = buildAxisGroup(new THREE.Vector3(1, 0, 0), 5.0, 0xdc2626, '+X', '-X', '#DC2626');
    const yAxis = buildAxisGroup(new THREE.Vector3(0, 1, 0), 4.6, 0x059669, '+Y', '-Y', '#059669');
    const zAxis = buildAxisGroup(new THREE.Vector3(0, 0, 1), 5.0, 0x0284c7, '+Z', '-Z', '#0284C7');
    const l1Axis = buildShiftedAxisGroup(
      new THREE.Vector3(0, 0, 2),
      new THREE.Vector3(1, 0, 0),
      4.5,
      0xd97706,
      'L₁ (// X: y=0, z=2)',
      '#D97706',
    );
    const l2Axis = buildShiftedAxisGroup(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 1, 0),
      3.8,
      0x7c3aed,
      'L₂ (// Y: x=1, z=0)',
      '#7C3AED',
    );

    scene.add(xAxis, yAxis, zAxis, l1Axis, l2Axis);
    axisRefs.current.x = xAxis;
    axisRefs.current.y = yAxis;
    axisRefs.current.z = zAxis;
    axisRefs.current.l1 = l1Axis;
    axisRefs.current.l2 = l2Axis;

    // Build discrete particles (composite sphere + metallic collar + coordinate guide lines + label)
    const lineMat = new THREE.LineDashedMaterial({
      color: 0x64748b,
      dashSize: 0.2,
      gapSize: 0.14,
    });

    for (const p of PARTICLES) {
      const pGroup = new THREE.Group();
      const [px, py, pz] = p.position;

      const sphereGeo = new THREE.SphereGeometry(p.radius, 22, 18);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: p.color,
        roughness: 0.25,
        metalness: 0.35,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.set(px, py, pz);
      pGroup.add(sphere);

      // Accent equatorial ring for composite craftsmanship
      const ringGeo = new THREE.TorusGeometry(p.radius * 1.15, 0.025, 8, 24);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.4,
        metalness: 0.75,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(px, py, pz);
      ring.rotation.x = Math.PI / 2;
      pGroup.add(ring);

      // Helper coordinate lines: (x,y,z) -> (x,0,z) -> (x,0,0) and (0,0,z)
      const pts: THREE.Vector3[] = [
        new THREE.Vector3(px, py, pz),
        new THREE.Vector3(px, 0, pz),
        new THREE.Vector3(px, 0, 0),
        new THREE.Vector3(px, 0, pz),
        new THREE.Vector3(0, 0, pz),
      ];
      const guideGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const guideLine = new THREE.Line(guideGeo, lineMat);
      guideLine.computeLineDistances();
      pGroup.add(guideLine);

      // Small floor projection dot
      const projDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 10, 10),
        new THREE.MeshBasicMaterial({ color: p.color }),
      );
      projDot.position.set(px, 0, pz);
      pGroup.add(projDot);

      const cssColor = '#' + p.color.toString(16).padStart(6, '0');
      const sprite = createTextSprite(p.label, p.coordsText, cssColor);
      sprite.position.set(px, py + p.radius + 0.52, pz);
      pGroup.add(sprite);

      scene.add(pGroup);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0.4, 1.3, 0.5);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.07;
    controls.enablePan = true;
    controls.minDistance = 4;
    controls.maxDistance = 24;

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    let frameId = 0;
    let renderBusy = false;
    let renderDirty = false;
    let disposed = false;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) {
          if (sync) gl.deleteSync(sync);
          return;
        }
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function requestRender() {
      if (disposed) return;
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = requestAnimationFrame(() => {
        if (disposed) return;
        renderDirty = false;
        const needsMore = controls.update();
        renderer.render(scene, camera);
        const done = () => {
          renderBusy = false;
          if (renderDirty || (needsMore && !isSoftwareGl)) {
            requestRender();
          }
        };
        if (isSoftwareGl) {
          afterDraw(done);
        } else {
          done();
        }
      });
    }

    axisRefs.current.requestRender = requestRender;
    axisRefs.current.resetCamera = () => {
      camera.position.copy(initialCamPos);
      controls.target.set(0.4, 1.3, 0.5);
      controls.update();
      requestRender();
    };

    const handleControlChange = () => requestRender();
    controls.addEventListener('change', handleControlChange);

    const handleResize = () => {
      if (!container || disposed) return;
      const w = Math.max(container.clientWidth, 260);
      const h = Math.max(container.clientHeight, 300);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      requestRender();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    requestRender();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      controls.removeEventListener('change', handleControlChange);
      controls.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        } else if (obj instanceof THREE.Sprite) {
          obj.material.map?.dispose();
          obj.material.dispose();
        }
      });
      envTex.dispose();
      renderer.dispose();
    };
  }, []);

  // Sync axis toggles without recreating WebGL scene
  useEffect(() => {
    if (axisRefs.current.x) axisRefs.current.x.visible = axesVisible.x;
    if (axisRefs.current.y) axisRefs.current.y.visible = axesVisible.y;
    if (axisRefs.current.z) axisRefs.current.z.visible = axesVisible.z;
    if (axisRefs.current.l1) axisRefs.current.l1.visible = axesVisible.l1;
    if (axisRefs.current.l2) axisRefs.current.l2.visible = axesVisible.l2;
    axisRefs.current.requestRender?.();
  }, [axesVisible]);

  useEffect(() => {
    if (cameraResetNonce > 0) {
      axisRefs.current.resetCamera?.();
    }
  }, [cameraResetNonce]);

  const toggleAxis = (key: keyof AxisToggles) => {
    setAxesVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white overflow-hidden">
      {/* Control bar at the TOP of the 3D scene */}
      <div className="bg-slate-50 border-b border-slate-200 px-3 py-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => toggleAxis('x')}
            aria-pressed={axesVisible.x}
            className={`min-h-[36px] px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap ${
              axesVisible.x
                ? 'bg-red-50 text-red-700 border-red-300'
                : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800'
            }`}
          >
            Sumbu X
          </button>
          <button
            type="button"
            onClick={() => toggleAxis('y')}
            aria-pressed={axesVisible.y}
            className={`min-h-[36px] px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap ${
              axesVisible.y
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800'
            }`}
          >
            Sumbu Y
          </button>
          <button
            type="button"
            onClick={() => toggleAxis('z')}
            aria-pressed={axesVisible.z}
            className={`min-h-[36px] px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap ${
              axesVisible.z
                ? 'bg-sky-50 text-sky-700 border-sky-300'
                : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800'
            }`}
          >
            Sumbu Z
          </button>
          <button
            type="button"
            onClick={() => toggleAxis('l1')}
            aria-pressed={axesVisible.l1}
            className={`min-h-[36px] px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap ${
              axesVisible.l1
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800'
            }`}
          >
            Poros L₁ (// X)
          </button>
          <button
            type="button"
            onClick={() => toggleAxis('l2')}
            aria-pressed={axesVisible.l2}
            className={`min-h-[36px] px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap ${
              axesVisible.l2
                ? 'bg-violet-50 text-violet-800 border-violet-300'
                : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800'
            }`}
          >
            Poros L₂ (// Y)
          </button>
        </div>

        <button
          type="button"
          onClick={() => setCameraResetNonce((n) => n + 1)}
          className="min-h-[36px] px-3 py-1 rounded-lg text-xs font-semibold bg-teal-700 text-white hover:bg-teal-800 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          Reset Kamera
        </button>
      </div>

      {/* Dedicated WebGL Mount Container */}
      <div
        ref={mountRef}
        data-testid="threejs-3d-canvas"
        className="w-full h-[320px] sm:h-[400px] bg-slate-50 cursor-grab active:cursor-grabbing"
        aria-label="Model interaktif koordinat Kartesius 3 dimensi untuk empat partikel massa"
      />

      {/* Coordinate table legend */}
      <div className="px-3 sm:px-4 py-3 bg-slate-50 border-t border-slate-200">
        <p className="text-xs text-slate-600 mb-2">
          Geser untuk memutar model 3D · Cubit atau gulir untuk zoom · Koordinat partikel (satuan meter):
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono-num">
          {PARTICLES.map((p) => (
            <div
              key={p.id}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800"
            >
              <span className="font-semibold">{p.label}</span>
              <span className="block text-slate-500">{p.coordsText} m</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
