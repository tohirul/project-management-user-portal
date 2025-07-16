"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const colors = ["#3B82F6", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6"];
const ballCount = 5;

function AppLoader() {
  const ballRefs = useRef<HTMLDivElement[]>([]);
  const assignedColors = useRef<string[]>([...colors]);

  useEffect(() => {
    const balls = ballRefs.current;
    if (balls.length !== ballCount || balls.some((b) => b == null)) return;

    // Set initial background color
    balls.forEach((ball, i) => {
      gsap.set(ball, { backgroundColor: assignedColors.current[i] });
    });

    // Each ball has its own looped animation
    balls.forEach((ball, i) => {
      const tl = gsap.timeline({ repeat: -1, delay: i * 0.15 });

      tl.to(ball, {
        y: -60,
        duration: 0.4,
        ease: "sine.inOut",
      }).to(ball, {
        y: 0,
        duration: 0.4,
        ease: "sine.inOut",
        onComplete: () => {
          const nextIndex = (i + 1) % ballCount;

          // Swap colors in array
          const temp = assignedColors.current[i];
          assignedColors.current[i] = assignedColors.current[nextIndex];
          assignedColors.current[nextIndex] = temp;

          // Animate the color change (on drop complete)
          gsap.to(ballRefs.current[i], {
            backgroundColor: assignedColors.current[i],
            duration: 0.3,
            ease: "power1.inOut",
          });
          gsap.to(ballRefs.current[nextIndex], {
            backgroundColor: assignedColors.current[nextIndex],
            duration: 0.3,
            ease: "power1.inOut",
          });
        },
      });
    });
  }, []);

  return (
    <div className="bg-dark flex h-screen min-w-screen flex-col items-center justify-center space-y-4">
      <div className="flex space-x-2">
        {Array.from({ length: ballCount }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) ballRefs.current[i] = el;
            }}
            className="h-6 w-6 rounded-full shadow-md"
          ></div>
        ))}
      </div>
    </div>
  );
}

export default AppLoader;
