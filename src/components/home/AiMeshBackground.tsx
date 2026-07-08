import { useEffect, useRef } from "react";

/**
 * Lightweight AI-mesh animation: soft drifting nodes + connecting edges over
 * a subtle radial-gradient wash. Pauses if the user prefers reduced motion.
 * No external deps; ~30fps.
 */
export function AiMeshBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(18, Math.min(38, Math.floor((width * height) / 32000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1.5 + Math.random() * 2,
      }));
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const LINK_DIST = 140;
    let raf = 0;
    let last = performance.now();

    const primary = "16, 185, 129"; // emerald-ish
    const draw = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      ctx.clearRect(0, 0, width, height);

      // Ambient wash
      const g = ctx.createRadialGradient(
        width * 0.75,
        height * 0.15,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height),
      );
      g.addColorStop(0, `rgba(${primary}, 0.10)`);
      g.addColorStop(0.6, `rgba(${primary}, 0.02)`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // Move
      if (!reduced) {
        for (const n of nodes) {
          n.x += n.vx * (dt / 16);
          n.y += n.vy * (dt / 16);
          if (n.x < -20) n.x = width + 20;
          if (n.x > width + 20) n.x = -20;
          if (n.y < -20) n.y = height + 20;
          if (n.y > height + 20) n.y = -20;
        }
      }

      // Edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.22;
            ctx.strokeStyle = `rgba(${primary}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${primary}, 0.6)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
