export default function Stats() {
  return (
    <section className="w-full max-w-[1100px] mx-auto px-6 mt-10 md:mt-12">
      <div className="rounded-[32px] py-10 px-6 sm:px-10 grid grid-cols-2 md:flex md:flex-row justify-around items-center gap-y-12 gap-x-4 md:gap-12 bg-gradient-to-b from-[#1C1917] to-[#0E0E0D]">
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
          <span className="text-[48px] sm:text-[56px] font-[800] leading-none text-white">1000+</span>
          <span className="text-[16px] sm:text-[22px] font-[500] text-white mt-3">Members</span>
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
          <span className="text-[48px] sm:text-[56px] font-[800] leading-none text-white">20+</span>
          <span className="text-[16px] sm:text-[22px] font-[500] text-white mt-3">Yearly Events</span>
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full col-span-2 md:col-span-1">
          <span className="text-[48px] sm:text-[56px] font-[800] leading-none text-white">10+</span>
          <span className="text-[16px] sm:text-[22px] font-[500] text-white mt-3">Companies</span>
        </div>
      </div>
    </section>
  );
}
