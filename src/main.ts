import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { SceneManager } from "./scene_manager.ts";

const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

const sceneManager = SceneManager(canvas);
const scene = sceneManager.getScene();

const material = new THREE.MeshNormalMaterial()

const fontLoader = new FontLoader();

fontLoader.load("/fonts/montserrat_bold.json", (font) => {
  const fontSetting = {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 4,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  };

  const textGeometry1 = new TextGeometry("May's", fontSetting);
  const textGeometry2 = new TextGeometry("3D Web", fontSetting);

  textGeometry1.center();
  textGeometry2.center();
  const text1 = new THREE.Mesh(textGeometry1, material);
  const text2 = new THREE.Mesh(textGeometry2, material);
  text1.position.set(0, 0.3, 0);
  text2.position.set(0, -0.3, 0);
  scene.add(text1, text2);
});