import { useEffect, useRef } from "react";

/** Decorative circuits and binary particles; frames run only during scroll settling. */
export function CyberBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let position = window.scrollY;
    let target = position;
    let primary = "";
    let info = "";

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const offset = motion.matches ? 0 : position;
      const compact = width < 640;
      const rows = compact ? 7 : 11;
      const span = compact ? 85 : 220;
      ctx.lineWidth = 1;
      for (let side = 0; side < 2; side++) {
        const origin = side === 0 ? -20 : width + 20;
        const direction = side === 0 ? 1 : -1;
        for (let i = 0; i < rows; i++) {
          const cycle = height + 240;
          const y = ((i * cycle / rows - offset * (0.025 + (i % 3) * 0.008)) % cycle + cycle) % cycle - 120;
          const reach = span * (0.55 + (i % 4) * 0.12);
          const bend = origin + direction * reach * 0.48;
          const end = origin + direction * reach;
          const rise = i % 2 === 0 ? 36 : -36;
          ctx.strokeStyle = i % 4 === 0 ? info : primary;
          ctx.globalAlpha = compact ? 0.07 : 0.11;
          ctx.beginPath();
          ctx.moveTo(origin, y);
          ctx.lineTo(bend, y);
          ctx.lineTo(bend + direction * 36, y + rise);
          ctx.lineTo(end, y + rise);
          ctx.stroke();
          ctx.strokeRect(end - 3, y + rise - 3, 6, 6);

          // A data packet advances along each trace with the scroll position.
          const progress = ((offset * 0.0002 + i * 0.173) % 1 + 1) % 1;
          const x = origin + direction * reach * progress;
          const packetY = y + rise * Math.min(1, Math.max(0, (progress * reach - reach * 0.48) / 36));
          ctx.globalAlpha = compact ? 0.14 : 0.22;
          ctx.fillStyle = ctx.strokeStyle;
          ctx.fillRect(x - 1.5, packetY - 1.5, 3, 3);
        }

        // Wireframe security shield and lock, anchored in the outer margins.
        const x = side === 0 ? span * 0.3 : width - span * 0.3;
        const y = height * (side === 0 ? 0.31 : 0.73) + (motion.matches ? 0 : Math.sin(offset / 1200 + side) * 8);
        ctx.globalAlpha = compact ? 0.055 : 0.09;
        ctx.strokeStyle = primary;
        ctx.beginPath();
        ctx.moveTo(x, y - 36);
        ctx.lineTo(x + 28, y - 24);
        ctx.lineTo(x + 24, y + 9);
        ctx.quadraticCurveTo(x + 17, y + 28, x, y + 38);
        ctx.quadraticCurveTo(x - 17, y + 28, x - 24, y + 9);
        ctx.lineTo(x - 28, y - 24);
        ctx.closePath();
        ctx.stroke();
        ctx.strokeRect(x - 10, y - 2, 20, 17);
        ctx.beginPath();
        ctx.arc(x, y - 3, 7, Math.PI, 0);
        ctx.stroke();
        ctx.fillStyle = primary;
        ctx.fillRect(x - 1, y + 4, 2, 5);

        // Sparse binary trails stay at the edges and drift gently with scrolling.
        ctx.font = `11px ${getComputedStyle(canvas).getPropertyValue("--font-mono")}`;
        ctx.fillStyle = side === 0 ? primary : info;
        const particles = compact ? 2 : 3;
        for (let i = 0; i < particles; i++) {
          const particleX = side === 0 ? 12 + i * 24 : width - 18 - i * 24;
          const particleY = height * (0.18 + i * 0.28 + side * 0.09) + Math.sin(offset / 1500 + i + side) * 12;
          for (let glyph = 0; glyph < 3; glyph++) {
            ctx.globalAlpha = (compact ? 0.1 : 0.14) * (1 - glyph * 0.3);
            ctx.fillText((i + glyph + side) % 2 === 0 ? "0" : "1", particleX, particleY - glyph * 14);
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      position += (target - position) * 0.1;
      if (Math.abs(target - position) < 0.1) position = target;
      draw();
      frame = position === target ? 0 : requestAnimationFrame(animate);
    };
    const scroll = () => {
      if (motion.matches) return;
      target = window.scrollY;
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const tokens = getComputedStyle(canvas);
      primary = tokens.getPropertyValue("--primary").trim();
      info = tokens.getPropertyValue("--info").trim();
      draw();
    };
    const preference = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      position = target = window.scrollY;
      draw();
    };
    resize();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", resize);
    motion.addEventListener("change", preference);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", resize);
      motion.removeEventListener("change", preference);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-dvh w-full" />;
}