import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {useRef} from "react";
import { useLoader } from '@react-three/fiber'
import vertexShader from './shaders/vertexTest.glsl';
import fragmentShader from './shaders/fragmentTest.glsl';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";


// function setupAttributes(geometry) {
//     const vectors = [
//         new THREE.Vector3(1, 0, 0),
//         new THREE.Vector3(0, 1, 0),
//         new THREE.Vector3(0, 0, 1),
//     ];
//
//     const position = geometry.attributes.position;
//     const centers = new Float32Array(position.count * 3);
//
//     for (let i = 0; i < position.count; i++) {
//         vectors[i % 3].toArray(centers, i * 3);
//     }
//
//     geometry.setAttribute("center", new THREE.BufferAttribute(centers, 3));
// }

const RotatingFBXModel = () => {
    const meshRef = useRef();
    const fbx = useLoader(FBXLoader, "/suzanne_shield.fbx"); // FBX file in public folder
    const hexNormalsTex = useLoader(EXRLoader, "/Suzanne_HexNormals.exr");
    const hexPositionsTex = useLoader(EXRLoader, "/Suzanne_HexPositions.exr");
    const raycaster = new THREE.Raycaster();

    // Apply shader + custom attributes
    fbx.traverse((child) => {
        if (child.isMesh) {
            // setupAttributes(child.geometry);
            console.log("Attributes:", child.geometry.attributes);
            hexNormalsTex.magFilter = THREE.NearestFilter;
            hexNormalsTex.minFilter = THREE.NearestFilter;

            child.material = new THREE.ShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms: {
                    uTime: { value: 0 },
                    uHexNormal: {value: hexNormalsTex},
                    uHexPosition: {value: hexPositionsTex},
                    uHitPoint: {value: new THREE.Vector3(0, 0, 0)},
                },
                transparent: true,
            });
        }
    });

    useFrame(({ mouse, camera, clock }) => {
        if (meshRef.current) {
            // meshRef.current.rotation.y += 0.01;
            // meshRef.current.rotation.x += 0.01;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(meshRef.current);

            meshRef.current.traverse((child) => {
                if (child.isMesh && child.material?.uniforms?.uTime) {
                    child.material.uniforms.uTime.value = clock.getElapsedTime();
                    if(intersects.length > 0 && child.material.uniforms.uHitPoint) {
                        const hit = intersects[0];
                        // console.log("hit point", hit.point);
                        child.material.uniforms.uHitPoint.value.copy(hit.point);
                    }
                }

            });
        }
    });

    return (
        <primitive ref={meshRef} object={fbx} scale={0.01} position={[0, 0, 0]} />
    );
};

const App = () => {
    return (
        <Canvas style={{height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <OrbitControls enableZoom enablePan enableRotate />
            <directionalLight position={[1, 1, 1]} intensity={10} color={0x9CDBA6}/>
            <color attach='background' args={['#F0F0F0']}/>

            {/*<RotatingCube/>*/}
            {/*<Scene/>*/}
            <RotatingFBXModel/>
        </Canvas>
    )
}

export default App;