export function GridBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)]" />
      <div className="absolute -top-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-emerald/10 blur-[140px]" />
      <div className="absolute top-1/3 right-0 h-[28rem] w-[28rem] rounded-full bg-cyan/10 blur-[140px]" />
      <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-amber/5 blur-[140px]" />
    </div>
  );
}
