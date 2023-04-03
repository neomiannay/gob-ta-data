import * as THREE from "three";
import Experience from "../../Experience.js";

export default class RoomDev {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    console.log(`RoomDev loaded in ${this.experience.time.elapsed}ms`);

    this.resource = this.resources.items.roomDev;

    this.setModel();
  }

  setModel() {
    this.model = this.resource.scene;
    // this.model.scale.set(0.2, 0.2, 0.2);
    this.scene.add(this.model);
  }
}
