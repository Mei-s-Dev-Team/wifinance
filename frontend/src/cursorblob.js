import React, { useEffect, useRef } from 'react';
import './cursorblob.css';

const CursorBlob = () => {
  
  const blobRef = useRef(null);
  const mouseXRef = useRef(null);
  const mouseYRef = useRef(null);
  const velocityXRef = useRef(0);
  const velocityYRef = useRef(0);

  useEffect(() => {
    const blob = blobRef.current;

    document.addEventListener('mousemove', handleMouseMove);

    function handleMouseMove(event) {
      if (blob) {
        mouseXRef.current = event.clientX;
        mouseYRef.current = event.clientY;
      }
    }

    const updateBlobPosition = () => {
      if (blob) {
        const mouseX = mouseXRef.current;
        const mouseY = mouseYRef.current;

        const blobRect = blob.getBoundingClientRect();
        const blobX = blobRect.left + blobRect.width / 2;
        const blobY = blobRect.top + blobRect.height / 2;

        const dx = mouseX - blobX;
        const dy = mouseY - blobY;

        const maxSpeed = 1;
        const acceleration = 0.0001;
        /* ideal accel 0.0001 */
        const deceleration = 1250;
        /* ideal decel 1000-10000 */

        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = Math.min(distance * acceleration, maxSpeed);

        const angle = Math.atan2(dy, dx);
        const targetX = blobX + Math.cos(angle) * distance * speed;
        const targetY = blobY + Math.sin(angle) * distance * speed;

        const lag = 0.15;
        const newX = blobX + (targetX - blobX) * lag;
        const newY = blobY + (targetY - blobY) * lag;

        const velocityX = (newX - blobX) * deceleration;
        const velocityY = (newY - blobY) * deceleration;

        velocityXRef.current = velocityX;
        velocityYRef.current = velocityY;

        blob.style.transform = `translate(${newX - blobRect.width / 2}px, ${newY - blobRect.height / 2}px)`;

        requestAnimationFrame(updateBlobPosition);
      }
    };

    updateBlobPosition();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
      <div ref={blobRef} className="blob"></div>
  );
}

export default CursorBlob;
