import { setBlogs } from "../redux/blogSlice";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllBlogs = (page = 1, limit = 5, category = '') => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blog.blogs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      setLoading(true);
      setError('');

      try {
        // Build query string dynamically
        const query = `?page=${page}&limit=${limit}${category ? `&category=${encodeURIComponent(category)}` : ''}`;

        const res = await axios.get(`https://weeklydigest-4mry.onrender.com/api/v1/blog/getBlogs${query}`, {
          withCredentials: true
        });

        if (res.data.success) {
          dispatch(setBlogs(res.data.blogs));
          setTotalPages(res.data.pagination.totalPages || 1);
          console.log("Fetched blogs:", res.data.blogs);
        } else {
          setError('Failed to fetch blogs');
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError('Error fetching blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchAllBlogs();
  }, [dispatch, page, limit, category]);

  return { blogs, loading, error, totalPages };
};

export default useGetAllBlogs;
