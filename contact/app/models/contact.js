module.exports = function(sequelize, DataTypes) {
  var Contact = sequelize.define("Contact", {
    id_contact: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    uid_ua_user: { type: DataTypes.STRING, foreignKey: true, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    fname: { type: DataTypes.STRING, allowNull: false },
    lname: { type: DataTypes.STRING, allowNull: false },
    intl_code: { type: DataTypes.STRING, allowNull: false },
    designation: { type: DataTypes.STRING, allowNull: false },
    department: { type: DataTypes.STRING, allowNull: false },
    organisation: { type: DataTypes.STRING, allowNull: false },
    id_am_crm_subuser: { type: DataTypes.INTEGER, allowNull: false },
    last_active_time: { type: DataTypes.DATE, allowNull: false },
    is_online: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.INTEGER, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false }
  }, {
    tableName: 'cms_contact'
  });
  return Contact;
};
