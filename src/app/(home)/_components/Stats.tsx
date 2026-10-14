import CountingNumber from './CountingNumber';

export default function Stats() {
  return (
    <section className="relative z-10 mx-auto mt-16 mb-10 w-full max-w-[1100px] px-6 md:mt-24">
      <div className="relative grid grid-cols-2 gap-x-4 gap-y-12 overflow-hidden rounded-[32px] border border-white/5 bg-white/[0.02] px-6 py-12 shadow-[0_0_50px_rgba(75,111,254,0.05)] backdrop-blur-md sm:px-10 md:grid-cols-3 md:gap-12">
        {/* Subtle inner glow */}
        <div className="absolute top-0 left-1/2 h-[1px] w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>

        <div className="flex w-full flex-col items-center text-center md:items-start md:text-left">
          <CountingNumber
            className="text-5xl leading-none font-extrabold tracking-tight text-foreground sm:text-6xl"
            value={1000}
            includePlus
          />
          <span className="mt-3 text-base font-semibold tracking-wider text-muted uppercase sm:text-lg">
            Members
          </span>
        </div>
        <div className="flex w-full flex-col items-center text-center md:items-start md:text-left">
          <CountingNumber
            className="text-5xl leading-none font-extrabold tracking-tight text-foreground sm:text-6xl"
            value={20}
            includePlus
          />
          <span className="mt-3 text-base font-semibold tracking-wider text-muted uppercase sm:text-lg">
            Yearly Events
          </span>
        </div>
        <div className="col-span-2 flex w-full flex-col items-center text-center md:col-span-1 md:items-start md:text-left">
          <CountingNumber
            className="text-5xl leading-none font-extrabold tracking-tight text-foreground sm:text-6xl"
            value={10}
            includePlus
          />
          <span className="mt-3 text-base font-semibold tracking-wider text-muted uppercase sm:text-lg">
            Partners
          </span>
        </div>
      </div>
    </section>
  );
}
