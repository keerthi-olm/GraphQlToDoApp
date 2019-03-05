module.exports = (sequelize, type) => {
    return sequelize.define('item', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        text: type.STRING,
        done: {type: type.BOOLEAN, defaultValue: false}
    })
}