import * as THREE from "three";
import { SceneManager } from "./scene_manager.ts";

const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

const sceneManager = SceneManager(canvas);
const scene = sceneManager.getScene();

const material = new THREE.MeshNormalMaterial()
const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 16);
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);