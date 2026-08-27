import Image from "next/image";

export default function Collaborators() {
  const partners = [2, 3, 10, 11, 4, 9, 7, 12, 6, 5, 1, 8];

  return (
    <section className="mt-16 w-full max-w-[1100px] mx-auto px-6 pt-12 mb-20">
      <h2 className="text-[2.5rem] font-[800] mb-12 text-white text-center">Past Collaborators</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 place-items-center">
        {partners.map((num) => (
          <div key={num} className="relative w-[180px] h-[90px] sm:w-[260px] sm:h-[130px] hover:scale-105 transition-transform duration-300">
            <Image 
              src={`/partners/l${num}.png`} 
              alt={`Partner ${num}`} 
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
