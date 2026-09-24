export default function Stats() {
  return (
    <section className="w-full max-w-[1100px] mx-auto px-6 mt-16 md:mt-24 mb-10 relative z-10">
      <div className="rounded-[32px] py-12 px-6 sm:px-10 grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-4 md:gap-12 bg-white/[0.02] border border-white/5 backdrop-blur-md relative overflow-hidden shadow-[0_0_50px_rgba(75,111,254,0.05)]">
        
        {/* Subtle inner glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
        
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
          <span className="text-5xl sm:text-6xl font-extrabold leading-none text-foreground tracking-tight">1000<span className="text-accent">+</span></span>
          <span className="text-base sm:text-lg font-semibold text-muted mt-3 uppercase tracking-wider">Members</span>
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
          <span className="text-5xl sm:text-6xl font-extrabold leading-none text-foreground tracking-tight">20<span className="text-accent">+</span></span>
          <span className="text-base sm:text-lg font-semibold text-muted mt-3 uppercase tracking-wider">Yearly Events</span>
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full col-span-2 md:col-span-1">
          <span className="text-5xl sm:text-6xl font-extrabold leading-none text-foreground tracking-tight">10<span className="text-accent">+</span></span>
          <span className="text-base sm:text-lg font-semibold text-muted mt-3 uppercase tracking-wider">Partners</span>
        </div>
      </div>
    </section>
  );
}
