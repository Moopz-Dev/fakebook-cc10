const { Friend, User } = require("../models");
const { Op } = require("sequelize");
const { request } = require("express");

exports.getAllFriends = async (req, res, next) => {
	try {
		const friends = await Friend.findAll({
			where: {
				[Op.or]: [{ requestToId: req.user.id }, { requestFromId: req.user.id }],
				status: "ACCEPTED",
			},
		});
		const friendIds = friends.reduce((acc, item) => {
			if (req.user.id === item.requestFromId) {
				acc.push(item.requestToId);
			} else {
				acc.push(item.requestFromId);
			}
			return acc;
		}, []);

		const users = await User.findAll({
			where: { id: friendIds },
			attributes: { exclude: ["password"] },
		});
		res.status(200).json({ users });
	} catch (error) {
		next(error);
	}
};

exports.requestFriend = async (req, res, next) => {
	try {
		const { requestToId } = req.body;

		if (req.user.id === requestToId) {
			return res.status(400).json({ message: "cannot request yourself" });
		}

		const existFriend = await Friend.findOne({
			where: {
				[Op.or]: [
					{ requestFromId: req.user.id, requestToId },
					{ requestFromId: requestToId, requestToId: req.user.id },
				],
			},
		});

		if (existFriend) {
			return res.status(400).json({
				message:
					"You are already friends, or friend request is previously sent.",
			});
		}
		await Friend.create({
			requestToId,
			status: "REQUESTED",
			requestFromId: req.user.id,
		});
		res.status(200).json({ message: "friend request has been sent" });
	} catch (error) {
		next(error);
	}
};

exports.updateFriend = async (req, res, next) => {
	try {
		const { friendId } = req.params;
		const friend = await Friend.findOne({
			where: { status: "REQUESTED", id: friendId },
		});

		if (!friend) {
			return res.status(400).json({ message: "this friend request not found" });
		}
		if (friend.requestToId !== req.user.id) {
			return res
				.status(403)
				.json({ message: "cannot accept this friend request" });
		}
		await Friend.update({ status: "ACCEPTED" }, { where: { id: friendId } });
		res.status(200).json({ message: "friend request accepted" });
	} catch (error) {
		next(error);
	}
};
