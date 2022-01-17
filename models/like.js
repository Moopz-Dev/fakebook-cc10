// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Like extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Like.init({
//     userId: DataTypes.INTEGER,
//     postId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Like',
//   });
//   return Like;
// };

module.exports = (sequelize, DataTypes) => {
	const Like = sequelize.define(
		"Like",
		{},
		{
			underscored: true,
		}
	);
	Like.associate = models => {
		Like.belongsTo(models.User, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
		});
		Like.belongsTo(models.Post, {
			foreignKey: {
				name: "postId",
				allowNull: false,
			},
		});
	};
	return Like;
};
