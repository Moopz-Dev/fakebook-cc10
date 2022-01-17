"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Comments", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: {
						tableName: "users",
					},
				},
			},
			post_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: {
						tableName: "posts",
					},
				},
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Comments");
	},
};
