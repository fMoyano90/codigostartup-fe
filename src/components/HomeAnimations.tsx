"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REVEAL_SELECTOR = [
  ".home-need-card",
  ".service-card",
  ".project-card",
  ".process-step",
  ".article-card",
].join(", ");

export default function HomeAnimations() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((card) => {
        gsap.fromTo(
          card,
          { y: 36, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const pointerIsPrecise = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!pointerIsPrecise || prefersReducedMotion) return;

    document.body.classList.add("home-cursor-active");
    const cursor = document.createElement("div");
    cursor.id = "cs-cursor";
    document.body.appendChild(cursor);

    let frame: number;
    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };
    const onEnter = () => cursor.classList.add("hovered");
    const onLeave = () => cursor.classList.remove("hovered");
    const interactiveElements = document.querySelectorAll("a, button, summary");

    const tick = () => {
      cursorX += (mouseX - cursorX) * 0.14;
      cursorY += (mouseY - cursorY) * 0.14;
      cursor.style.transform = `translate(${cursorX - 5}px, ${cursorY - 5}px)`;
      frame = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove);
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", onEnter);
      element.addEventListener("mouseleave", onLeave);
    });
    frame = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", onEnter);
        element.removeEventListener("mouseleave", onLeave);
      });
      cancelAnimationFrame(frame);
      cursor.remove();
      document.body.classList.remove("home-cursor-active");
    };
  }, []);

  return null;
}
