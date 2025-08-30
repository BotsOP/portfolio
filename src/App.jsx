import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {useRef} from "react";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { useLoader } from '@react-three/fiber'
import vertexShader from './shaders/vertexTest.glsl';
import fragmentShader from './shaders/fragmentTest.glsl';
import * as THREE from "three";


const RotatingModel = () => {
    const meshRef = useRef();
    const obj = useLoader(OBJLoader, "/monkey.obj"); // 👈 loaded model

    // Apply a shader material to all meshes inside the OBJ
    obj.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.ShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms: {
                    uTime: { value: 0 },
                },
            });
        }
    });

    useFrame(({ clock }) => {
        if (meshRef.current) {
            // meshRef.current.rotation.y += 0.01;
            // meshRef.current.rotation.x += 0.01;

            // update shader uniform
            meshRef.current.traverse((child) => {
                if (child.isMesh && child.material.uniforms) {
                    child.material.uniforms.uTime.value = clock.getElapsedTime();
                }
            });
        }
    });

    return (
        <primitive ref={meshRef} object={obj} scale={0.5} position={[0, -1, 0]} />
    );
};

const RotatingCube = () => {
    const meshRef = useRef();

    useFrame(() => {
        if(meshRef.current) {
            meshRef.current.rotation.y += 0.01
            meshRef.current.rotation.x += 0.01
        }
    })

    return (
        <mesh ref={meshRef}>
            <cylinderGeometry args={[1, 1, 1]}/>
            <meshLambertMaterial color="#468585" emissive="#468585"/>
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{ uTime: { value: 0 } }}
            />
        </mesh>
    )
}

const Scene = () => {
    const obj = useLoader(OBJLoader, '/monkey.obj');

    return <primitive object={obj} scale={0.5} position={[0, -1, 0]} />;
};

const App = () => {
    return (
        <Canvas style={{height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <OrbitControls enableZoom enablePan enableRotate />
            <directionalLight position={[1, 1, 1]} intensity={10} color={0x9CDBA6}/>
            <color attach='background' args={['#F0F0F0']}/>

            {/*<RotatingCube/>*/}
            {/*<Scene/>*/}
            <RotatingModel/>
        </Canvas>
    )
}

export default App;