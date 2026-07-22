import PageBanner from '../../components/common/PageBanner';
import SectionHeader from '../../components/common/SectionHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useCollection } from '../../hooks/useFirestore';
import { FiUsers } from 'react-icons/fi';

export default function Ministries() {
  const { documents: ministries, loading } = useCollection('ministries', {
    orderBy: 'order',
    orderDir: 'asc',
  });

  const defaultMinistries = [
    {
      id: '1',
      name: 'KCYL (Knanaya Catholic Youth League)',
      description:
        'Youth wing dedicated to nurturing faith and leadership among young parish members through spiritual, social, and cultural activities.',
      icon: '🧑‍🤝‍🧑',
    },
    {
      id: '2',
      name: 'KCC (Knanaya Catholic Congress)',
      description:
        'Men\'s organization focused on spiritual growth, parish service, and community building among male members of the parish.',
      icon: '👔',
    },
    {
      id: '3',
      name: 'KCWA (Knanaya Catholic Women\'s Association)',
      description:
        'Women\'s group dedicated to prayer, fellowship, and supporting families in their spiritual journey.',
      icon: '🌸',
    },
    {
      id: '4',
      name: 'Parish Choir',
      description:
        'Musical ministry that enhances liturgical celebrations through sacred music and hymns.',
      icon: '🎵',
    },
    {
      id: '5',
      name: 'Catechism',
      description:
        'Religious education program for children and youth, teaching Catholic faith and doctrine.',
      icon: '📚',
    },
    {
      id: '6',
      name: 'Prayer Groups',
      description:
        'Small communities of faith gathered for intercessory prayer, Bible study, and spiritual sharing.',
      icon: '🙏',
    },
  ];

  const displayMinistries = ministries.length > 0 ? ministries : defaultMinistries;

  return (
    <div>
      <PageBanner
        title="Parish Ministries"
        subtitle="Organizations and groups serving our parish community"
      />

      <section className="container-section">
        <SectionHeader
          title="Our Organizations"
          subtitle="Active groups fostering faith, fellowship, and service"
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayMinistries.map((ministry) => (
              <div key={ministry.id} className="card p-8 text-center">
                <div className="text-4xl mb-4">
                  {ministry.icon || '⛪'}
                </div>
                <h3 className="text-lg font-bold text-primary-500 mb-3">
                  {ministry.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {ministry.description}
                </p>
                {ministry.president && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400">President</p>
                    <p className="text-sm font-medium text-gray-700">
                      {ministry.president}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
