import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiMenu, FiX, FiUser, FiLogOut, FiGrid } from 'react-icons/fi';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/priests', label: 'Priests' },
  { to: '/mass-timings', label: 'Mass Timings' },
  { to: '/announcements', label: 'Announcements' },
  { to: '/events', label: 'Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/ministries', label: 'Ministries' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, isAdmin, logout } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On non-home pages, always show as "scrolled" (dark text, white bg)
  const showDarkText = isScrolled || !isHomePage;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showDarkText
          ? 'bg-white/80 backdrop-blur-xl shadow-glass border-b border-gray-100/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-gold-300 font-bold text-lg">✝</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gold-400 rounded-full border-2 border-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-sm lg:text-[15px] font-heading leading-tight transition-colors ${
                showDarkText ? 'text-primary-600' : 'text-white'
              }`}>
                St. Mathew&apos;s Church
              </h1>
              <p className={`text-[10px] font-medium tracking-widest uppercase transition-colors ${
                showDarkText ? 'text-gray-400' : 'text-gray-300'
              }`}>
                Vakathanam
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className={`flex items-center space-x-0.5 px-2 py-1.5 rounded-2xl transition-all ${
              showDarkText ? 'bg-gray-50/80' : 'bg-white/10 backdrop-blur-sm'
            }`}>
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 xl:px-3.5 py-2 rounded-xl text-[12px] font-semibold transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-primary-500 shadow-sm'
                        : showDarkText
                          ? 'text-gray-600 hover:text-primary-600 hover:bg-white'
                          : 'text-gray-200 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Auth Area */}
          <div className="hidden lg:flex items-center space-x-2">
            {currentUser ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1.5 text-[12px] font-semibold text-gold-700 bg-gold-50 hover:bg-gold-100 px-3.5 py-2 rounded-xl transition-all border border-gold-200"
                  >
                    <FiGrid size={13} />
                    <span>Admin</span>
                  </Link>
                )}
                <Link
                  to="/directory"
                  className="text-[12px] font-bold text-primary-700 bg-primary-50 hover:bg-primary-100 px-3.5 py-2 rounded-xl transition-all border border-primary-100"
                >
                  Directory
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 transition-all"
                  aria-label="Logout"
                >
                  <FiLogOut size={15} />
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary !py-2.5 !px-5 !text-[12px] !rounded-xl">
                <FiUser className="inline mr-1.5" size={12} />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2.5 rounded-2xl transition-colors ${
              showDarkText ? 'text-gray-600 hover:bg-gray-100/80' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl rounded-2xl mb-4 p-4 shadow-elevated border border-gray-100 animate-scale-in">
            <nav className="flex flex-col space-y-0.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-white bg-primary-500'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <hr className="my-3 border-gray-100" />
              {currentUser ? (
                <>
                  <Link to="/directory" className="px-4 py-2.5 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-xl">
                    Parish Directory
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="px-4 py-2.5 text-sm font-medium text-gold-600 hover:bg-gold-50 rounded-xl">
                      Admin Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout} className="px-4 py-2.5 text-sm font-medium text-red-500 text-left hover:bg-red-50 rounded-xl">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="mx-2 mt-2 btn-primary text-center !py-3">
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
