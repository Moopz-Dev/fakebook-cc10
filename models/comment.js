// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Comment extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Comment.init({
//     title: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Comment',
//   });
//   return Comment;
// };

module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define(
		"Comment",
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
		},
		{
			underscored: true,
		}
	);
	Comment.associate = models => {
		Comment.belongsTo(models.User, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
		});
		Comment.belongsTo(models.Post, {
			foreignKey: {
				name: "postId",
				allowNull: false,
			},
		});
	};
	return Comment;
};
