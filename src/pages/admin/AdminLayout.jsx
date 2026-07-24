import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  FiHome,
  FiBell,
  FiCalendar,
  FiImage,
  FiUsers,
  FiUser,
  FiBookOpen,
  FiClock,
  FiDownload,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi';

const adminNav = [
  { to: '/admin', icon: FiHome, label: 'Dashboard', end: true },
  { to: '/admin/events', icon: FiCalendar, label: 'Events' },
  { to: '/admin/gallery', icon: FiImage, label: 'Gallery' },
  { to: '/admin/families', icon: FiUsers, label: 'Families' },
  { to: '/admin/members', icon: FiUser, label: 'Members' },
  { to: '/admin/priests', icon: FiUser, label: 'Priests' },
  { to: '/admin/parish-priests', icon: FiUser, label: 'Parish Priests' },
  { to: '/admin/ministries', icon: FiBookOpen, label: 'Ministries' },
  { to: '/admin/mass-timings', icon: FiClock, label: 'Mass Timings' },
  { to: '/admin/downloads', icon: FiDownload, label: 'Downloads' },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 bg-white shadow-md flex-col fixed h-full">
          <div className="p-6 border-b">
            <h2 className="text-lg font-bold text-primary-500">
              Admin Panel
            </h2>
            <p className="text-xs text-gray-400">St. Mathew's Church</p>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {adminNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary-500'
                  }`
                }
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="p-4 border-t">
            <Link
              to="/"
              className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full"
            >
              <FiLogOut size={18} />
              <span>Exit Admin</span>
            </Link>
          </div>
        </aside>

        {/* Mobile Top Nav */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-40 p-3 overflow-x-auto">
          <div className="flex space-x-2">
            {adminNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${
                    isActive
                      ? 'bg-primary-50 text-primary-500'
                      : 'text-gray-600'
                  }`
                }
              >
                <item.icon size={14} />
                <span>{item.label}</span>
              </NavLink>
            ))}
            <Link
              to="/"
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap text-red-500 bg-red-50"
            >
              <FiLogOut size={14} />
              <span>Exit</span>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-6 md:p-8 mt-14 md:mt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
