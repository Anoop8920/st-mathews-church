import PageBanner from '../../components/common/PageBanner';
import SectionHeader from '../../components/common/SectionHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useCollection } from '../../hooks/useFirestore';
import { FiBell, FiDownload, FiCalendar } from 'react-icons/fi';

export default function Announcements() {
  const { documents: announcements, loading } = useCollection('announcements', {
    orderBy: 'createdAt',
    orderDir: 'desc',
  });

  return (
    <div>
      <PageBanner
        title="Announcements"
        subtitle="Latest notices and circulars from our parish"
      />

      <section className="container-section">
        {loading ? (
          <LoadingSpinner />
        ) : announcements.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FiBell className="text-gold-500" size={18} />
                      <span className="text-xs bg-primary-50 text-primary-500 px-2 py-1 rounded-full font-medium">
                        {announcement.category || 'Notice'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-primary-500 mb-2">
                      {announcement.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {announcement.description}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <span className="text-xs text-gray-400 flex items-center">
                        <FiCalendar size={12} className="mr-1" />
                        {new Date(announcement.createdAt).toLocaleDateString(
                          'en-IN',
                          {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          }
                        )}
                      </span>
                      {announcement.attachmentUrl && (
                        <a
                          href={announcement.attachmentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary-500 hover:text-primary-600 flex items-center"
                        >
                          <FiDownload size={12} className="mr-1" />
                          Download Attachment
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FiBell size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No announcements at this time.</p>
            <p className="text-gray-400 text-sm mt-2">
              Check back soon for updates from the parish.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
