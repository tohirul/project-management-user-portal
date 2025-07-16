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

    // ✅ Wait until all refs are set
    if (balls.length !== ballCount || balls.some((b) => b == null)) return;

    // ✅ Set initial colors
    balls.forEach((ball, i) => {
      gsap.set(ball, { backgroundColor: assignedColors.current[i] });
    });

    const tl = gsap.timeline({ repeat: -1 });

    // Jump up (wave)
    tl.to(balls, {
      y: -60,
      duration: 0.4,
      ease: "sine.inOut",
      stagger: 0.1,
    });

    // Drop down and swap colors
    tl.to(balls, {
      y: 0,
      duration: 0.4,
      ease: "sine.inOut",
      stagger: {
        each: 0.1,
        onStart: (i: number) => {
          const nextIndex = (i + 1) % ballCount;

          const currentColor = assignedColors.current[i];
          assignedColors.current[i] = assignedColors.current[nextIndex];
          assignedColors.current[nextIndex] = currentColor;

          const currentBall = balls[i];
          const nextBall = balls[nextIndex];

          if (currentBall) {
            gsap.to(currentBall, {
              backgroundColor: assignedColors.current[i],
              duration: 0.3,
              ease: "power1.inOut",
            });
          }

          if (nextBall) {
            gsap.to(nextBall, {
              backgroundColor: assignedColors.current[nextIndex],
              duration: 0.3,
              ease: "power1.inOut",
            });
          }
        },
      },
    });
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4 bg-white">
      {/* Ball Wave */}
      <div className="flex space-x-2">
        {Array.from({ length: ballCount }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              ballRefs.current[i] = el!;
            }}
            className="h-6 w-6 rounded-full shadow-md"
          ></div>
        ))}
      </div>
    </div>
  );
}

export default AppLoader;
