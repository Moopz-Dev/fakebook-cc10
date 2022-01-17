const { User } = require("../models/");

exports.updateProfileImg = async (req, res, next) => {
	try {
		console.log(req.file);
		await User.update(
			{ profileImg: req.file.path },
			{ where: { id: req.user.id } }
		);
		res.json({ message: "upload profile pic successful" });
	} catch (err) {
		next(err);
	}
};
