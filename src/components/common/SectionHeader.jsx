export default function SectionHeader({ title, subtitle, light = false, align = 'center' }) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center';

  return (
    <div className={`${alignClass} mb-16`}>
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-heading leading-tight mb-4 ${
          light ? 'text-white' : 'text-primary-600'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`max-w-2xl text-base md:text-lg leading-relaxed ${
            align === 'center' ? 'mx-auto' : ''
          } ${light ? 'text-gray-300' : 'text-gray-500'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
