// basic scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 9;

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


/*markers*/
let markers = []; 
let markerData = [
    {
        position: [0.72974, 0.87934, 0.09538],
        headline: 'one',
        description: '',
    },
    {
        position: [0.85983, -0.19375, 0.92985],
        headline: 'two',
        description: '',
    }
];

// add light
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1000, 1000 );

scene.add( spotLight);

// add controls to click and rotate 
const controls = new THREE.OrbitControls( camera, renderer.domElement );

// only rotate on y angle
controls.minPolarAngle = controls.maxPolarAngle = Math.PI/2; //
controls.addEventListener( 'change', onCameraUpdate );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 5, 1 );
controls.update();

// add our 3d model
const loader = new THREE.GLTFLoader();
loader.load( 'model/saxophone3.gltf', function ( gltf ) {

    gltf.scene.rotation.set(THREE.Math.degToRad(0), THREE.Math.degToRad(0), THREE.Math.degToRad(0)); //rotation at start
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
	//controls.update();

    renderer.render( scene, camera ); // what we render 
};

animate();

Object.keys(markerData).forEach(function(key){
    marker = markerData[key];
    console.log(marker);

    //make a container
    const markerContainer = new THREE.Object3D();

    // create geometry
    var geometry = new THREE.TorusGeometry(0.07, 0.02, 3, 200);
    var material = new THREE.MeshBasicMaterial({color:0xcccccc});
    const torus = new THREE.Mesh(geometry, material);
    markerContainer.add(torus);

    var geometry = new THREE.CircleGeometry(0.05, 32);
    var material = new THREE.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:0.5});
    const circle = new THREE.Mesh(geometry, material);
    markerContainer.add(circle);

    markerContainer.position.set(marker.position[0], marker.position[1], marker.position[2]);
    scene.add(markerContainer);
});
/*end of markers*/

/*onCameraUpdate*/
function onCameraUpdate(){
    let cameraAngle = controls.getAzimuthalAngle();
    markers.forEach(function(marker){
      marker.rotation.set(0, cameraAngle, 0);
    });
}
/*end of onCameraUpdate*/


/*helper to position things*/
function addHelper(){
    var geometry = new THREE.SphereGeometry(0.3,32,32);
    var material = new THREE.MeshBasicMaterial({color:0xFF0000});
    const markerhelper = new THREE.Mesh(geometry, material);
    scene.add(markerhelper);
    markerhelper.position.set(0,1,0)

    var gui = new dat.GUI(); // a controller
    gui.add(markerhelper.position, 'x', -1, 1).step(0.00001);
    gui.add(markerhelper.position, 'y', -1, 2).step(0.00001);
    gui.add(markerhelper.position, 'z', -3, 4).step(0.00001);
}
addHelper();
/*end of helper*/