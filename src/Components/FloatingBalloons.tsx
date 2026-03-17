"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/* ─── Balloon config: small varied sizes, unique gradients, 3D-style shadow ─── */
const BALLOON_BASE =
  "rounded-full opacity-90 shadow-[inset_-2px_-3px_8px_rgba(0,0,0,0.25),0_2px_6px_rgba(0,0,0,0.15)]";
const BALLOONS = [
  { className: `w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-amber-300 via-orange-400 to-orange-600 ${BALLOON_BASE}` },
  { className: `w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-br from-violet-400 via-fuchsia-500 to-fuchsia-700 ${BALLOON_BASE}` },
  { className: `w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-emerald-300 via-teal-500 to-teal-700 ${BALLOON_BASE}` },
  { className: `w-5 sm:w-7 h-5 sm:h-7 bg-gradient-to-br from-rose-400 via-pink-500 to-rose-600 ${BALLOON_BASE}` },
  { className: `w-7 sm:w-9 h-7 sm:h-9 bg-gradient-to-br from-sky-300 via-cyan-400 to-blue-600 ${BALLOON_BASE}` },
  { className: `w-9 sm:w-11 h-9 sm:h-11 bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-600 ${BALLOON_BASE}` },
  { className: `w-4 sm:w-6 h-4 sm:h-6 bg-gradient-to-br from-lime-300 via-green-400 to-emerald-600 ${BALLOON_BASE}` },
  { className: `w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-br from-indigo-400 via-violet-500 to-purple-600 ${BALLOON_BASE}` },
  { className: `w-6 sm:w-7 h-6 sm:h-7 bg-gradient-to-br from-rose-300 via-red-400 to-red-600 ${BALLOON_BASE}` },
  { className: `w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-cyan-300 via-emerald-400 to-teal-600 ${BALLOON_BASE}` },
] as const;

/* Mouse: repel when cursor is within REPEL_RADIUS; wind when movement speed > WIND_THRESHOLD */
const REPEL_RADIUS = 90;
const REPEL_STRENGTH = 28;
const WIND_THRESHOLD = 20;
const WIND_STRENGTH = 18;
const WIND_RADIUS = 100; /* Only balloons within this range of cursor feel wind */
const COLLISION_PADDING = 1.08; /* Min distance = (r1+r2) * this – gentle separation */
const COLLISION_STRENGTH = 8;
/** Per-balloon sensitivity – wider spread for more individual reaction */
const SENSITIVITY = [0.5, 1.3, 0.8, 1.4, 0.6, 1.1, 0.4, 1.0];

interface FloatingBalloonsProps {
  cardRef: React.RefObject<HTMLElement | null>;
}

/**
 * Decorative balloons: GSAP random wander, mouse repel, wind gust, collision avoidance.
 * cardRef: the card element we attach mousemove to for cursor position/velocity.
 */
export function FloatingBalloons({ cardRef }: FloatingBalloonsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, lastX: 0, lastY: 0 });
  const rafRef = useRef<number | null>(null);
  const quickTosXRef = useRef<((v: number) => void)[]>([]);
  const quickTosYRef = useRef<((v: number) => void)[]>([]);

  useEffect(() => {
    /* Setup: get wrappers (positioned) and inner balloons (we animate their x/y for mouse + collision) */
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    const wrappers = container.querySelectorAll<HTMLElement>("[data-balloon-wrap]");
    const balloons = container.querySelectorAll<HTMLElement>("[data-balloon]");
    if (!wrappers.length || wrappers.length !== balloons.length) return;

    /* quickTo: smooth updates to balloon x/y each frame (repel + wind + collision) */
    quickTosXRef.current = Array.from(balloons).map((el) =>
      gsap.quickTo(el, "x", { duration: 0.5, ease: "sine.out" })
    );
    quickTosYRef.current = Array.from(balloons).map((el) =>
      gsap.quickTo(el, "y", { duration: 0.5, ease: "sine.out" })
    );

    let mounted = true;
    const ctx = gsap.context(() => {
      /** Current center of a wrapper (for collision check when picking next random target) */
      function getWrapperCenter(w: HTMLElement) {
        const l = parseFloat(String(gsap.getProperty(w, "left") ?? 0)) || 0;
        const t = parseFloat(String(gsap.getProperty(w, "top") ?? 0)) || 0;
        return { x: l + w.offsetWidth / 2, y: t + w.offsetHeight / 2 };
      }

      /** Move wrapper to a random position inside container; avoid overlapping other balloons; then repeat */
      function animateToRandom(wrapper: HTMLElement, index: number) {
        if (!mounted || !container) return;
        const rect = container.getBoundingClientRect();
        const w = wrapper.offsetWidth;
        const h = wrapper.offsetHeight;
        const pad = 12;
        const maxX = Math.max(0, rect.width - w - pad);
        const maxY = Math.max(0, rect.height - h - pad);
        const myRadius = Math.min(w, h) / 2;

        let x: number;
        let y: number;
        let attempts = 0;
        const maxAttempts = 25;

        /* Reject positions that would overlap another balloon (collision-aware target) */
        do {
          x = pad + Math.random() * maxX;
          y = pad + Math.random() * maxY;
          const myCx = x + w / 2;
          const myCy = y + h / 2;
          let ok = true;
          for (let j = 0; j < wrappers.length; j++) {
            if (j === index) continue;
            const other = wrappers[j];
            const oc = getWrapperCenter(other);
            const otherRadius =
              Math.min(other.offsetWidth, other.offsetHeight) / 2;
            const dist = Math.hypot(myCx - oc.x, myCy - oc.y);
            const minDist = (myRadius + otherRadius) * COLLISION_PADDING;
            if (dist < minDist) {
              ok = false;
              break;
            }
          }
          if (ok) break;
        } while (++attempts < maxAttempts);

        const duration = 22 + Math.random() * 14;

        gsap.to(wrapper, {
          left: x,
          top: y,
          duration,
          ease: "sine.inOut",
          overwrite: "auto",
          onComplete: () => animateToRandom(wrapper, index),
        });
      }

      wrappers.forEach((wrapper, i) => {
        const rect = container.getBoundingClientRect();
        const w = wrapper.offsetWidth;
        const h = wrapper.offsetHeight;
        const pad = 12;
        const maxX = Math.max(0, rect.width - w - pad);
        const maxY = Math.max(0, rect.height - h - pad);
        const startX = pad + Math.random() * maxX;
        const startY = pad + Math.random() * maxY;
        gsap.set(wrapper, { left: startX, top: startY });
        gsap.delayedCall(i * 1.2, () => animateToRandom(wrapper, i));
      });
    }, container);

    /** Update cursor position and velocity (for wind effect on fast movement) */
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const { lastX, lastY } = mouseRef.current;
      mouseRef.current = {
        x,
        y,
        vx: x - lastX,
        vy: y - lastY,
        lastX: x,
        lastY: y,
      };
    };

    /** Each frame: compute repel (cursor near balloon), wind (fast cursor move), collision (overlap); apply via quickTo */
    function tick() {
      if (!card) return;
      const { x: mx, y: my, vx, vy } = mouseRef.current;
      const rect = card.getBoundingClientRect();
      const cardLeft = rect.left;
      const cardTop = rect.top;

      const centers: { x: number; y: number; r: number }[] = [];
      balloons.forEach((balloon) => {
        const br = balloon.getBoundingClientRect();
        centers.push({
          x: br.left - cardLeft + br.width / 2,
          y: br.top - cardTop + br.height / 2,
          r: Math.min(br.width, br.height) / 2,
        });
      });

      balloons.forEach((balloon, i) => {
        const { x: cx, y: cy, r: ri } = centers[i];
        const sens = SENSITIVITY[i % SENSITIVITY.length];

        let offX = 0;
        let offY = 0;

        const distToCursor = Math.hypot(mx - cx, my - cy);
        /* Repel: push balloon away from cursor when within REPEL_RADIUS */
        if (distToCursor < REPEL_RADIUS && distToCursor > 0) {
          const strength =
            ((REPEL_RADIUS - distToCursor) / REPEL_RADIUS) *
            REPEL_STRENGTH *
            sens;
          const nx = (mx - cx) / distToCursor;
          const ny = (my - cy) / distToCursor;
          offX += nx * strength;
          offY += ny * strength;
        }

        const speed = Math.hypot(vx, vy);
        /* Wind: when cursor moves fast and is near this balloon, nudge in movement direction */
        if (speed > WIND_THRESHOLD && distToCursor < WIND_RADIUS) {
          const windScale =
            Math.min(1, (speed - WIND_THRESHOLD) / 50) *
            WIND_STRENGTH *
            sens *
            (1 - distToCursor / WIND_RADIUS);
          const nvx = vx / speed;
          const nvy = vy / speed;
          offX += nvx * windScale;
          offY += nvy * windScale;
        }

        /* Collision: if overlapping another balloon, push apart */
        for (let j = 0; j < balloons.length; j++) {
          if (j === i) continue;
          const { x: jx, y: jy, r: rj } = centers[j];
          const dx = cx - jx;
          const dy = cy - jy;
          const dist = Math.hypot(dx, dy);
          const minDist = (ri + rj) * COLLISION_PADDING;
          if (dist < minDist && dist > 0) {
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;
            offX += nx * overlap * COLLISION_STRENGTH * sens;
            offY += ny * overlap * COLLISION_STRENGTH * sens;
          }
        }

        quickTosXRef.current[i]?.(offX);
        quickTosYRef.current[i]?.(offY);
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    card.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      mounted = false;
      ctx.revert();
      card.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cardRef]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Wrapper: position (left/top) animated by GSAP; inner div gets x/y from mouse + collision */}
      {BALLOONS.map((b, i) => (
        <div
          key={i}
          data-balloon-wrap
          className="absolute will-change-[left,top]"
          style={{ left: 0, top: 0 }}
        >
          <div
            data-balloon
            className={`rounded-full will-change-transform ${b.className}`}
          />
        </div>
      ))}
    </div>
  );
}
