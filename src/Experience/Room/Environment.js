import Experience from "../Experience.js";
import * as THREE from "three";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    // this.SetSunlight();
    this.setAmbientLight();
    // this.environmentMap();
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight("#ffffff", 2);
    this.scene.add(this.ambientLight);
  }

  SetSunlight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 4);
    // this.sunLight.castShadow = true;
    // this.sunLight.shadow.mapSize.set(1024, 1024);
    // this.sunLight.shadow.camera.far = 100;
    // this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(3, 3, -2.25);
    this.scene.add(this.sunLight);

    if (this.debug.active) {
      this.debugFolder
        .add(this.sunLight.position, "x")
        .name("sunLightX")
        .min(-10)
        .max(10)
        .step(0.001);
      this.debugFolder
        .add(this.sunLight.position, "y")
        .name("sunLightY")
        .min(-10)
        .max(10)
        .step(0.001);
      this.debugFolder
        .add(this.sunLight.position, "z")
        .name("sunLightZ")
        .min(-10)
        .max(10)
        .step(0.001);
    }
  }

  environmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 0.4;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    this.environmentMap.texture.encoding = THREE.sRGBEncoding;

    this.scene.environment = this.environmentMap.texture;

    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true; // we say that these materials need to be updated
        }
      });
    };
    this.environmentMap.updateMaterials();

    if (this.debug.active) {
      this.debugFolder
        .addInput(this.environmentMap, "intensity")
        .name("envMapIntensity")
        .min(0)
        .max(4)
        .step(0.001)
        .onChange(() => this.environmentMap.updateMaterials());
    }
  }
}
