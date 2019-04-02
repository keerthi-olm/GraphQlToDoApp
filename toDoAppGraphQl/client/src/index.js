import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import axios from 'axios';

import "./styles.css";

class ToDoApp extends React.Component {
  constructor(props) {
    super();
    var items=[];
    this.state = { list: [], change: "false" , doneList:[]};
    this.newItem = React.createRef();
    this.doneList=[...props.doneList];
    this.list=[...this.state.list];
    
  }

componentDidMount() {
   this.getItems(this);
}

getItems() {
axios({
  url: 'http://localhost:3000/graphql',
  method: 'post',
  data: { 
        query:` {
          items {id,text,done}
        }`
   }  

},{crossDomain: true}).then(res => {
    const myitems = res.data.data.items;
    // this.setState({ persons });
    var items_list=[...myitems];
    var items=items_list.map(function(a){return a.text});
    var filtered = items_list.filter(function(value, index, arr){  
                                    return value.done===true;
                                    });

    var doneList=filtered.map(function(a){return a.id });
    this.setState({ list: [...items_list] ,doneList:[...doneList] });  
    console.log(myitems);
  });

  // axios(`http://localhost:3000/api/items`,{crossDomain: true})
  // .then(res => {
  //   const myitems = res.data;
  //   // this.setState({ persons });
  //   var items_list=[...myitems];
  //   var items=items_list.map(function(a){return a.text});
  //   var filtered = items_list.filter(function(value, index, arr){  
  //                                   return value.done===true;
  //                                   });

  //   var doneList=filtered.map(function(a){return a.id });
  //   this.setState({ list: [...items_list] ,doneList:[...doneList] });  
  // });
}

componentWillUpdate(nextProps, nextState) {
  this.doneList=[];
  this.list=[...nextState.list];
  this.newItem.current["value"]='';

}

render() {
let done=this.state.doneList;
    return (
      <div className="App">
        <ul id="todo_widget">
          <li className="header"><h2 className='title'>My to do list </h2></li>
          <li className="new_item add_reset_section">
            <input ref={this.newItem} placeholder="Add a new task..."/>
          </li>
          <li className="button add">
            <button onClick={this._handleAddItem}>Add</button>
          </li>
          <li className="button reset">
            <button onClick={this._handleResetList}>Reset</button>
          </li>
          {this.state.list.map((value, i) => {
            return <ToDoList key={i} item={value} done={done.includes(value.id)} remove={this._handleRemoveDoneItems} removeItem={this._handleUpdateDoneList}/>;
          })}
          <li className="footer"><button className='remove'  onClick={this._handleRemoveDoneItems}>
          Remove
        </button></li>
        </ul>
      </div>
    );
  }

  _handleAddItem = () => {
    let newItem = this.newItem.current["value"];
    let getItems=this.getItems;
    let _self=this;

    axios({
      url: 'http://localhost:3000/graphql',
      method: 'post',
      data: { 
      query:`mutation {
         createItem(text:"${newItem}"){id,text}
        
       }`
       }  
    }).then(function (response) {
            getItems.call(_self);
          })
          .catch(function (error) {
            console.log(error);
    });

  //   axios.post(`http://localhost:3000/api/items`,{
  //   text: newItem,
  //     },{crossDomain: true},)
  //     .then(function (response) {
  //       getItems.call(_self);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });

   };

 _handleResetList = () => {


    let getItems=this.getItems;
    let _self=this;
          axios({
      url: 'http://localhost:3000/graphql',
      method: 'post',
      data: { 
      query:`mutation {
         resetItems {id,text,done}
        
       }`
       }  
    }).then(function (response) {
        getItems.call(_self);
      })
      .catch(function (error) {
        console.log(error);
      });

      //   axios.delete(`http://localhost:3000/api/delete_items`,{
      // },{crossDomain: true},)
      // .then(function (response) {
      //   getItems.call(_self);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });

  };

  _handleRemoveDoneItems = e => {
    let getItems=this.getItems;
    let _self=this;
      //   axios.delete(`http://localhost:3000/api/delete_done_items`,{
      // },{crossDomain: true},)
      // .then(function (response) {
      //   getItems.call(_self);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
          axios({
      url: 'http://localhost:3000/graphql',
      method: 'post',
      data: { 
      query:`mutation {
         deleteDoneItems {id,text,done}
        
       }`
       }  
    }).then(function (response) {
        getItems.call(_self);
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  _handleUpdateDoneList = (id,done) => {


    let getItems=this.getItems;
    let _self=this;
    // axios.post(`http://localhost:3000/api/done_items`,{
    //     done: !done,
    //     id: id,
    //   },{crossDomain: true},)
    //   .then(function (response) {
    //     getItems.call(_self);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    axios({
      url: 'http://localhost:3000/graphql',
      method: 'post',
      data: { 
      query:`mutation {
         updateItem(id:"${id}",done: ${!done}){id,text,done}
        
       }`
       }  
    }).then(function (response) {
        getItems.call(_self);
      })
      .catch(function (error) {
        console.log(error);
      });

  };

}

ToDoApp.propTypes = {
  list: PropTypes.array
};

ToDoApp.defaultProps = {
  list: [],
  doneList: []
};

class ToDoList extends React.Component {
  constructor(props) {
    super();
    this.state = { value: props.item , checked:false};
    console.log(
      "ToDoList->Constructor : item value is initialised as..." +
        JSON.stringify(this.state)
    );
    console.log('-- ToDoList will RENDER..."' + this.state.value + '" to list');
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.item !== this.props.item)
      this.setState({ ...this.state, value: nextProps.item , checked:false});
    console.log(
      'ToDoList -> componentWillReceiveProps : detected property change..."' +
        nextProps.item +
        "--" +
        this.props.item
    );
  }
  _handleCheckBoxClick = () => {
    // this.setState({
    //   checked: !this.state.checked
    // });
   this.props.removeItem(this.props.item.id,this.props.done);
   console.log(this.props.item.id);
  }

  render() {
    /** RENDER  **/
    console.log("-- render");
   
    
    let text = this.props.done ? <strike>{this.state.value.text}</strike> : this.state.value.text;
    let checked= this.props.done ? 'checked' : '';
    return (
      <li className="todo_item ">
        <input className='checkbox' type="checkbox" onClick={this._handleCheckBoxClick} id={this.props.i} checked={checked} />{text}
      </li>
    );
  }

  componentWillUnmount() {
    console.log(
      "ToDoList -> componentWillUnmount :  unmount and  delete item .." + this.state.value
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<ToDoApp />, rootElement);
