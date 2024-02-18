module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Model', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  
    return Model;
  };