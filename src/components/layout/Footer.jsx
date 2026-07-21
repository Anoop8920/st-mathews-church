import { Link } from 'react-router-dom';
import { useCollection } from '../../hooks/useFirestore';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

export default function Footer() {
  const { documents: massTimings } = useCollection('massTimings', {
    orderBy: 'order',
    orderDir: 'asc',
  });

  return (
    <footer className="relative bg-primary-900 text-white overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-black/90" />
      
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Church Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-11 h-11 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center shadow-glow-gold">
                <span className="text-white font-bold text-lg">✝</span>
              </div>
              <div>
                <h3 className="font-heading text-lg text-white">St. Mathew&apos;s</h3>
                <p className="text-[10px] text-gold-400 uppercase tracking-widest font-semibold">Vakathanam</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Knanaya Catholic Church under the Archeparchy of Kottayam.
              Serving the faithful since 1910.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-gold-400 uppercase tracking-widest mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/about', label: 'About Parish' },
                { to: '/mass-timings', label: 'Mass Timings' },
                { to: '/announcements', label: 'Announcements' },
                { to: '/events', label: 'Events' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold text-gold-400 uppercase tracking-widest mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiMapPin size={13} className="text-gold-400" />
                </div>
                <span className="text-gray-400 text-sm">
                  Vakathanam P.O., Kottayam, Kerala
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiPhone size={13} className="text-gold-400" />
                </div>
                <span className="text-gray-400 text-sm">+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiMail size={13} className="text-gold-400" />
                </div>
                <span className="text-gray-400 text-sm">parish@stmathewsvakathanam.org</span>
              </li>
            </ul>
          </div>

          {/* Mass Timings */}
          <div>
            <h3 className="text-xs font-bold text-gold-400 uppercase tracking-widest mb-6">
              Mass Timings
            </h3>
            <div className="space-y-3">
              {massTimings.length > 0 ? (
                massTimings.map((timing) => (
                  <div key={timing.id} className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <p className="text-white text-sm font-medium">{timing.category}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {(timing.items || []).join(' | ')}
                    </p>
                  </div>
                ))
              ) : (
                <>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <p className="text-white text-sm font-medium">Weekdays</p>
                    <p className="text-gray-400 text-xs mt-1">6:30 AM</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <p className="text-white text-sm font-medium">Sundays</p>
                    <p className="text-gray-400 text-xs mt-1">7:00 AM & 9:30 AM</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-14 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} St. Mathew&apos;s Knanaya Catholic Church, Vakathanam
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Archeparchy of Kottayam
          </p>
        </div>
      </div>
    </footer>
  );
}
