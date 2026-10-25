import { FaGraduationCap, FaLaptopCode, FaNetworkWired } from 'react-icons/fa';
import SectionHeader from './SectionHeader';

const FEATURES = [
  {
    title: 'Workshops',
    details:
      'Hands-on sessions on modern ML frameworks, LLMs, and data engineering.',
    icon: FaGraduationCap,
  },
  {
    title: 'Projects',
    details:
      'Extracurricular open-source projects to build a solid technical portfolio.',
    icon: FaLaptopCode,
  },
  {
    title: 'Networking',
    details: 'Connect with top-tier companies, alumni, and passionate peers.',
    icon: FaNetworkWired,
  },
];

export default function AboutSection() {
  return (
    <section
      id="what-we-do"
      className="flex w-full scroll-mt-24 flex-col gap-12 px-8 lg:px-10"
    >
      <SectionHeader
        index="002"
        label="What we do"
        title="Empowering the next generation of Data Scientists."
        description={
          <>
            <p>
              Born within the walls of Politecnico di Milano, we are the
              university&apos;s premier student-led association for AI, Machine
              Learning, and Data Science.
            </p>
            <p>
              Our mission is to bridge the gap between academic theory and
              real-world application. We gather the brightest minds to learn,
              build, and innovate together.
            </p>
          </>
        }
      />

      <div className="flex flex-col border-b">
        {FEATURES.map(({ title, details, icon: Icon }, i) => (
          <div
            key={title}
            className="group grid gap-6 border-t py-8 md:grid-cols-[160px_1fr_1fr] md:items-center md:gap-8"
          >
            <div className="flex items-center gap-4">
              <span className="grid size-11 place-items-center border text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <Icon size={18} />
              </span>
              <span className="type-label text-foreground-secondary">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="type-heading text-foreground">{title}</h3>
            <p className="max-w-[450px] type-body text-foreground-secondary">
              {details}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
