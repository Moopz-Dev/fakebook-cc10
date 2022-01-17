// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Post extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Post.init({
//     title: DataTypes.STRING,
//     image: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Post',
//   });
//   return Post;
// };

module.exports = (sequelize, DataTypes) => {
	const Post = sequelize.define(
		"Post",
		{
			title: {
				type: DataTypes.STRING,
			},
			image: {
				type: DataTypes.STRING,
			},
		},
		{
			underscored: true,
		}
	);
	Post.associate = models => {
		Post.belongsTo(models.User, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
		});
		Post.hasMany(models.Comment, {
			foreignKey: {
				name: "postId",
				allowNull: false,
			},
		});
		Post.hasMany(models.Like, {
			foreignKey: {
				name: "postId",
				allowNull: false,
			},
		});
	};
	return Post;
};
