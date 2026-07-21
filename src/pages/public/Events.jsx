import PageBanner from '../../components/common/PageBanner';
import SectionHeader from '../../components/common/SectionHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useCollection } from '../../hooks/useFirestore';
import { FiCalendar, FiClock, FiMapPin } from 'react-icons/fi';

export default function Events() {
  const { documents: events, loading } = useCollection('events', {
    orderBy: 'date',
    orderDir: 'desc',
  });

  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = events.filter((e) => e.date >= today);
  const pastEvents = events.filter((e) => e.date < today);

  return (
    <div>
      <PageBanner
        title="Events"
        subtitle="Parish events, celebrations, and community gatherings"
      />

      <section className="container-section">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Upcoming Events */}
            <SectionHeader
              title="Upcoming Events"
              subtitle="Join us in these upcoming celebrations"
            />
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="card overflow-hidden">
                    {event.posterUrl && (
                      <img
                        src={event.posterUrl}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                          Upcoming
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-primary-500 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {event.description}
                      </p>
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500 flex items-center">
                          <FiCalendar size={12} className="mr-2" />
                          {new Date(event.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                        {event.time && (
                          <p className="text-xs text-gray-500 flex items-center">
                            <FiClock size={12} className="mr-2" />
                            {event.time}
                          </p>
                        )}
                        {event.venue && (
                          <p className="text-xs text-gray-500 flex items-center">
                            <FiMapPin size={12} className="mr-2" />
                            {event.venue}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 mb-16">
                No upcoming events at this time.
              </p>
            )}

            {/* Past Events */}
            {pastEvents.length > 0 && (
              <>
                <SectionHeader
                  title="Past Events"
                  subtitle="A look back at our recent celebrations"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event) => (
                    <div
                      key={event.id}
                      className="card overflow-hidden opacity-80"
                    >
                      {event.posterUrl && (
                        <img
                          src={event.posterUrl}
                          alt={event.title}
                          className="w-full h-48 object-cover grayscale"
                        />
                      )}
                      <div className="p-6">
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">
                          Completed
                        </span>
                        <h3 className="text-lg font-bold text-gray-700 mt-3 mb-2">
                          {event.title}
                        </h3>
                        <p className="text-xs text-gray-500 flex items-center">
                          <FiCalendar size={12} className="mr-2" />
                          {new Date(event.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {events.length === 0 && (
              <div className="text-center py-12">
                <FiCalendar
                  size={48}
                  className="mx-auto text-gray-300 mb-4"
                />
                <p className="text-gray-500">No events posted yet.</p>
                <p className="text-gray-400 text-sm mt-2">
                  Check back soon for upcoming parish events.
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
