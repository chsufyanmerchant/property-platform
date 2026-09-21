import SearchBar from "@/components/search/SearchBar";
import TilePattern from "@/components/brand/TilePattern";

const trustStats = [
  { value: "12,000+", label: "Active listings" },
  { value: "6", label: "Major cities" },
  { value: "480+", label: "Verified agencies" },
];

export default function Hero() {
  return (
    <section
      id="search"
      className="relative overflow-hidden border-b border-line bg-canvas"
    >
      {/* Background pattern */}
      <TilePattern
        id="hero"
        className="pointer-events-none absolute -right-32 -top-32 h-[34rem] w-[34rem] text-ink/[0.045] sm:h-[42rem] sm:w-[42rem]"
      />

      <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-teal/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Hero content */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="[animation:fadeInUp_0.6s_ease-out]">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-teal shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
              Pakistan&apos;s property marketplace
            </span>

           <h1 className="mt-6 text-4xl font-bold tracking-[-0.035em] text-ink sm:text-5xl lg:text-6xl">
  Find the Right Property.
  <span className="block text-teal">Make the Right Move.</span>
</h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
              Discover houses, apartments, plots and commercial properties
              across Pakistan — with a simpler, smarter way to search.
            </p>
          </div>

          {/* Search */}
          <div className="mx-auto mt-9 max-w-5xl [animation:fadeInUp_0.6s_ease-out] [animation-delay:120ms] [animation-fill-mode:backwards] sm:mt-11">
            <SearchBar />
          </div>

          {/* Trust stats */}
          <dl className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
            {trustStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-line bg-surface/80 px-5 py-4 text-center shadow-sm backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5"
              >
                <dd className="text-xl font-bold tracking-tight text-ink">
                  {stat.value}
                </dd>

                <dt className="mt-1 text-xs font-medium text-ink-soft sm:text-sm">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}