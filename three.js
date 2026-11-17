const THREE_CDN = 'https://cdn.jsdelivr.net/npm/three@0.149.0/build/three.min.js';

function arrancar() {
  try {
    iniciarPokeball(window.THREE);
  } catch (e) {
    console.error('No se pudo crear la Pokéball 3D:', e);
    document.getElementById('ball3d')?.remove();
  }
}

if (window.THREE) {
  arrancar();
} else {
  const s = document.createElement('script');
  s.src = THREE_CDN;
  s.onload = arrancar;
  s.onerror = () => {
    console.error('No se pudo cargar Three.js');
    document.getElementById('ball3d')?.remove();
  };
  document.head.append(s);
}

function iniciarPokeball(THREE) {
  THREE.ColorManagement.legacyMode = false;

  const box = document.querySelector('.img-box');
  const canvas = document.getElementById('ball3d');

  const pocoMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.physicallyCorrectLights = true;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x9aa3b5, 1.6));
  const luz = new THREE.DirectionalLight(0xffffff, 2.2);
  luz.position.set(3, 4, 5);
  scene.add(luz);

  const rojo   = new THREE.MeshStandardMaterial({ color: 0xC8290A, roughness: 0.35 });
  const blanco = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.45 });
  const negro  = new THREE.MeshStandardMaterial({ color: 0x1B1F2A, roughness: 0.6 });

  const R = 1;
  const pokeball = new THREE.Group();

  const arriba = new THREE.Mesh(new THREE.SphereGeometry(R, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2), rojo);
  const abajo  = new THREE.Mesh(new THREE.SphereGeometry(R, 64, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), blanco);

  const franja = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.01, R * 1.01, 0.12, 64), negro);

  const aro = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.14, 48), negro);
  aro.rotation.x = Math.PI / 2;
  aro.position.z = R * 0.97;

  const boton = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.16, 48), blanco);
  boton.rotation.x = Math.PI / 2;
  boton.position.z = R * 1.0;

  pokeball.add(arriba, abajo, franja, aro, boton);
  pokeball.rotation.x = 0.15;
  scene.add(pokeball);

  function ajustarTamano() {
    const w = box.clientWidth;
    const h = box.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;

    const mitadVisible = (R / 0.7) / Math.min(1, camera.aspect);
    camera.position.z = mitadVisible / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(ajustarTamano).observe(box);
  ajustarTamano();

  const mouse = { x: 0, y: 0 };
  const inclinacion = { x: 0, y: 0 };

  box.addEventListener('pointermove', e => {
    const r = box.getBoundingClientRect();
    mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    mouse.y = ((e.clientY - r.top) / r.height) * 2 - 1;
  });
  box.addEventListener('pointerleave', () => { mouse.x = 0; mouse.y = 0; });

  const segundos = () => performance.now() / 1000;
  let inicioGiro = -Infinity;
  const DURACION_GIRO = 0.9;

  function girar() {
    inicioGiro = segundos();
  }

  window.pokeball3d = { girar };

  function animar() {
    const t = segundos();

    let giro = 0;
    const progreso = (t - inicioGiro) / DURACION_GIRO;
    if (progreso >= 0 && progreso < 1) {
      const frenado = 1 - Math.pow(1 - progreso, 3);
      giro = frenado * Math.PI * 4;
    }

    inclinacion.x += (mouse.y * 0.35 - inclinacion.x) * 0.08;
    inclinacion.y += (mouse.x * 0.5 - inclinacion.y) * 0.08;

    pokeball.rotation.y = Math.sin(t * 0.6) * 0.35 + inclinacion.y + giro;
    pokeball.rotation.x = 0.15 + inclinacion.x;
    pokeball.position.y = Math.sin(t * 1.5) * 0.05;

    renderer.render(scene, camera);
    requestAnimationFrame(animar);
  }

  if (pocoMovimiento) {
    renderer.render(scene, camera);
    new ResizeObserver(() => renderer.render(scene, camera)).observe(box);
  } else {
    animar();
  }
}
