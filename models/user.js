// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
// 	class User extends Model {
// 		/**
// 		 * Helper method for defining associations.
// 		 * This method is not a part of Sequelize lifecycle.
// 		 * The `models/index` file will call this method automatically.
// 		 */
// 		static associate(models) {
// 			// define association here
// 		}
// 	}
// 	User.init(
// 		{
// 			firstName: DataTypes.STRING,
// 			lastName: DataTypes.STRING,
// 			email: DataTypes.STRING,
// 			phoneNumber: DataTypes.STRING,
// 			password: DataTypes.STRING,
// 			profileImg: DataTypes.STRING,
// 		},
// 		{
// 			sequelize,
// 			modelName: "User",
// 		}
// 	);
// 	return User;
// };

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			phoneNumber: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			profileImg: {
				type: DataTypes.STRING,
			},
		},
		{
			underscored: true,
		}
	);
	User.associate = models => {
		User.hasMany(models.Post, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
		});
		User.hasMany(models.Comment, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
		});
		User.hasMany(models.Like, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
		});
		User.hasMany(models.Friend, {
			as: "RequestFrom",
			foreignKey: {
				name: "requestFromId",
				allowNull: false,
			},
		});
		User.hasMany(models.Friend, {
			as: "RequestTo",
			foreignKey: {
				name: "requestToId",
				allowNull: false,
			},
		});
	};
	return User;
};
