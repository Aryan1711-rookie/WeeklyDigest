import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UserPopover from "../components/UserPopover";
import { useDispatch, useSelector } from "react-redux";
import { setBlogById } from "../redux/blogSlice.js";

const Writer = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blogs, blogById } = useSelector((state) => state.blog);

  const isEditMode = Boolean(id);
  const [input, setInput] = useState({
    title: '',
    content: '',
    category: '',
    banner: null
  });

  const [selectedTags, setSelectedTags] = useState([]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    if (e.target.files[0]) {
      setInput({ ...input, banner: e.target.files[0] });
    }
  };

  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tag]);
      } else {
        toast.warning("You can select maximum 3 tags");
      }
    }
  };

  const handleDraft = () => {
    localStorage.setItem('draft', JSON.stringify({ ...input, selectedTags }));
    toast.success("Draft saved locally", {
      position: "bottom-right",
      autoClose: 1500,
    });
  };

  useEffect(() => {
    if (!id) return;
    const existingBlog = blogs.find((b) => b._id === id);
    if (existingBlog) {
      dispatch(setBlogById(existingBlog));
    } else {
      const fetchFromAPI = async () => {
        try {
          const res = await axios.get(
            `https://weeklydigest-4mry.onrender.com/api/v1/blog/getBlog/${id}`,
            { withCredentials: true }
          );
          if (res.data?.blog) {
            dispatch(setBlogById(res.data.blog));
          }
        } catch (err) {
          toast.error("Failed to load blog from server");
        }
      };
      fetchFromAPI();
    }
  }, [id, blogs, dispatch]);

  useEffect(() => {
    if (isEditMode && blogById && blogById._id === id) {
      setInput({
        title: blogById.title || '',
        content: blogById.content || '',
        category: '', // Don't prefill with array
        banner: blogById.banner || null
      });
      setSelectedTags(blogById.category || []);
    }
  }, [blogById, isEditMode, id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.title || !input.content) {
      toast.error("Title and content are required");
      return;
    }

    const formData = new FormData();
    formData.append('title', input.title);
    formData.append('content', input.content);
    formData.append('category', selectedTags.join(','));

    if (input.banner) {
      if (input.banner instanceof File) {
        formData.append('banner', input.banner);
      } else if (typeof input.banner === 'string') {
        formData.append('bannerUrl', input.banner);
      }
    }

    try {
      setLoading(true);
      if (isEditMode) {
        const response = await axios.put(
          `https://weeklydigest-4mry.onrender.com/api/v1/blog/updateBlog/${id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          toast.success("Blog Updated Successfully");
          navigate(`/blog/${id}`);
        }
      } else {
        const res = await axios.post(
          "https://weeklydigest-4mry.onrender.com/api/v1/blog/create",
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true,
          }
        );

        if (res?.data?.success) {
          toast.success("Your story has been published");
          localStorage.removeItem('draft');
          navigate('/blogs');
        }
      }
    } catch (error) {
      console.error("Full error:", error);
      console.error("Error response:", error.response);
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Failed to publish story"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="relative flex items-center mb-6 px-4 sm:px-0 max-w-7xl mx-auto">
          <h1
            title="back to 'Home'"
            onClick={() => navigate("/")}
            className="absolute left-1/2 transform -translate-x-1/2 text-green-700 font-serif font-bold text-3xl sm:text-4xl cursor-pointer hover:text-green-800 transition-colors select-none"
          >
            Weekly Digest
          </h1>
          <div className="ml-auto">
            <UserPopover />
          </div>
        </div>

        <hr className="border-gray-200 mb-8" />

        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 font-serif mb-2">
            Craft Your Story
          </h2>
          <p className="text-gray-500 italic max-w-md mx-auto">
            Share your thoughts with the world
          </p>
        </div>

        <form
          onSubmit={submitHandler}
          className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 space-y-8"
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Featured Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg cursor-pointer transition-colors">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="pt-1 text-sm text-gray-600">
                    {input.banner?.name || "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>
                <input
                  id="banner"
                  type="file"
                  name="banner"
                  className="opacity-0 absolute"
                  accept="image/*"
                  onChange={changeFileHandler}
                />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
              placeholder="Your compelling headline..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Your Story *
            </label>
            <textarea
              name="content"
              placeholder="Pour your thoughts here..."
              onChange={changeEventHandler}
              value={input.content}
              rows="10"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400 resize-y min-h-[200px]"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Tags (Select up to 3)
            </label>
            <div className="flex flex-wrap gap-3">
              {["News", "Tech", "LifeStyle", "Politics", "Trending", "Games"].map((tag) => (
                <div
                  key={tag}
                  onClick={() => handleTagSelect(tag)}
                  className={`inline-flex items-center px-3 py-2 rounded-full transition-colors cursor-pointer ${
                    selectedTags.includes(tag)
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <span className="text-sm">{tag}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={handleDraft}
              disabled={loading}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              type="submit"
              disabled={loading || !input.title || !input.content}
              className={`px-6 py-2.5 text-sm font-medium text-white rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 ${
                loading || !input.title || !input.content
                  ? "bg-gray-400 cursor-not-allowed"
                  : isEditMode
                    ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                    : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
              }`}
            >
              {loading
                ? isEditMode
                  ? "Republishing..."
                  : "Publishing..."
                : isEditMode
                ? "Republish"
                : "Publish Story"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Writer;
