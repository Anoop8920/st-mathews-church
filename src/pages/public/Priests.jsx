import PageBanner from '../../components/common/PageBanner';
import SectionHeader from '../../components/common/SectionHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useCollection } from '../../hooks/useFirestore';
import { FiUser } from 'react-icons/fi';

export default function Priests() {
  const { documents: priests, loading } = useCollection('priests', {
    orderBy: 'order',
    orderDir: 'asc',
  });

  const currentPriests = priests.filter((p) => p.status === 'current');
  const formerPriests = priests.filter((p) => p.status === 'former');

  return (
    <div>
      <PageBanner
        title="Our Priests"
        subtitle="Spiritual leaders guiding our parish community"
      />

      <section className="container-section">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Current Priests */}
            <SectionHeader
              title="Current Clergy"
              subtitle="Meet our current spiritual leaders"
            />
            {currentPriests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {currentPriests.map((priest) => (
                  <div key={priest.id} className="card text-center p-8">
                    <div className="w-32 h-32 mx-auto rounded-full bg-primary-100 flex items-center justify-center mb-4 overflow-hidden">
                      {priest.photoUrl ? (
                        <img
                          src={priest.photoUrl}
                          alt={priest.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FiUser size={48} className="text-primary-300" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-primary-500">
                      {priest.name}
                    </h3>
                    <p className="text-gold-600 font-medium mt-1">
                      {priest.designation}
                    </p>
                    {priest.period && (
                      <p className="text-gray-500 text-sm mt-2">
                        {priest.period}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 mb-16">
                Priest information will be updated soon.
              </p>
            )}

            {/* Former Vicars */}
            {formerPriests.length > 0 && (
              <>
                <SectionHeader
                  title="Former Vicars"
                  subtitle="Priests who have served our parish"
                />
                <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formerPriests.map((priest) => (
                      <div
                        key={priest.id}
                        className="flex items-center p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4 flex-shrink-0">
                          <FiUser size={20} className="text-primary-300" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {priest.name}
                          </h4>
                          {priest.period && (
                            <p className="text-sm text-gray-500">
                              {priest.period}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
}
