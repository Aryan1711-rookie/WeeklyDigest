import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/authSlice"; 

const UserPopover = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); 
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser()); 
    navigate("/");      
  };

  const handleViewProfile = () => {
    navigate("/profile");  
  };

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 focus:outline-none"
        aria-label="User menu"
      >
        <img
           src={user?.avatar || "https://i.pravatar.cc/40"}
          // src= {"https://res.cloudinary.com/dcw7sozkr/image/upload/v1747555069/kajp5mskakcyass2kgyp.jpg"}
          alt="User"
          className="w-10 h-10 rounded-full object-cover border-2 border-green-600"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <button
            onClick={handleViewProfile}
            className="block w-full text-left px-4 py-2 hover:bg-green-100 text-gray-700"
          >
            View Profile
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 font-semibold"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserPopover;
