export default function PageBanner({ title, subtitle }) {
  return (
    <section className="relative overflow-hidden pt-24 pb-12 md:pt-28 md:pb-14">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-pattern" />
      
      {/* Decorative */}
      <div className="absolute top-10 right-10 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading text-white mb-3 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm md:text-base text-gray-300/80 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
