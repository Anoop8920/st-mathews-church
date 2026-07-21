import { useCollection } from '../../hooks/useFirestore';
import { FiUsers, FiBell, FiCalendar, FiImage } from 'react-icons/fi';

export default function AdminDashboard() {
  const { documents: families } = useCollection('families');
  const { documents: members } = useCollection('members');
  const { documents: announcements } = useCollection('announcements');
  const { documents: events } = useCollection('events');
  const { documents: gallery } = useCollection('gallery');

  const stats = [
    { label: 'Families', value: families.length, icon: FiUsers, color: 'bg-blue-50 text-blue-600' },
    { label: 'Members', value: members.length, icon: FiUsers, color: 'bg-green-50 text-green-600' },
    { label: 'Announcements', value: announcements.length, icon: FiBell, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Events', value: events.length, icon: FiCalendar, color: 'bg-purple-50 text-purple-600' },
    { label: 'Gallery Images', value: gallery.length, icon: FiImage, color: 'bg-pink-50 text-pink-600' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-500 mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-5">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-bold text-primary-500 mb-4">Recent Announcements</h3>
          {announcements.slice(0, 5).map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <p className="text-sm text-gray-700 truncate">{item.title}</p>
              <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
          {announcements.length === 0 && (
            <p className="text-sm text-gray-400">No announcements yet.</p>
          )}
        </div>

        <div className="card p-6">
          <h3 className="font-bold text-primary-500 mb-4">Upcoming Events</h3>
          {events
            .filter((e) => e.date >= new Date().toISOString().split('T')[0])
            .slice(0, 5)
            .map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <p className="text-sm text-gray-700 truncate">{item.title}</p>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          {events.length === 0 && (
            <p className="text-sm text-gray-400">No events yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
