module.exports = function(sequelize, DataTypes) {
  const contact = sequelize.import('./contact')
  var contactEmail = sequelize.define("contactEmail", {
    id_contact_email: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_contact: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false},
    email: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.INTEGER, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false }
  }, {
    tableName: 'cms_contact_email'
  });
  return contactEmail;
};
