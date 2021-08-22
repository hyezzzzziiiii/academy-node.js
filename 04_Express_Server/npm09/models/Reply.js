const Sequelize = require('sequelize');
module.exports = class Reply extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            boardnum: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            writer: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            reply: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        },{
            sequelize,
            timestamps: false,
            modelName: 'Reply',
            tableName: 'reply',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }
};