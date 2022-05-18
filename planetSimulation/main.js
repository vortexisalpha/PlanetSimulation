import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './style.css'

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

//PLANETS

const marsTexture = new THREE.TextureLoader().load('2k_mars.jpg')
var geometry = new THREE.SphereGeometry(6.790,32,32)
var material = new THREE.MeshStandardMaterial({color: '#681845', map: marsTexture})
const mars = new THREE.Mesh(geometry,material)
scene.add(mars)

const jupiterTexture = new THREE.TextureLoader().load('2k_jupiter.jpg')
var geometry = new THREE.SphereGeometry(70,32,32)
var material = new THREE.MeshStandardMaterial({ color:'#C3B178', map: jupiterTexture})
const jupiter = new THREE.Mesh(geometry,material)
jupiter.position.setX(164)
scene.add(jupiter)


const earthTexture = new THREE.TextureLoader().load('2k_earth_daymap.jpg')
const earthNormal = new THREE.TextureLoader().load('2k_earth_normal.tif')
var geometry = new THREE.SphereGeometry(12.750,32,32)
var material = new THREE.MeshStandardMaterial({ map: earthTexture})
const earth = new THREE.Mesh(geometry,material)
scene.add(earth)

const venusTexture = new THREE.TextureLoader().load('2k_venus_surface.jpg')
var geometry = new THREE.SphereGeometry(6.05,32,32)
var material = new THREE.MeshStandardMaterial({ map: venusTexture})
const venus = new THREE.Mesh(geometry,material)
scene.add(venus)

const mercuryTexture = new THREE.TextureLoader().load('2k_mercury.jpg')
var geometry = new THREE.SphereGeometry(6.05,32,32)
var material = new THREE.MeshStandardMaterial({ map: mercuryTexture})
const mercury = new THREE.Mesh(geometry,material)
scene.add(mercury)


const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(-100,70,55)
pointLight.intensity = 3
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff)
ambientLight.position.set(1,1,11)
ambientLight.intensity = 0.3
scene.add(ambientLight)



//STAR
//function to add a star
function addStar() {
  //define mesh, material and geometry
  
  const geometry = new THREE.SphereGeometry(0.2, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  //this creates random x,y,z components from -1000 to 1000
  const x = Math.floor(Math.random() * 20000) + -10000; 
  const y = Math.floor(Math.random() * 200) + -100; 
  const z = Math.floor(Math.random() * 200) + -100; 


  //set it to this position
  star.position.set(x,y,z)
  scene.add(star)
}

//add 200 stars to the sky
Array(2000).fill().forEach(addStar);


const controls = new OrbitControls(camera,renderer.domElement)

function rotatePlanet(planet, xf,yf,zf){
  planet.rotation.x += xf
  planet.rotation.y += yf
  planet.rotation.z += zf

}

mars.position.setX(34)
earth.position.setX(0)
venus.position.setX(-25)
mercury.position.setX(-45)

var t = 0;
function animate() {
  requestAnimationFrame(animate);
  t++
  rotatePlanet(mars,0.004, 0.001, 0.001)
  rotatePlanet(jupiter,0.0005, 0.001, 0.0005)
  rotatePlanet(earth, 0.003, 0.003,0.001)
  rotatePlanet(venus, 0.005, 0.004,0.001)
  rotatePlanet(mercury, 0.001, 0.004,0.005)

  mars.position.setX(50*Math.cos(t/140))
  mars.position.setY(50*Math.sin(t/140))
  mercury.position.setX(75*Math.cos(t/120))
  mercury.position.setY(75*Math.sin(t/120))
  venus.position.setX(25*Math.cos(t/24))
  venus.position.setY(25*Math.sin(t/24))
  jupiter.position.setX(200*Math.cos(t/1000))
  jupiter.position.setY(200*Math.sin(t/1000))




  controls.update()
  renderer.render(scene,camera)


}
animate()
