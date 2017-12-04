module.exports = function(sequelize, DataTypes) {
  var groupMember = sequelize.define("groupMember", {
    id_group_member: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_contact: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
    id_group: { type: DataTypes.INTEGER, foreignKey:true, allowNull: false },
    status: { type: DataTypes.INTEGER, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: sequelize.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: sequelize.NOW }
  }, {
    tableName: 'cms_group_member',
  });
  return groupMember;
};
