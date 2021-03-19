// basic scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

//render
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// add geometry to scene
const geometry = new THREE.BoxGeometry(1,1,1);
//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); //this material has no light or shadows
const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } ); 
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// add light
const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1000, 100 );

const spotLight2 = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1, -100 );

scene.add( spotLight, spotLight2 );

// add controls to click and rotate 
const controls = new THREE.OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 5, 1 );
controls.update();


// render scene
const animate = function () {
    requestAnimationFrame( animate );//animation calls the function again
    // default aniamtion
    /*cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;*/

    // required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

    renderer.render( scene, camera ); // what we render 
};

animate();
