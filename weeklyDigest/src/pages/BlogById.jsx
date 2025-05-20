import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetBlogById from "../hooks/useGetBlogById";
import { FiArrowLeft } from "react-icons/fi";
import moment from "moment";
import Payment from "../components/Payment";
import { useEffect } from "react";

const BlogById = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();
  useGetBlogById(id);
  const user = useSelector((state) => state.auth.user);
  const blog = useSelector((state) => state.blog.blogById);
  const loading = useSelector((state) => state.blog.loading);

  if (loading || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-green-600 mb-6 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to stories
        </button>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <article className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          {/* Banner Image */}
          {blog.banner && (
            <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
              <img
                src={blog.banner}
                alt="Blog banner"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x400?text=Blog+Image';
                }}
              />
            </div>
          )}

          {/* Article Content */}
          <div className="p-6 sm:p-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {Array.isArray(blog.category) ? (
                blog.category.map((cat, i) => (
                  <span
                    key={i}
                    className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                  >
                    {cat}
                  </span>
                ))
              ) : (
                <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  {blog.category}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              {blog.title}
            </h1>

            {/* Author and Date */}
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <span>
                By {blog.createdBy?.name || "Unknown"} •{" "}
                {moment(blog.createdAt).format("MMMM D, YYYY")}
              </span>
            </div>

            {/* Content */}
            <div className="prose max-w-none text-gray-700">
              {blog.content.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 w-full px-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full md:w-auto px-6 py-3 text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg shadow-md transition duration-300"
          >
            Explore more stories
          </button>

          <div className="w-full md:w-auto">
            <Payment />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogById;