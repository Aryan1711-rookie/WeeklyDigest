import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Skeleton from '../components/Skeleton.jsx';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useSelector((store) => store.auth);

  const handleWrite = () => {
    if (loading) return;
    navigate(user ? '/write' : '/login');
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div
              title="back to 'Home'"
              className="text-2xl md:text-3xl font-semibold font-serif cursor-pointer"
              onClick={() => navigate('/')}
            >
              Weekly Digest
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => navigate('/about')} className="hover:text-green-400 transition">
                About
              </button>
              <button
                onClick={handleWrite}
                className="hover:text-green-400 transition"
              >
                Write
              </button>
              <button
                onClick={() => navigate('/blogs')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-base"
              >
                Get Started
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1 rounded-full hover:bg-gray-200 transition"
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-50 px-4 pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                navigate('/about');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-md text-sm"
            >
              About
            </button>
            <button
              onClick={() => {
                handleWrite();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-md text-sm"
            >
              Write
            </button>
            <button
              onClick={() => {
                navigate('/blogs');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 bg-green-600 text-white rounded-md text-sm"
            >
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="text-center md:text-left md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl  md:text-8xl  font-bold mb-4 leading-tight">
            New Day, New Story, New Idea
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-gray-600">
            A place to read, write, and deepen your understanding.
          </p>
          <button
            onClick={() => navigate('/blogs')}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 md:px-6 md:py-3 rounded-full text-lg md:text-xl"
          >
            Start Reading
          </button>
        </div>
        <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-10 flex justify-center items-center">
          <img
            src="https://res.cloudinary.com/dcw7sozkr/image/upload/v1747420220/3469529-removebg-preview_riw6zo.jpg"
            alt="Story Inspiration"
            className="w-full max-w-md md:max-w-none h-auto object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;