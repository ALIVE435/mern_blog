import { errorHandler } from "../utils/error.js"
import Post from "../models/post.models.js";

export const create = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a post'));
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'))
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-A0-9-]/g, '');
    const newPost = new Post({
        ...req.body, slug, userId: req.user.id,
    });
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost)
    }
    catch (err) {
        next(err);
    }
}

export const getposts = async (req, res, next) => {
    
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [              /* or(mongodb logical operator) and regex(mongodb regex operator) combined https://www.w3schools.com/mongodb/mongodb_query_operators.php https://www.mongodb.com/docs/manual/tutorial/query-documents/ */
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ],
            }),
        })
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalPosts = await Post.countDocuments();

        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthPosts = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo }, //query for createdAt >= oneMonthAgo (time comparison)
        });
        //posts will be an array of objects(combines post documents which is an object)
        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts,
        });
    } catch (error) {
        next(error);
    }
};