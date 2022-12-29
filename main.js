
import * as THREE from 'three';
import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';



//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
  75, 
  sizes.width/sizes.height, 
  0.1, 
  1000
);





// place the camera at z of 100
camera.position.z = 50;
const helper = new THREE.CameraHelper( camera );
scene.add( helper );

// add a renderer
const canvas= document.querySelector('.webgl');
var renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( sizes.width,sizes.height);
// add the renderer element to the DOM so it is in our page


const gltfLoader = new GLTFLoader();
gltfLoader.load('./public/assets/modern_dining_room/scene.gltf', (gltf) => {
  gltf.scene.position.set(0,0,0);
  gltf.scene.scale.set(10,11,11);
  scene.add(gltf.scene);
  
})

/* we're creating a cube to put in our scene - don't worry
if you don't follow this part, we'll cover geometry and materials
in future posts */
var geometry = new THREE.SphereGeometry(10, 32, 32);
var material = new THREE.MeshLambertMaterial({color: 0xfd59d7});
var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

//controls
const control = new OrbitControls(camera,canvas);
control.enableDamping = true;


/* we need to add a light so we can see our cube - its almost
as if we're turning on a lightbulb within the room */
var light1 = new THREE.PointLight(0xFFFF00);
/* position the light so it shines on the cube (x, y, z) */
light1.position.set(10, 0, 15);
scene.add(light1);
var light2 = new THREE.PointLight(0xFFFF00);
/* position the light so it shines on the cube (x, y, z) */
light2.position.set(20, 20, 15);
scene.add(light2);


// const size = 1000;
// const divisions = 10;

// const gridHelper = new THREE.GridHelper( size, divisions );
// scene.add( gridHelper );


const dir = new THREE.Vector3( 1, 2, 0 );

//normalize the direction vector (convert to vector of length 1)
dir.normalize();

const origin = new THREE.Vector3( 0, 0, 0 );
const length = 10;
const hex = 0xff0f00;

const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
scene.add( arrowHelper );

var render = function () {
  requestAnimationFrame( render );

  // cube.rotation.x += 0.01; 
  // cube.rotation.y += 0.1;
  renderer.render(scene, camera);
};

render();


//resize
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width,sizes.height)
})


