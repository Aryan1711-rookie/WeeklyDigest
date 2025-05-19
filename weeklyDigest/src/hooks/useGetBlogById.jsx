import { setBlogById } from "../redux/blogSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const useGetBlogById = (id) => {
    const dispatch = useDispatch();
    
    const blog = useSelector((state) => state.blog.blogById);
    useEffect(() => {
        if (!id) return;
        const fetchBlogById = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/v1/blog/getBlog/${id}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setBlogById(res.data.blog));
                    console.log(res.data.blog);
                }

            } catch (error) {
                console.log(error);
                dispatch(setBlogById(null));
            } 
        }
        fetchBlogById();
    }, [dispatch, id]);
    return blog;
}

export default useGetBlogById