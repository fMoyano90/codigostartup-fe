"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REVEAL_SELECTOR = [
  ".home-need-card",
  ".service-card",
  ".project-card",
  ".article-card",
  ".workshop-card",
  ".workshop-banner",
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
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      const problemsList = document.querySelector(".home-problems-section .service-problem-list");
      if (problemsList) {
        gsap.fromTo(
          problemsList.querySelectorAll("li"),
          { x: 72, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: problemsList,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 641px)", () => {
        (gsap.utils.toArray(".process-grid .process-step") as HTMLElement[]).forEach((card) => {
          gsap.fromTo(
            card,
            { x: 140, autoAlpha: 0 },
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      });

      mm.add("(max-width: 640px)", () => {
        (gsap.utils.toArray(".process-step") as HTMLElement[]).forEach((card) => {
          gsap.fromTo(
            card,
            { x: 56, autoAlpha: 0 },
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      });
    });

    document.fonts.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener("load", () => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  return null;
}
