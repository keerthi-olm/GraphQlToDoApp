query {
  item(id:"1"){id,text}
}

// {
//   "data": {
//     "item": {
//       "id": "1",
//       "text": "Wake up"
//     }
//   }
// }

query {
  items {id,text}
}

// {
//   "data": {
//     "items": [
//       {
//         "id": "1",
//         "text": "Wake up"
//       },
//       {
//         "id": "2",
//         "text": "Brush teeth"
//       }
//     ]
//   }
// }



   mutation {
     createItem(text:"Go to work"){id,text}
    
   }

// {
//   "data": {
//     "items": [
//       {
//         "id": "1",
//         "text": "Wake up",
//         "done": false
//       },
//       {
//         "id": "2",
//         "text": "Brush teeth",
//         "done": false
//       },
//       {
//         "id": "3",
//         "text": "Go to work",
//         "done": false
//       }
//     ]
//   }
// }
  mutation {
     createItem(text:"Have lunch"){id,text}
    
   }

// {
//   "data": {
//     "items": [
//       {
//         "id": "1",
//         "text": "Wake up"
//       },
//       {
//         "id": "2",
//         "text": "Brush teeth"
//       },
//       {
//         "id": "3",
//         "text": "Go to work"
//       },
//       {
//         "id": "4",
//         "text": "Have lunch"
//       }
//     ]
//   }
// }

  mutation {
     deleteItem(id:"3"){id,text}
    
   }

// {
//   "data": {
//     "items": [
//       {
//         "id": "1",
//         "text": "Wake up"
//       },
//       {
//         "id": "2",
//         "text": "Brush teeth"
//       },
//       {
//         "id": "4",
//         "text": "Have lunch"
//       }
//     ]
//   }
// }


 mutation {
     updateItem(id:"2",done:true){id,text,done}
    
   }

// {
//   "data": {
//     "items": [
//       {
//         "id": "1",
//         "text": "Wake up",
//         "done": false
//       },
//       {
//         "id": "2",
//         "text": "Brush teeth",
//         "done": true
//       },
//       {
//         "id": "4",
//         "text": "Have lunch",
//         "done": false
//       }
//     ]
//   }
// }

  mutation {
     deleteDoneItems {id,text,done}
    
   }
