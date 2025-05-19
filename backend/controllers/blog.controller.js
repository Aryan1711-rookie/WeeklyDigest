import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";
import mongoose from "mongoose";
export const createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const createdBy = req.user._id;
    const bannerFile = req.files?.banner?.[0];
    if (!title || !content || !category) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const userExists = await User.findById(createdBy);
    if (!userExists) {
      return res.status(409).json({
        message: "You're not authorized to create a blog.",
        success: false,
      });
    }

    let banner = "https://github.com/shadcn.png";
    let categories = category.split(",").map((c) => c.trim());

    if (bannerFile) {
      const fileUri = getDataUri(bannerFile);
      const cloudinaryRes = await cloudinary.uploader.upload(fileUri.content);
      banner = cloudinaryRes.secure_url;
    }
    const blog = await Blog.create({
      title,
      content,
      category: categories,
      banner,
      createdBy,
    });
    return res.status(201).json({
      message: "Blog created successfully",
      success: true,
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error while creating blog",
      success: false,
    });
  }
};

// export const updateBlog = async (req, res) => {
//   if (!mongoose.Types.ObjectId.isValid(blogId)) {
//     return res.status(400).json({ error: "Invalid Blog ID" });
//   }
//   try {
//     const { title, content, category } = req.body;
//     const file = req.file;
//     const { id } = req.params;
//     const userId = req.user._id.toString();

//     const blog = await Blog.findById(id);

//     if (!blog) {
//       return res.status(404).json({
//         message: "Blog does not exists",
//         success: false,
//       });
//     }

//     if (blog.createdBy.toString() !== userId) {
//       return res.status(403).json({
//         message: "Not authorized to update this blog",
//         success: false,
//       });
//     }
//     let banner = blog.banner;
//     if (file) {
//       const fileUri = getDataUri(file);
//       const cloudinaryRes = await cloudinary.uploader.upload(fileUri.content);
//       banner = cloudinaryRes.secure_url;
//     }

//     const updatedBlog = await Blog.findByIdAndUpdate(
//       id,
//       { title, content, category, banner },
//       { new: true, runValidators: true }
//     );
//     res.status(200).json({
//       message: "Blog updated successfully",
//       success: true,
//       updatedBlog,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error updating blog",
//       error: error.message,
//     });
//   }
// };

export const updateBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Blog ID" });
  }

  try {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, content, and category are required to update a blog.",
      });
    }

    const file = req.file;
    const userId = req.user._id.toString();

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog does not exist",
        success: false,
      });
    }

    if (blog.createdBy.toString() !== userId) {
      return res.status(403).json({
        message: "Not authorized to update this blog",
        success: false,
      });
    }

    let banner = blog.banner;

    if (file) {
      const fileUri = getDataUri(file);
      const cloudinaryRes = await cloudinary.uploader.upload(fileUri.content);
      banner = cloudinaryRes.secure_url;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, category, banner },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Blog updated successfully",
      success: true,
      updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating blog",
      error: error.message,
    });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const skip = (page - 1) * Number(limit);

    const filter = {};

    if (category) filter.category = category;

    const blogs = await Blog.find(filter)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Blog.countDocuments(filter);

    res.status(200).json({
      success: true,
      blogs,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching blogs",
      error: error.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid blog ID" });
    }

    const blog = await Blog.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching blog",
      error: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id.toString();

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this blog",
      });
    }

    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      message: " Blog deleted successfully ",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting blog",
      error: error.message,
    });
  }
};

export const getBlogsByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, error: "Invalid User ID" });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
    const skip = (page - 1) * limit;

    const blogs = await Blog.find({ createdBy: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "username avatar");

    const totalBlogs = await Blog.countDocuments({ createdBy: userId });

    return res.json({
      success: true,
      blogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: page,
      totalBlogs,
    });
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

export const reactToBlog = async (req, res) => {
  const { id } = req.params;
  const { type } = req.body;
  if (!["likes", "dislikes"].includes(type)) {
    return res.status(400).json({ error: "Invalid reaction type" });
  }

  try {
    const blog = await Blog.findByIdAndUpdate(
      id,
      { $inc: { [type]: 1 } },
      { new: true }
    );
    if (!blog) return res.status(404).json({ error: "Blog not found " });

    res.json({
      message: `${type} count updated`,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
      details: error,
      success: false,
    });
  }
};
