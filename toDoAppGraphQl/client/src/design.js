import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import "./styles.css";

class ToDoApp extends React.Component {
  constructor(props) {
  }

  componentWillUpdate(nextProps, nextState) {
  }

  render() {
   
  }

  _handleAddItem = () => {


  };

 _handleResetList = () => {
 
  };

  _handleRemoveDoneItems = e => {


  };

  _handleUpdateDoneList = id => {

  };

}

ToDoApp.propTypes = {
  list: PropTypes.array,
  doneList: PropTypes.array
};

ToDoApp.defaultProps = {
  list: ["Get up in the morning", "Brush my teeth"],
  doneList: []
};

class ToDoList extends React.Component {
  constructor(props) {
  
  }
  componentWillReceiveProps(nextProps) {

  }
  _handleCheckBoxClick = (e) => {
  
  }

  render() {
   
  }

  componentWillUnmount() {
   
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<ToDoApp />, rootElement);
