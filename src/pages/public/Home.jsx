import { Link } from 'react-router-dom';
import { useCollection } from '../../hooks/useFirestore';
import SectionHeader from '../../components/common/SectionHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  FiCalendar,
  FiClock,
  FiBell,
  FiUsers,
  FiBookOpen,
  FiImage,
  FiArrowRight,
  FiMapPin,
} from 'react-icons/fi';

export default function Home() {
  const { documents: announcements, loading: announcementsLoading } =
    useCollection('announcements', {
      orderBy: 'createdAt',
      orderDir: 'desc',
      limit: 3,
    });

  const { documents: events, loading: eventsLoading } = useCollection(
    'events',
    {
      orderBy: 'date',
      orderDir: 'asc',
      limit: 3,
      where: [{ field: 'date', op: '>=', value: new Date().toISOString().split('T')[0] }],
    }
  );

  const { documents: families } = useCollection('families');
  const { documents: members } = useCollection('members');

  const familyCount = families.length > 0 ? families.length : 157;
  const memberCount = members.length > 0 ? members.length : 709;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/church-hero.jpg')" }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/80 via-primary-900/60 to-primary-900/80" />
        
        {/* Animated decorative elements */}
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 relative w-full">
          <div className="text-center max-w-4xl mx-auto animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center px-5 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-8">
              <div className="w-2 h-2 rounded-full bg-gold-400 mr-3 animate-pulse" />
              <span className="text-gold-300 text-sm font-medium tracking-wide">
                Archeparchy of Kottayam
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading text-white leading-[1.1] mb-6">
              St. Mathew&apos;s Knanaya
              <span className="block bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 bg-clip-text text-transparent mt-1">
                Catholic Church
              </span>
            </h1>

            {/* Location */}
            <div className="flex items-center justify-center text-gray-300 mb-5">
              <FiMapPin size={14} className="mr-2 text-gold-400" />
              <span className="text-base font-light tracking-wide">Vakathanam, Kerala</span>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-8">
              A parish community united in faith, love, and service — 
              serving {familyCount} families since 1910.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/about" className="btn-secondary !px-8 !py-3 !text-sm">
                Discover Our Parish
              </Link>
              <Link
                to="/mass-timings"
                className="inline-flex items-center justify-center px-8 py-3 rounded-2xl font-semibold text-sm text-white border border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                Mass Timings
                <FiArrowRight className="ml-2" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-12 z-10 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-6 md:p-8 shadow-elevated">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {[
                { value: '1910', label: 'Established', gradient: 'from-primary-500 to-primary-600' },
                { value: String(familyCount), label: 'Families', gradient: 'from-gold-500 to-gold-600' },
                { value: String(memberCount), label: 'Members', gradient: 'from-primary-500 to-primary-600' },
                { value: '100+', label: 'Years of Faith', gradient: 'from-gold-500 to-gold-600' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className={`text-2xl md:text-3xl font-heading font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="container-section pt-8">
        <SectionHeader
          title="Latest Announcements"
          subtitle="Stay updated with parish news and notices"
        />
        {announcementsLoading ? (
          <LoadingSpinner size="sm" />
        ) : announcements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {announcements.map((announcement, i) => (
              <div key={announcement.id} className="card p-7 group" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold-50 to-gold-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FiBell size={16} className="text-gold-600" />
                  </div>
                  <span className="text-xs text-gray-400 font-medium">
                    {new Date(announcement.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </div>
                <h3 className="font-heading text-lg text-primary-600 mb-3 group-hover:text-gold-600 transition-colors">
                  {announcement.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                  {announcement.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
              <FiBell size={24} className="text-gray-300" />
            </div>
            <p className="text-gray-400 text-sm">No announcements at this time.</p>
          </div>
        )}
        <div className="text-center mt-12">
          <Link to="/announcements" className="btn-ghost inline-flex items-center">
            View All Announcements
            <FiArrowRight className="ml-2" size={14} />
          </Link>
        </div>
      </section>

      {/* Events */}
      <section className="py-24 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Upcoming Events"
            subtitle="Join us in our parish celebrations"
          />
          {eventsLoading ? (
            <LoadingSpinner size="sm" />
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="card p-7 group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 flex flex-col items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-sm font-bold text-primary-600 leading-none">
                        {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric' })}
                      </span>
                      <span className="text-[10px] text-primary-400 uppercase font-bold mt-0.5">
                        {new Date(event.date).toLocaleDateString('en-IN', { month: 'short' })}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-primary-600 group-hover:text-gold-600 transition-colors">
                        {event.title}
                      </h3>
                      {event.time && (
                        <p className="text-xs text-gray-400 flex items-center mt-1">
                          <FiClock size={10} className="mr-1" />
                          {event.time}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
                <FiCalendar size={24} className="text-gray-300" />
              </div>
              <p className="text-gray-400 text-sm">No upcoming events.</p>
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/events" className="btn-ghost inline-flex items-center">
              View All Events
              <FiArrowRight className="ml-2" size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="container-section pt-0">
        <SectionHeader
          title="Explore"
          subtitle="Quick access to parish services"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { to: '/mass-timings', icon: FiClock, label: 'Mass Timings', color: 'from-blue-500 to-blue-600' },
            { to: '/announcements', icon: FiBell, label: 'Announcements', color: 'from-amber-500 to-amber-600' },
            { to: '/events', icon: FiCalendar, label: 'Events', color: 'from-emerald-500 to-emerald-600' },
            { to: '/gallery', icon: FiImage, label: 'Gallery', color: 'from-purple-500 to-purple-600' },
            { to: '/ministries', icon: FiUsers, label: 'Ministries', color: 'from-rose-500 to-rose-600' },
            { to: '/about', icon: FiBookOpen, label: 'About', color: 'from-sky-500 to-sky-600' },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex flex-col items-center p-6 rounded-3xl bg-white border border-gray-100 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:shadow-lg transition-all`}>
                <item.icon size={20} className="text-white" />
              </div>
              <span className="text-xs font-semibold text-gray-600 group-hover:text-primary-600 transition-colors">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 to-primary-800/90" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-400/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-5xl font-heading text-white mb-6">
            You are welcome here
          </h2>
          <p className="text-gray-300/90 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you are a long-time parishioner or visiting for the first time,
            we invite you to join us in worship and fellowship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-secondary !px-10 !py-4">
              Get In Touch
            </Link>
            <Link to="/mass-timings" className="inline-flex items-center justify-center px-10 py-4 rounded-2xl font-semibold text-sm text-white border border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
              Plan Your Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
