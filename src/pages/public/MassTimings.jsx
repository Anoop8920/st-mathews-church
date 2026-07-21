import PageBanner from '../../components/common/PageBanner';
import SectionHeader from '../../components/common/SectionHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useCollection } from '../../hooks/useFirestore';
import { FiClock, FiSun, FiStar } from 'react-icons/fi';

export default function MassTimings() {
  const { documents: timings, loading } = useCollection('massTimings', {
    orderBy: 'order',
    orderDir: 'asc',
  });

  const defaultTimings = [
    {
      id: 'weekday',
      category: 'Weekdays',
      icon: '📅',
      items: ['Holy Mass: 6:30 AM'],
    },
    {
      id: 'saturday',
      category: 'Saturday',
      icon: '🕯️',
      items: ['Holy Mass: 6:30 AM', 'Evening Prayer: 5:30 PM'],
    },
    {
      id: 'sunday',
      category: 'Sunday',
      icon: '⛪',
      items: ['First Holy Mass: 7:00 AM', 'Second Holy Mass: 9:30 AM'],
    },
    {
      id: 'feast',
      category: 'Feast Days',
      icon: '🎉',
      items: ['As announced by the parish'],
    },
  ];

  const displayTimings = timings.length > 0 ? timings : defaultTimings;

  return (
    <div>
      <PageBanner
        title="Mass Timings"
        subtitle="Schedule of Holy Mass and other liturgical services"
      />

      <section className="container-section">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <SectionHeader
              title="Holy Mass Schedule"
              subtitle="Join us in celebrating the Holy Eucharist"
            />

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayTimings.map((timing) => (
                <div key={timing.id} className="card p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">
                      {timing.icon || '⛪'}
                    </span>
                    <h3 className="text-lg font-bold text-primary-500">
                      {timing.category}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {(timing.items || [timing.time]).map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-gray-700"
                      >
                        <FiClock
                          size={14}
                          className="mr-2 text-gold-500 flex-shrink-0"
                        />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Additional Services */}
            <div className="max-w-4xl mx-auto mt-12">
              <SectionHeader
                title="Other Services"
                subtitle="Confession, Adoration, and special devotions"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 text-center">
                  <div className="w-12 h-12 bg-maroon-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiStar className="text-maroon-500" size={20} />
                  </div>
                  <h4 className="font-bold text-primary-500 mb-2">
                    Confession
                  </h4>
                  <p className="text-sm text-gray-600">
                    Daily before Holy Mass
                  </p>
                </div>
                <div className="card p-6 text-center">
                  <div className="w-12 h-12 bg-gold-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiSun className="text-gold-500" size={20} />
                  </div>
                  <h4 className="font-bold text-primary-500 mb-2">
                    Adoration
                  </h4>
                  <p className="text-sm text-gray-600">
                    Friday: 5:00 PM - 6:00 PM
                  </p>
                </div>
                <div className="card p-6 text-center">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiClock className="text-primary-500" size={20} />
                  </div>
                  <h4 className="font-bold text-primary-500 mb-2">
                    Rosary
                  </h4>
                  <p className="text-sm text-gray-600">
                    Daily before Holy Mass
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
