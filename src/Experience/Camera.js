import Experience from "./Experience.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.debug = this.experience.debug;

    this.setInstance();
    this.travalPath();
    this.setOrbitControls();

    this.startAnimation = false;

    if (this.debug.active) {
      this.debug.gui.addButton({ title: "Start Animation" }).on("click", () => {
        this.startAnimation = true;
      });
    }

    this.canTravelLeft = true;
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      10,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );
    this.instance.position.set(180, 180, -150);
    this.scene.add(this.instance);
  }

  travalPath() {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0,
      })
    );
    this.mesh.position.set(-2, 12, 0);

    this.scene.add(this.mesh);
  }

  travelUpdateLeft() {
    this.instance.lookAt(this.mesh.position);
    gsap.to(this.instance.position, {
      x: 160,
      y: 130,
      z: 150,
      duration: 3,
      ease: "power2.inout",
    });
    gsap.to(this.mesh.position, {
      x: -2,
      y: 12,
      z: 60,
      duration: 3,
      ease: "power2.inout",
    });
  }

  travelUpdateRight() {
    this.instance.lookAt(this.mesh.position);
    gsap.to(this.instance.position, {
      x: 160,
      y: 130,
      z: -120,
      duration: 3,
      ease: "power2.inout",
    });
    gsap.to(this.mesh.position, {
      x: -2,
      y: 12,
      z: 0,
      duration: 3,
      ease: "power2.inout",
    });
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true; // move smoothly
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();

    if (this.startAnimation) {
      this.travelUpdateLeft();
    }
  }
}
