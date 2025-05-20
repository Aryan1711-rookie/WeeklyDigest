import { useState } from "react";
import useGetAllBlogs from "../hooks/useGetAllBlogs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import UserPopover from "../components/UserPopover.jsx"
const Blogs = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [category, setCategory] = useState("");
  const [previewContent, setPreviewContent] = useState(null);
  const { user }  = useSelector((state) => state.auth);
  const { loading, error, totalPages } = useGetAllBlogs(page, limit, category);
  const blogs = useSelector((state) => state.blog.blogs);
  const navigate = useNavigate();
  const categories = [...new Set(blogs.flatMap(blog => blog.category || []))];
  const handlePrev = () => page > 1 && setPage(page - 1);
  const handleNext = () => page < totalPages && setPage(page + 1);
  const closePreview = () => {
    setPreviewContent(null);
    document.body.style.overflow = "auto";
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative flex items-center mb-2 px-4 sm:px-0 max-w-7xl mx-auto py-8">
          <h1
            title="back to 'Home'"
            onClick={() => navigate("/")}
            className="absolute left-1/2 transform -translate-x-1/2 text-green-700 font-serif font-bold text-xl sm:text-4xl cursor-pointer hover:text-green-800 transition-colors select-none"
          >
            Weekly Digest
          </h1>
          <div className="ml-auto">
            {user ? <UserPopover/> : null}
          </div>
        </div>
        <hr className="border-gray-200 mb-8" />

      {/* Filtering Section Based on Tags */}
      <div className="flex flex-wrap justify-center gap-5 md:gap-3 mb-6">
        <button
          onClick={() => handleCategoryChange("")}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${category === "" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${category === cat ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Loading/Error States */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Blog Grid */}
        {blogs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                {/* Banner with Eye Button */}
                {blog.banner && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.banner}
                      alt="Blog Banner"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6">
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {blog.category.map((cat, i) => (
                      <span
                        key={i}
                        className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}


                  </div>

                  {/* Title */}
                  <h2
                    className="text-xl font-semibold text-gray-800 mb-3 hover:text-green-600 transition-colors cursor-pointer"
                    onClick={() => navigate(`/blog/${blog._id}`)}
                  >
                    {/* {blog.title} */}
                    {blog.title?.substring(0, 60)}...
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.content?.substring(0, 200)}...
                  </p>

                  {/* Read More Button */}
                  <button
                    onClick={() => navigate(`/blog/${blog._id}`)}
                    className="text-green-600 hover:text-green-800 font-medium text-sm flex items-center transition-colors"
                  >
                    Read full story
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-16">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No blogs found
              </h3>
              <p className="mt-2 text-gray-500">
                There are no published blogs yet.
              </p>
            </div>
          )
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-12 border-t border-gray-200 pt-6">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${page === 1
                  ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
            >
              <FiArrowLeft className="mr-2" />
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page <span className="font-medium">{page}</span> of{" "}
              <span className="font-medium">{totalPages}</span>
            </span>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${page === totalPages
                  ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
            >
              Next
              <FiArrowRight className="ml-2" />
            </button>
          </div>
        )}
      </main>

      {/* Content Preview Modal */}
      {previewContent && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={closePreview}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Modal content */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: previewContent }} />
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={closePreview}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;