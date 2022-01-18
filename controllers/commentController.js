const { Post, Comment, Friend } = require("../models");
const { Op } = require("sequelize");
exports.createComment = async (req, res, next) => {
	try {
		const { title, postId } = req.body;
		const post = await Post.findOne({ where: { id: postId } });
		if (!post) {
			return res.status(400).json({ message: "post not found" });
		}

		let canComment = req.user.id === post.userId;
		if (!canComment) {
			const friend = Friend.findOne({
				where: {
					status: "ACCEPTED",
					[Op.or]: [
						{ requestToId: req.user.id, requestFromId: post.userId },
						{ requestFromId: req.user.id, requestToId: post.userId },
					],
				},
			});
			if (!friend)
				return res.status(403).json({ message: "cannot comment this code" });
		}

		const comment = await Comment.create({
			title,
			postId,
			userId: req.user.id,
		});

		res.status(201).json({ comment });
	} catch (error) {
		next(error);
	}
};

exports.deleteComment = async (req, res, next) => {
	try {
		const { id } = req.params;
		const comment = await Comment.findOne({ where: { id } });
		if (!comment) {
			return res.status(400).json({ message: "comment not found" });
		}
		if (req.user.id !== comment.userId) {
			return res
				.status(403)
				.json({ message: "only owner can delete their comment" });
		}
		await comment.destroy();
		res.status(204).json();
	} catch (error) {
		next(error);
	}
};
