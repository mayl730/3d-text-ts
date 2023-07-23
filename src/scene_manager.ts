import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function SceneManager(canvas: HTMLCanvasElement) {
  const scene = new THREE.Scene();

  // TODO: remove for the production
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  const screenSizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const camera = new THREE.PerspectiveCamera(
    75,
    screenSizes.width / screenSizes.height,
    0.1,
    100
  );
  camera.position.z = 3;
  scene.add(camera);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });

  renderer.setSize(screenSizes.width, screenSizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const cursor = {
    x: -0.5,
    y: -0.5,
  };

  window.addEventListener("resize", handleScreenResize);
  window.addEventListener("mousemove", handleMouseMove);

  function handleMouseMove(event: MouseEvent) {
    cursor.x = event.clientX / screenSizes.width - 1;
    cursor.y = event.clientY / screenSizes.height - 1;
  }

  function handleScreenResize() {
    screenSizes.width = window.innerWidth;
    screenSizes.height = window.innerHeight;

    camera.aspect = screenSizes.width / screenSizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(screenSizes.width, screenSizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  function animate() {
    camera.position.x = cursor.x;
    camera.position.y = cursor.y;

    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  return {
    getScene: function () {
      return scene;
    },
  };
}
