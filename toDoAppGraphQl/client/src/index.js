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
    console.clear();
    console.log(
      "ToDoApp-> Constructor :  list is initialised as..." +
        JSON.stringify(this.list)
    );
  }

componentDidMount() {
this.getItems(this);
  
}

getItems() {

      axios(`http://localhost:3000/api/items`,{crossDomain: true})
      .then(res => {
        const myitems = res.data;
        // this.setState({ persons });
         var items_list=[...myitems];
            var items=items_list.map(function(a){return a.text});
            var filtered = items_list.filter(function(value, index, arr){     console.log('--->');console.log(value.done);
                                        return value.done===true;
                                        });

            var doneList=filtered.map(function(a){return a.id });

     console.log(doneList);
     this.setState({ list: [...items_list] ,doneList:[...doneList] });
     
      });
}

componentWillUpdate(nextProps, nextState) {
   console.log('will update');
       this.doneList=[];
    this.list=[...nextState.list];
    console.log(this.list);
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
    //  let newItem =this.refs.newItem.value;
    let newItem = this.newItem.current["value"];
    let getItems=this.getItems;
    let _self=this;

    axios.post(`http://localhost:3000/api/items`,{
    text: newItem,
      },{crossDomain: true},)
      .then(function (response) {
        getItems.call(_self)
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  };

 _handleResetList = () => {
    //  let newItem =this.refs.newItem.value;
    console.log("\n ***Reset Button Pressed... **");
    console.log(
      "Reset handler will reset list to default values..." +
        JSON.stringify(ToDoApp.defaultProps.list)
    );

    this.setState({ list: [...ToDoApp.defaultProps.list] });
  };

  _handleRemoveDoneItems = e => {


    this.doneList.sort((a, b) => a - b);
    console.log(this.doneList);
    for (var i = this.doneList.length -1; i >= 0; i--)
       this.list.splice(this.doneList[i],1);

    this.setState({ list: [...this.list] });
   
    console.log(this.list);
    this.doneList=[];

  };

  _handleUpdateDoneList = (id,done) => {
console.log(id);
let getItems=this.getItems;
let _self=this;
axios.post(`http://localhost:3000/api/done_items`,{
    done: !done,
    id: id,
  },{crossDomain: true},)
  .then(function (response) {
    getItems.call(_self)
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

      // this.state.list

      // let checkIfInDoneList = this.doneList.filter(function (val) {
      //     return (val === id);
      // });

      // if (checkIfInDoneList===undefined || checkIfInDoneList.length===0) {
      // // add to list
      // this.doneList.push(id);
      // } else {
      // //delete from list
      // this.doneList= this.doneList.filter(function (val) {
      //     return (val !== id);
      // });
      // }
      //      console.log('donelist afterremove-->');
      //      console.log(this.doneList);

  };

}

ToDoApp.propTypes = {
  list: PropTypes.array
};

ToDoApp.defaultProps = {
  list: ["Get up in the morning", "Brush my teeth"],
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
