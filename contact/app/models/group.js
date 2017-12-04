module.exports = function(sequelize, DataTypes) {
    var Group = sequelize.define("Group", {
        group_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        uid: { type: DataTypes.STRING, foreignKey: true, allowNull: true },
        group_name: { type: DataTypes.STRING, allowNull: true },
        status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        created_at: { type: DataTypes.DATE, defaultValue: sequelize.NOW },
        updated_at: { type: DataTypes.DATE, defaultValue: sequelize.NOW }
    }, {
        tableName: 'cms_group',
        underscored: true
    });
    return Group;
};