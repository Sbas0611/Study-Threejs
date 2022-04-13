import { render } from "@testing-library/react";
import React from "react";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const Scene = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const currentMount = mountRef.current;

        //Scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(25, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 10;
        scene.add(camera);

        //Renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);

        //Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target = new THREE.Vector3(3, 3, 3);


        //cube
        const cube = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({color: 0x00ff00})
        );
        scene.add(cube);
        cube.position.z = -5;

        //sphere
        const sphere = new THREE.Mesh( 
            new THREE.SphereGeometry( 0.8, 32, 16 ),
            new THREE.MeshBasicMaterial( { color: 0xffff00 }) 
        );
        scene.add(sphere);
        sphere.position.set(2, -2, 0);

        //Torus
        const torus = new THREE.Mesh( 
            new THREE.TorusGeometry( 0.85, 0.3, 8, 6 ),
            new THREE.MeshBasicMaterial( { color: 0xffff00 } ) 
        );
        scene.add( torus );
        torus.position.set(-2, 2, 0);
        torus.scale.set(0.5, 0.5, 0.5);

        //mesh
        const geometry = new THREE.RingGeometry( 1, 5, 32 );
        const material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide } );
        const mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );
        mesh.position.set(-5, 4, 2);
        mesh.scale.set(0.5, 1, 3, 1, 0);


        //render the scene  and camera
        const animate = () => {
            renderer.render(scene, camera)
            requestAnimationFrame(animate);
        }
        animate();

        //Clean up scene 
        return () => {
            currentMount.removeChild(renderer.domElement);
        }

    }, []);
    return (
        <div
            className="Contenedor3D"
            ref= {mountRef}
            style= {{ width: "100%", height: "100vh" }}
        >

        </div>
    );
}

export default Scene;