import PageBanner from '../../components/common/PageBanner';
import SectionHeader from '../../components/common/SectionHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useCollection } from '../../hooks/useFirestore';
import { FiUser } from 'react-icons/fi';

export default function ParishPriests() {
  const { documents: priests, loading } = useCollection('parishPriests', {
    orderBy: 'createdAt',
    orderDir: 'asc',
  });

  return (
    <div>
      <PageBanner
        title="Priests from St. Mathew's Church"
        subtitle="Ordained priests from our parish community"
      />

      <section className="container-section">
        {loading ? (
          <LoadingSpinner />
        ) : priests.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {priests.map((priest) => (
              <div key={priest.id} className="flex flex-col items-center text-center">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gold-400 shadow-lg mb-4">
                  {priest.photoUrl ? (
                    <img
                      src={priest.photoUrl}
                      alt={priest.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary-50 flex items-center justify-center">
                      <FiUser size={36} className="text-primary-300" />
                    </div>
                  )}
                </div>
                <h4 className="font-heading text-base md:text-lg text-primary-600 font-bold">
                  {priest.name}
                </h4>
                {priest.ordinationYear && (
                  <p className="text-sm text-gray-500 mt-1">
                    Ordained: {priest.ordinationYear}
                  </p>
                )}
                {priest.congregation && (
                  <p className="text-sm text-gray-400 mt-0.5">
                    {priest.congregation}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
              <FiUser size={32} className="text-gray-300" />
            </div>
            <p className="text-gray-400">Priest details will be updated soon.</p>
          </div>
        )}
      </section>
    </div>
  );
}
