import CountingNumber from './CountingNumber';
import SectionHeader from './SectionHeader';

const STATS = [
  { value: 1000, label: 'Members' },
  { value: 20, label: 'Yearly events' },
  { value: 10, label: 'Partners' },
];

export default function Stats() {
  return (
    <section className="flex w-full flex-col gap-12 px-8 lg:px-10">
      <SectionHeader
        index="001"
        label="Numbers"
        title="A community that keeps growing."
        description={
          <p>
            Every year more students join us to learn, build and connect. Here
            is where we stand today.
          </p>
        }
      />

      <div className="grid border sm:grid-cols-3">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-col gap-12 border-t p-6 first:border-t-0 sm:border-t-0 sm:border-l sm:first:border-l-0 lg:p-8"
          >
            <p className="type-label text-foreground-secondary">
              {String(i + 1).padStart(2, '0')}
            </p>
            <div className="flex flex-col gap-3">
              <CountingNumber
                className="type-display text-foreground"
                value={stat.value}
                includePlus
              />
              <p className="type-label text-accent">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
