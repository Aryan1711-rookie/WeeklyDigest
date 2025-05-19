import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (!loading && user) {
      navigate('/write');
    }
  }, [loading, user, navigate]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        "https://weeklydigest-4mry.onrender.com/api/v1/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const data = response.data;

      if (!data.success) {
        setError(data.message);
        return;
      }
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }

      dispatch(setUser(response.data.user));
      console.log(response.data.user);
      localStorage.setItem("token", data.token);
      setEmail('');
      setPassword('');
      toast.success("User Logged in!", {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

    } catch (error) {
      console.error("Login Error:", error);
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div
        title="back to 'Home'"
        className="text-3xl font-semibold font-serif text-center py-4 cursor-pointer"
        onClick={() => navigate('/')}
      >
        Weekly Digest
      </div>
      <hr className="border-gray-300" />

      <div className="h-[calc(100vh-5rem)] flex items-center justify-center bg-white text-gray-900 px-4">
        <div className="max-w-4xl w-full flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden h-[80vh]">
          <div className="md:w-1/2 hidden md:flex items-center justify-center bg-white p-6">
            <img
              src="https://res.cloudinary.com/dcw7sozkr/image/upload/v1747423963/23672885_6786620_fkzcnp.jpg"
              alt="login art"
              className="max-h-[70vh] object-contain"
            />
          </div>

          <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-gray-600">Continue your journey of ideas and stories.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  disabled={loading}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    disabled={loading}
                    className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>


              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold py-2 rounded-full disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z" />
                  </svg>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <p className="text-sm text-gray-600 mt-6 text-center">
              Don’t have an account?{' '}
              <span className="text-green-500 cursor-pointer hover:underline" onClick={() => navigate('/register')}>Sign Up</span>
            </p>

            {error && <p className="text-red-500 text-center font-semibold mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
