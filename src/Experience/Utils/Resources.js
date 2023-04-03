import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import EventEmitter from "./EventEmitter.js";

export default class Experience extends EventEmitter {
  constructor(sources) {
    super();

    // Options
    this.sources = sources;

    // Setup
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.dracoLoader = new DRACOLoader();
    this.loaders.dracoLoader.setDecoderPath("/draco/");
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);

    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      switch (source.type) {
        case "gltfModel":
          this.loaders.gltfLoader.load(source.path, (gltf) => {
            this.sourceLoaded(source, gltf);
            // this.items[source.name] = gltf
            // this.onLoad()
          });
          break;

        case "texture":
          this.loaders.textureLoader.load(source.path, (texture) => {
            this.sourceLoaded(source, texture);
            // this.items[source.name] = texture
            // this.onLoad()
          });
          break;

        case "cubeTexture":
          this.loaders.cubeTextureLoader.load(source.path, (cubeTexture) => {
            this.sourceLoaded(source, cubeTexture);
            // this.items[source.name] = cubeTexture
            // this.onLoad()
          });
          break;
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;

    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
