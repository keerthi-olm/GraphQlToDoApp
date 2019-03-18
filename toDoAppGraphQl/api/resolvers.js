export default {
  Query: {
    items: (parent, args, { db }, info) => db.post.findAll(),
  },
  Mutation: {
    createItem: (parent, { text}, { db }, info) =>
      db.post.create({
        text: text
      }),
    updateItem: (parent, { text,id}, { db }, info) =>
      db.post.update({
        text: text
      },
      {
        where: {
          id: id
        }
      }),
    deleteItem: (parent, {id}, { db }, info) =>
      db.post.destroy({
        where: {
          id: id
        }
      })
  }
};