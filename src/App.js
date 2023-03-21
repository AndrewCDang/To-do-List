import './App.css';
import { useSelector, useDispatch } from "react-redux";
import { edit, editCompleted, addItem, delItem } from "./store/toDoList";
import { useEffect, useState } from "react";
import { toDoSlice } from "./store/toDoList";

function App() {
  // Initiating dispatch function
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toDo.data);

  // Converting data object to array of key value pairs using Object.entries. 
  //Now able to pass through key values when using map fucntion.
  const dataArray = Object.entries(data);

  // Function which toggles edit/finalise button.
  const editContent = (e) => {
    const button = e.target;
    const btnParent = button.parentNode;
    const inputField = btnParent.getElementsByClassName('input')[0];
    if (inputField.disabled) {
      button.innerText = 'Finalise';
      button.classList.add('edit-on');
    } else {
      button.innerText = 'Edit';
      button.classList.remove('edit-on');
    };
    inputField.disabled= !inputField.disabled;
  }

  // Use effect hook executes when DOM is rendered/updated, goes through all check-boxes and checks if initial state is 'true'.
  // Updates (checks or unchecks updates to 'data')
  useEffect(()=>{
    const checkboxes = document.getElementsByClassName('checkbox');
    for(let i=0; i<checkboxes.length; i++){
      if(checkboxes[i].getAttribute('state')=='true'){
        checkboxes[i].checked=true;

        // Adding strikethrough
        const parent = checkboxes[i].parentNode;
        const input = parent.getElementsByClassName('input')[0];
        input.classList.add('strikethrough');
      }
      else{
        checkboxes[i].checked=false;
        // Removing strikethrough
        const parent = checkboxes[i].parentNode;
        const input = parent.getElementsByClassName('input')[0];
        input.classList.remove('strikethrough');
      }
    }
  },[data])

  const toggleComplete = (e) => {
    // e.preventDefault()
    const id = e.target.getAttribute('keyId');
    const complete = String(e.target.checked);
    dispatch(editCompleted({id, complete}));
  }

  // Use Effect - auto expanding text area - referenced from https://codepen.io/vsync/pen/bGgQzL
  useEffect(()=>{
    function getScrollHeight(elm){
      var savedValue = elm.value
      elm.value = ''
      elm._baseScrollHeight = elm.scrollHeight
      elm.value = savedValue
    }
    
    function onExpandableTextareaInput({ target:elm }){
      // make sure the input event originated from a textarea and it's desired to be auto-expandable
      if( !elm.classList.contains('autoExpand') || !elm.nodeName == 'TEXTAREA' ) return
      
      var minRows = elm.getAttribute('data-min-rows')|0, rows;
      !elm._baseScrollHeight && getScrollHeight(elm)
    
      elm.rows = minRows
      rows = Math.ceil((elm.scrollHeight - elm._baseScrollHeight) / 16)
      elm.rows = minRows + rows
    }
    // global delegated event listener
    document.addEventListener('input', onExpandableTextareaInput)
  },[])


  return (
    <div className="App">
      <h1 className='title'>To-do List</h1>
      <div className='toDo-container'>
        {dataArray.map(([key, value]) => (
          // Assigning key to each map, so react knows which component matches with array
          <div key={key} className="toDo-item">
            <div className='toDo-group'>
              <input type="checkbox" className='checkbox' state={value.completed} keyId={key} name="scales" onClick={(e) => toggleComplete(e)} />
              <div className='del' keyId={key} onClick={(e)=>dispatch(delItem(e.target.getAttribute('keyId')))}>x</div>
              {/* Input set with 'default value', set via initial state in createSlice function. On change, keyid and content is dispatched to set the state.*/}
              <textarea data-min-rows='2' disabled keyId={key} className='input autoExpand' type="text" defaultValue={value.content} onChange={(e) => {dispatch(editContent({id: e.target.getAttribute('keyId'), content: e.target.value})); console.log(dataArray);}}></textarea>
              {/* On click, editContent function is invoked, toggling disabled attribute of 'toDo' input*/}            
            </div>
            <button className='edit' onClick={(e)=>editContent(e)}>Edit</button>
          </div>
        ))}
        <div className='add-item' onClick={() => dispatch(addItem())}>+ add item</div>
      </div>
    </div>
  );
}

export default App;

