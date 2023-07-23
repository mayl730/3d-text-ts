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

class HelixCurve extends THREE.Curve<THREE.Vector3> {
  static create(): HelixCurve {
    return new HelixCurve();
  }

  getPoint(t: number) {
    const s = (t - 0.5) * 8 * Math.PI;
    return new THREE.Vector3(5 * Math.cos(s), s, 5 * Math.sin(s));
  }
}

const helix = HelixCurve.create();

const tubeGeometry = new THREE.TubeGeometry(helix, 128, 1, 32);

const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 16);

const tubeObject = new THREE.Mesh(tubeGeometry, material);
const scale = 0.05;
tubeObject.scale.set(scale, scale, scale);


const donutObject = new THREE.Mesh(donutGeometry, material);
const sphereObject = new THREE.Mesh(sphereGeometry, material);

scene.add(sphereObject);