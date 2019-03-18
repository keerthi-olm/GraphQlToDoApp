export default `
  type Item {
    id: ID!
    text: String!
    done: Boolean!
  }
  type Query {
    items: [Item!]!
  }
  type Mutation {
    createItem(text: String): Item!
    updateItem(id: ID!, done:Boolean!): Item!
    deleteItem(id: ID!): Item!
  }
  `;