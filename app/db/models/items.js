'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Items extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // 1 items mempunyai 1 Todos
            Items.belongsTo(models.Todos);
        }
    }
    Items.init(
        {
            name: DataTypes.STRING,
            todoId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Items',
        }
    );
    return Items;
};
