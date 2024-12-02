import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find()
            .populate('user', ['email', 'fullName', 'avatarUrl'])
            .exec();
        return res.json(posts);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to get all posts',
            details: err
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { new: true }
        )
            .populate('user', ['email', 'fullName', 'avatarUrl'])
            .exec();
        return res.json(post);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to get current post',
            details: err
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId
        });

        const { _id: postId } = await doc.save();

        return res
            .status(201)
            .setHeader('location', `/posts/${postId}`)
            .json({ success: true, id: postId });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to create post',
            details: err
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        const doc = await PostModel.findById(postId);
        if (!doc) {
            return res.status(404).json({
                message: 'Article not found'
            });
        }
        if (!doc.user.equals(req.userId)) {
            return res.status(403).json({
                message: 'Access denied'
            });
        }

        await PostModel.deleteOne({ _id: postId });

        return res.json({
            success: true
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to remove article',
            details: err
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await PostModel.findOne({ _id: postId });

        if (!doc) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        if (!doc.user.equals(req.userId)) {
            return res.status(403).json({
                message: 'Access denied'
            });
        }

        await PostModel.updateOne(
            { _id: postId },
            {
                title: req.body.title,
                text: req.body.text,
                tags: req.body.tags,
                imageUrl: req.body.imageUrl
            }
        );

        return res.status(204);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to update article',
            details: err
        });
    }
};
