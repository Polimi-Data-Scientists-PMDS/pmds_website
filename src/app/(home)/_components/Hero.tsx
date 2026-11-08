import ArrowLink from './ArrowLink';
import NeuralNetworkVisual from './NeuralNetworkVisual';

export default function Hero() {
  return (
    <section className="relative grid w-full px-4 md:grid-cols-2">
      <div className="flex min-h-[650px] flex-col justify-between border-border p-4 lg:min-h-[760px] lg:p-6">
        <div className="flex items-center justify-between">
          <p className="type-label text-accent">Politecnico di Milano</p>
          <p className="type-label text-foreground-secondary">
            Est. 2022 - Milano
          </p>
        </div>

        <div className="flex flex-col justify-between gap-8">
          <h1 className="type-display">
            <span className="block">Data Science</span>
            <span className="ml-[12%] block text-accent italic">Club.</span>
          </h1>
          <p className="type-body text-foreground-secondary">
            The largest student-led association dedicated to Data Science and AI
            at PoliMi. We host workshops, build real-world projects, and foster
            a vibrant tech community.
          </p>
        </div>

        <div className="flex flex-col gap-6 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <ArrowLink href="#what-we-do">Discover what we do</ArrowLink>
        </div>
      </div>
      <div className="hidden h-full md:block">
        <NeuralNetworkVisual />
      </div>
    </section>
  );
}
