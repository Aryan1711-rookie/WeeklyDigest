import { useDispatch, useSelector } from "react-redux";
import { FiMail, FiPhone, FiUser } from "react-icons/fi";
import UserBlogs from "../components/UserBlogs";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/authSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        title="back to 'Home'"
        className="text-3xl font-semibold font-serif text-center py-6 cursor-pointer text-green-800"
        onClick={() => navigate("/")}
      >
        Weekly Digest
      </div>
      <hr className="border-gray-300" />

      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gray-100 overflow-hidden border-2 border-white shadow">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-500">
                        <FiUser size={32} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {user?.name || "Anonymous User"}
                    </h1>
                    <p className="text-gray-600 mt-1">{user?.email}</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate(-1)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded-md shadow"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md shadow"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <FiMail className="text-indigo-500 flex-shrink-0" />
                    <span>{user?.email || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <FiPhone className="text-indigo-500 flex-shrink-0" />
                    <span>
                      {user?.phone || user?.phoneNumber || "Not provided"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Blogs */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                My Articles
              </h2>
              <UserBlogs userId={user._id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
