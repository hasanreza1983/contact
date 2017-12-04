module.exports = function(sequelize, DataTypes) {
  var serviceDetails = sequelize.define("serviceDetails", {
    id_contact_service: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_contact: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
    to_uid: { type: DataTypes.INTEGER, allowNull: false },
    id_group: { type: DataTypes.INTEGER, foreignKey:true, allowNull: false },
    id_service: { type: DataTypes.INTEGER, foreignKey:true, allowNull: false },
    is_shared: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.INTEGER, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: sequelize.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: sequelize.NOW }
  }, {
    tableName: 'cms_contact_service',
  });
  return serviceDetails;
};
