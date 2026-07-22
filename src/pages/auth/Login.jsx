import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { FiLock, FiMail } from 'react-icons/fi';

export default function Login() {
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setError('');
      await login(data.email, data.password);
      navigate('/directory');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-28 pb-16 px-4 relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10 opacity-20"
        style={{ backgroundImage: "url('/directory-bg.jpg')" }}
      />
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
            <span className="text-gold-300 text-2xl">✝</span>
          </div>
          <h1 className="text-3xl font-heading text-primary-600">
            Parish Member Login
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Access the parish directory and member resources
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-8">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm mb-5 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                  })}
                  className="input-field !pl-11"
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  className="input-field !pl-11"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full !py-4 !text-[15px] mt-2"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-8">
            Contact the parish office if you need login credentials.
          </p>
        </div>
      </div>
    </div>
  );
}
