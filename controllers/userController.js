exports.updateProfileImg = async (req, res, next) => {
	try {
		res.json({ message: "upload profile pic successful" });
	} catch (err) {
		next(err);
	}
};
