const util = require("util");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { Post, Like, Comment, Friend, User, sequelize } = require("../models");
const { Op } = require("sequelize");
const uploadPromise = util.promisify(cloudinary.uploader.upload);

exports.getAllPosts = async (req, res, next) => {
	try {
		const friends = await Friend.findAll({
			where: {
				[Op.or]: [{ requestToId: req.user.id }, { requestFromId: req.user.id }],
			},
		});
		const userIds = friends.reduce(
			(acc, item) => {
				if (req.user.id === item.requestFromId) {
					acc.push(item.requestToId);
				} else {
					acc.push(item.requestFromId);
				}
				return acc;
			},
			[req.user.id]
		);

		const posts = await Post.findAll({
			where: { userId: userIds },
			include: [
				{ model: User, attributes: ["id", "firstName", "lastName"] },
				{
					model: Comment,
					include: { model: User, attributes: ["id", "firstName", "lastName"] },
				},
			],
			order: [["createdAt", "DESC"]],
		});

		res.status(200).json({ posts });
	} catch (error) {
		next(error);
	}
};

exports.createPost = async (req, res, next) => {
	try {
		const { title } = req.body;
		if (!title && !req.file) {
			return res.status(400).json({ message: "title or image is required" });
		}
		let result = {};
		if (req.file) {
			result = await uploadPromise(req.file.path);
			fs.unlinkSync(req.file.path);
		}
		const post = await Post.create({
			title,
			userId: req.user.id,
			image: result.secure_url,
		});

		res.status(201).json({ post });
	} catch (error) {
		next(error);
	}
};

exports.updatePost = async (req, res, next) => {
	try {
	} catch (error) {
		next(err);
	}
};

exports.deletePost = async (req, res, next) => {
	const transaction = await sequelize.transaction();
	try {
		const { id } = req.params;
		const post = await Post.findOne({ where: { id } });
		if (!post) {
			return res.status(400).json({ message: "post not found" });
		}
		const { image } = post;
		if (image) {
		}
		await Like.destroy({ where: { postId: id } }, { transaction });
		await Comment.destroy({ where: { postId: id } }, { transaction });
		await Post.destroy({ where: { id } }, { transaction });
		transaction.commit();

		res.status(204).json();
	} catch (error) {
		await transaction.rollback();
		next(error);
	}
};
