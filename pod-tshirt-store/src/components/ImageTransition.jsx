import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./ImageTransition.css";

const cols = 20;
const rows = 10;

const ImageTransition = ({ images, interval = 4000 }) => {
  const canvasRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRefs = useRef([]);

  useEffect(() => {
      const canvas = canvasRef.current;
  const parent = canvas.parentElement;
  canvas.width = parent.clientWidth;
  canvas.height = parent.clientHeight;

    const ctx = canvasRef.current.getContext("2d");
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;

    const loadImage = (src) =>
      new Promise((res) => {
        const img = new Image();
        img.src = src;
        img.onload = () => res(img);
      });

    const drawTransition = async () => {
      const prev = imageRefs.current[currentIndex];
      const nextIdx = (currentIndex + 1) % images.length;
      const next = await loadImage(images[nextIdx]);
      imageRefs.current[nextIdx] = next;

      const fragmentWidth = width / cols;
      const fragmentHeight = height / rows;

      const fragments = [];

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          fragments.push({
            sx: x * fragmentWidth,
            sy: y * fragmentHeight,
            dx: x * fragmentWidth,
            dy: y * fragmentHeight,
            opacity: 0,
            scale: 0,
          });
        }
      }

      const timeline = gsap.timeline({
        onUpdate: () => {
          ctx.clearRect(0, 0, width, height);
          fragments.forEach((frag) => {
            if (frag.opacity > 0) {
              ctx.globalAlpha = frag.opacity;
              ctx.drawImage(
                next,
                frag.sx,
                frag.sy,
                fragmentWidth,
                fragmentHeight,
                frag.dx,
                frag.dy,
                fragmentWidth * frag.scale,
                fragmentHeight * frag.scale
              );
              ctx.globalAlpha = 1;
            }
          });
        },
      });

      timeline.to(
        fragments,
        {
          opacity: 1,
          scale: 1,
          stagger: { each: 0.005, from: "random" },
          duration: 1.5,
          ease: "power2.out",
        },
        0
      );

      setTimeout(() => {
        setCurrentIndex(nextIdx);
      }, interval);
    };

    drawTransition();
  }, [currentIndex, images]);

  return (
    <canvas
      ref={canvasRef}
      // width={window.innerWidth}
      // height={window.innerHeight}
      // style={{ display: "block", width: "100%", height: "100%" }}
      className="image-transition-canvas"
    />
  );
};

export default ImageTransition;
