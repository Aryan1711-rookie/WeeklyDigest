import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const RegisterScreen = () => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    avatar: null
  });
  const [error, setError] = useState('');
  const [preview, setPreview] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput(prev => ({
        ...prev,
        avatar: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (input.password !== input.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      dispatch(setLoading(true));

      const formData = new FormData();
      formData.append('name', input.name);
      formData.append('email', input.email);
      formData.append('phone', input.phone);
      formData.append('password', input.password);
      if (input.avatar) {
        formData.append('avatar', input.avatar);
      }

      const response = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      const data = response.data;
      if (!data.success) {
        setError(data.message);
        return;
      }

      dispatch(setUser(data.user));
      localStorage.setItem("token", data.token);

      toast.success("Registration successful!", {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        navigate('/write');
      }, 1500);

    } catch (error) {
      console.error("Registration Error:", error);
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        title="back to 'Home'"
        className="text-3xl font-semibold font-serif text-center py-4 cursor-pointer text-green-700"
        onClick={() => navigate('/')}
      >
        Weekly Digest
      </div>
      <hr className="border-gray-200" />

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md md:max-w-6xl bg-white rounded-xl shadow-md overflow-hidden md:flex">
          <div className="hidden md:block md:w-1/2">
            <div className="h-full flex items-center justify-center p-8">
              <img
                src="https://res.cloudinary.com/dcw7sozkr/image/upload/v1747423963/23672885_6786620_fkzcnp.jpg"
                alt="Register Illustration"
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
              <p className="mt-2 text-gray-600">Start your journey of ideas and stories</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                    {preview ? (
                      <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-lg">👤</span>
                      </div>
                    )}
                  </div>
                  <label className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-300 text-sm font-medium cursor-pointer hover:bg-gray-50">
                    Upload
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      accept="image/*"
                      className="opacity-0 absolute"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={input.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={input.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={input.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={input.password}
                      onChange={handleChange}
                      className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                      minLength="6"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={input.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center py-2">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;