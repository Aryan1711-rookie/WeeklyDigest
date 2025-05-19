import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiPenTool } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserBlogs = ({ userId }) => {
  // const user = useSelector((state) => state.auth.user);
  // const blog = useSelector((state) => state.blog.blogById);
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 2;

  useEffect(() => {
    const fetchUserBlogs = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const res = await axios.get(
          `https://weeklydigest-4mry.onrender.com/api/v1/blog/user/${userId}?page=${page}&limit=${limit}`,
          { withCredentials: true }
        );
        if (res?.data?.success) {
          setBlogs(res.data.blogs);
          setTotalPages(res.data.totalPages);
          setError('');
        }
      } catch (err) {
        console.error('Error fetching user blogs:', err);
        setError(err.response?.data?.message || 'Failed to fetch blogs');
        toast.error('Failed to load user blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, [userId, page]);

  const handleDelete = async (blogId) => {
    if(!window.confirm("Do you want to delete your writing")) return;
    try{
      const res = await axios.delete(`https://weeklydigest-4mry.onrender.com/api/v1/blog/delete/${blogId}`,{
        withCredentials: true
      });
      toast.success(res.data.message || "Deleted Successfully");
      setBlogs(prev => prev.filter(blog => blog._id !== blogId));
    }catch(error){
      console.error("Error deleting blog:", error);
    toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  }
  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center py-12 text-red-500">
      <p className="text-lg font-medium">{error}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
      >
        Try Again
      </button>
    </div>
  );

  if (blogs.length === 0) return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No blogs found</h3>
        <p className="mt-1 text-sm text-gray-500">This user hasn't published any blogs yet.</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="flex flex-col grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map(blog => (
          <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            {blog.banner && (
              <div className="h-60 overflow-hidden">
                <img 
                  src={blog.banner} 
                  alt={blog.title} 
                  className="w-full h-full object-cover object-right-top hover:scale-105 transition-transform duration-300" 
                />
              </div>
            )}
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex flex-wrap gap-2 mb-3">
                {blog.category?.map((cat, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{blog.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{blog.content}</p>
              
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span className="text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded-full">
                  {blog.readingTime || 2} min read
                </span>
              </div>

              <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                <button
                  onClick={() => navigate(`/blog/update/${blog._id}`)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex-1 justify-center"
                  title="Edit Blog"
                >
                  <FiPenTool className="text-gray-600" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(blog._id)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors flex-1 justify-center"
                  title="Delete Blog"
                >
                  <FaTrash className="text-red-500" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4">
          <button 
            disabled={page <= 1} 
            onClick={() => setPage(p => Math.max(p - 1, 1))} 
            className={`px-5 py-2 rounded-md ${page <= 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'} transition-colors`}
          >
            Previous
          </button>
          
          <span className="text-gray-600 font-medium">
            Page {page} of {totalPages}
          </span>
          
          <button 
            disabled={page >= totalPages} 
            onClick={() => setPage(p => Math.min(p + 1, totalPages))} 
            className={`px-5 py-2 rounded-md ${page >= totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'} transition-colors`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UserBlogs;