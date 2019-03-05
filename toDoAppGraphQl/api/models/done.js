module.exports = (sequelize, type) => {
    return sequelize.define('done', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        done_id: type.INTEGER
    })
}