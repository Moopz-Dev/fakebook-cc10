// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Friend extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Friend.init({
//     status: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Friend',
//   });
//   return Friend;
// };

module.exports = (sequelize, DataTypes) => {
	const Friend = sequelize.define(
		"Friend",
		{
			status: {
				type: DataTypes.STRING, // REQUESTED, ACCEPTED, REJECTED
				allowNull: false,
				default: "REQUESTED",
				validate: {
					isIn: [["ACCEPTED", "REQUESTED"]],
				},
			},
		},
		{
			underscored: true,
		}
	);
	Friend.associate = models => {
		Friend.belongsTo(models.User, {
			as: "RequestFrom",
			foreignKey: {
				name: "requestFromId",
				allowNull: false,
			},
		});
		Friend.belongsTo(models.User, {
			as: "RequestTo",
			foreignKey: {
				name: "requestToId",
				allowNull: false,
			},
		});
	};
	return Friend;
};
