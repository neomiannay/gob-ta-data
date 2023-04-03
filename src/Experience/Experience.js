import * as THREE from 'three';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import Room from './Room/Room.js';
import Resources from './Utils/Resources.js';
import Debug from './Utils/Debug.js';
import sources from './sources.js';

let instance = null;

export default class Exprerience
{
    constructor(_canvas)
    {
        if(instance)
        {
            return instance;
        }
        instance = this;

        // Global access
        window.experience = this

        // Options
        this.canvas = _canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.room = new Room()

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.room.update()
        this.renderer.update()
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the all scene
        this.scene.traverse((_child) =>
        {
            if(_child instanceof THREE.Mesh)
            {
                _child.geometry.dispose()

                // loop through the material properties
                for(const key in _child.material)
                {
                    const value = _child.material[key]

                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                    

                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
        {
            // this.debug.gui.destroy()
        }
    }

}