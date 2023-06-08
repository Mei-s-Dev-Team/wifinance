import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import './piedata.css';

const ThreeJSObject = ({ values, colors }) => {
  const canvasRef = useRef(null);
  const [selectedPiece, setSelectedPiece] = useState(null);

  useEffect(() => {
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Set the background color to transparent
    canvasRef.current.appendChild(renderer.domElement);

    // Set up camera position
    camera.position.z = 5;

    // Set up controls for dragging and rotating the camera
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;

    // Create individual pie pieces based on the given values and colors
    const piePieces = [];
    let startAngle = 0;
    values.forEach((value, index) => {
      const angle = (value / values.reduce((sum, value) => sum + value, 0)) * Math.PI * 2;

      // Create the shape representing the circle
      const circleShape = new THREE.Shape();
      circleShape.moveTo(0, 0);
      circleShape.arc(0, 0, 1, startAngle, startAngle + angle);
      circleShape.lineTo(0, 0);

      const geometry = new THREE.ExtrudeGeometry(circleShape, {
        depth: 0.2,
        bevelEnabled: false,
        curveSegments: 32, // Increase curveSegments for smoother geometry
        steps: 1, // Set steps to 1 to avoid unnecessary subdivisions
      });
      const material = new THREE.MeshPhongMaterial({
        color: colors[index],
        side: THREE.DoubleSide, // Render both sides of the geometry
      });
      const mesh = new THREE.Mesh(geometry, material);

      // Create a wrapper object for each pie piece
      const wrapper = new THREE.Object3D();
      wrapper.add(mesh);
      wrapper.position.set(0, 0, 0); // Set initial position of the wrapper

      // Adjust the position of the pie piece on the x, y, and z axes
      const radius = 0.05; // Distance between pie pieces
      const posX = Math.cos(startAngle + angle / 2) * radius;
      const posY = Math.sin(startAngle + angle / 2) * radius;
      const posZ = 0;
      wrapper.position.set(posX, posY, posZ);

      // Add the wrapper object to the scene
      scene.add(wrapper);

      // Store the pie piece and its wrapper in the array for later use
      piePieces.push({ mesh, wrapper });

      // Update the start angle for the next pie piece
      startAngle += angle;
    });

    // Adjust the positions of the pie pieces so they connect at the center
    const centerOffsetX = -(piePieces.reduce((sum, piece) => sum + piece.wrapper.position.x, 0) / piePieces.length);
    const centerOffsetY = -(piePieces.reduce((sum, piece) => sum + piece.wrapper.position.y, 0) / piePieces.length);
    piePieces.forEach((piece) => {
      piece.wrapper.position.x += centerOffsetX;
      piece.wrapper.position.y += centerOffsetY;
    });

    // Event listener for selecting/unselecting a pie piece
    const handleClick = (event) => {
      event.preventDefault();

      // Get the normalized device coordinates of the click position
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Raycast to check if any pie piece is clicked
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(piePieces.map((piece) => piece.mesh));

      if (intersects.length > 0) {
        const clickedPiece = intersects[0].object;

        if (clickedPiece === selectedPiece) {
          // If the clicked piece is already selected, unselect it and move it back to its original position
          gsap.to(clickedPiece.parent.position, { z: 0, duration: 0.5 });
          setSelectedPiece(null);
        } else {
          // If a different piece is clicked, unselect the previously selected piece (if any) and move it back to its original position
          if (selectedPiece) {
            gsap.to(selectedPiece.parent.position, { z: 0, duration: 0.5 });
          }

          // Move the clicked piece forward on the z-axis
          gsap.to(clickedPiece.parent.position, { z: 1, duration: 0.5 });
          setSelectedPiece(clickedPiece);
        }
      } else if (selectedPiece) {
        // If the user clicks outside any pie piece and there's a selected piece, unselect it and move it back to its original position
        gsap.to(selectedPiece.parent.position, { z: 0, duration: 0.5 });
        setSelectedPiece(null);
      }
    };

    // Add event listener to handle pie piece selection/unselection
    window.addEventListener('click', handleClick, false);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update controls
      controls.update();

      // Render the scene
      renderer.render(scene, camera);
    };

    // Start the animation loop
    animate();

    // Clean up
    return () => {
      window.removeEventListener('click', handleClick);
      scene.remove(...piePieces.map((piece) => piece.wrapper));
      renderer.dispose();
    };
  }, [values, colors]);

  return (
    <div className="three-js-canvas-container">
      <div className="three-js-canvas" ref={canvasRef} />
    </div>
  );
};

const MyComponent = () => {
  const values = [30, 45, 25];
  const colors = [0xff0000, 0x00ff00, 0x0000ff];

  return (
    <div>
      <div className="background-pie" />
      <div className="my-component">
        <ThreeJSObject values={values} colors={colors} />
      </div>
    </div>
  );
};

export default MyComponent;
