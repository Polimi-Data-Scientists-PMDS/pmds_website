import Image from "next/image";

export default function Collaborators() {
  const partners = [2, 3, 10, 11, 4, 9, 7, 12, 6, 5, 1, 8];

  return (
    <section className="mt-20 w-full max-w-[1100px] mx-auto px-6 pt-12 mb-10">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-[32px] md:text-[40px] font-[800] text-white tracking-tight">Past Collaborators</h2>
        <p className="text-zinc-400 mt-3 text-center max-w-[600px]">
          We are proud to have collaborated with leading companies and institutions to bring the best opportunities to our members.
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-12 place-items-center">
        {partners.map((num) => (
          <div key={num} className="relative w-[140px] h-[70px] sm:w-[180px] sm:h-[90px] md:w-[220px] md:h-[110px] grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-500">
            <Image 
              src={`/partners/l${num}.png`} 
              alt={`Collaborator ${num}`} 
              fill 
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain" 
            />
          </div>
        ))}
      </div>
    </section>
  );
}
