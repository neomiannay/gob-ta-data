import * as THREE from "three";
import Experience from "../Experience.js";
import Connector from "./Connector/Connector.js";
import social_network_colors from "../../data/social_network_colors.json";

export default class Android {
  constructor(_coords, _data, _sortedTimeData, _createLight) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.resource = this.resources.items.android;

    this.coords = _coords;
    this.data = _data;
    this.sortedTimeData = _sortedTimeData;
    this.createLight = _createLight;

    this.mostUsed = Object.keys(this.data).sort((a, b) => {
      return this.data[b] - this.data[a];
    })[4];

    this.color = new THREE.Color(social_network_colors[this.mostUsed]);

    this.weight = this.data.globalScreenTime / 200;

    this.setModel();
    this.setConnector();

    if (this.mostUsed === "globalScreenTime") {
      this.destroy();
    }
  }

  setModel() {
    this.model = this.resource.scene.clone();
    this.model.scale.set(0.2, 0.2, 0.2);
    this.model.rotation.y = Math.random() * Math.PI * 2;
    this.model.name = "android";
    this.model.position.set(this.coords.x, this.coords.y, this.coords.z);

    this.scene.add(this.model);
  }

  setConnector() {
    this.connector = new Connector(
      [
        new THREE.Vector3(this.coords.x, this.coords.y, this.coords.z),
        new THREE.Vector3(
          -2,
          20,
          (this.coords.z > 20 ? 56 : 0) -
            this.sortedTimeData.findIndex((d) => d[0] === this.mostUsed) +
            11.5
        ),
      ],
      this.color,
      this.weight,
      this.createLight
    );
  }

  update() {
    this.connector.update();
  }
  destroyLight() {
    this.connector.destroyLight();
  }

  destroy() {
    this.connector.destroy();
    this.scene.remove(this.model);
  }
}
