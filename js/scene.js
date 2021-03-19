// basic scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

//render
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xffffff); // background
document.body.appendChild( renderer.domElement );

// add cube to scene
/*const geometry = new THREE.BoxGeometry(1,1,1);
//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); //this material has no light or shadows
const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } ); 
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );*/

// add light
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1000, 1000 );

scene.add( spotLight);

// add controls to click and rotate 
const controls = new THREE.OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 5, 1 );
controls.update();

// add our 3d model
const loader = new THREE.GLTFLoader();
loader.load( 'model/saxophone3.gltf', function ( gltf ) {

    gltf.scene.rotation.set(THREE.Math.degToRad(300), THREE.Math.degToRad(0), THREE.Math.degToRad(0)); //rotation at start
	scene.add( gltf.scene );

}, undefined, function ( error ) {
	console.error( error );
} );

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
