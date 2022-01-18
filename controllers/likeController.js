const { Post, Like } = require("../models");

exports.createLike = async (req, res, next) => {
	try {
		const { postId } = req.body;
		const post = await Post.findOne({ where: { id: postId } });
		if (!post) {
			return res.status(400).json({ message: "post not found" });
		}
		const like = await Like.findOne({ where: { postId, userId: req.user.id } });

		if (like) {
			return res.status(400).json({ message: "post already liked" });
		}

		await Like.create({
			postId,
			userId: req.user.id,
		});

		res.status(201).json({ message: "Liked" });
	} catch (error) {
		next(error);
	}
};

exports.deleteLike = async (req, res, next) => {
	try {
		const { id } = req.params;
		const like = await Like.findOne({ where: { id } });
		if (!like) {
			return res.status(400).json({ message: "like not found" });
		}
		if (req.user.id !== like.userId) {
			return res
				.status(403)
				.json({ message: "only owner can delete their like" });
		}
		await like.destroy();
		res.status(204).json();
	} catch (error) {
		next(error);
	}
};
