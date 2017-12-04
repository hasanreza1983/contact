module.exports = function(sequelize, DataTypes) {
    var SharedDetails = sequelize.define("SharedDetails", {
        id_shared: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
        id_contact: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
        id_group: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
        from_uid: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
        to_uid: { type: DataTypes.INTEGER, allowNull: true },
        status: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
        created_at: { type: DataTypes.DATE, defaultValue: sequelize.NOW },
        updated_at: { type: DataTypes.DATE, defaultValue: sequelize.NOW }
    }, {
        tableName: 'cms_shared_details',
        underscored: true
    });
    return SharedDetails;
};