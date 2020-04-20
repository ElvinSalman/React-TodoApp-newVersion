import React,{Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';


import './app.css';
import ItemAddForm from '../item-add-form/item-add-form';

export default class App extends Component {
maxId=100;

  state={
  todoData : [
    this.createTodoItem('Drink Coffee'),
    this.createTodoItem('Make Awesome App'),
    this.createTodoItem('Have a lunch')
  ],
  term:'',
  filter:'all'//active,all,done
}


createTodoItem(label){
return{
  label,
  important:false,
  done:false,
  id:this.maxId++};
}

deleteItem=(id)=>{
this.setState(({ todoData })=>{
  const idx=todoData.findIndex((el)=>el.id===id);
  todoData.splice(idx,1);


  const before=todoData.slice(0,idx);
  const after=todoData.slice(idx);

  const newArray=[...before,...after];

  return{
    todoData:newArray
  }
})
}

addNewItem=(text)=>{
const newItem=this.createTodoItem(text);

  this.setState(
  ({todoData})=>{
  
    const newArr=[...todoData,newItem];
   
    return{
      todoData:newArr,
    }
  }
)
};

toggleProperty(arr,id,propName){
  const idx=arr.findIndex((el)=>el.id===id);

  //1.update object
  const oldItem=arr[idx];
  const newItem={...oldItem,[propName]:!oldItem[propName]};

  //2
  const before=arr.slice(0,idx);
  const after=arr.slice(idx+1);

return[...before,newItem,...after];

}

onToggleImportant=(id)=>
{
  this.setState(({todoData})=>{
   return{
     todoData:this.toggleProperty(todoData,id,'important')
   }
  })
};

onToggleDone=(id)=>{
this.setState(({todoData})=>{
  return{
    todoData:this.toggleProperty(todoData,id,'done')
  }
})
};

search(items,term){
  if(term.length===0){
    return items;
  }
  return items.filter((item)=>{
    return item.label.toLowerCase().indexOf(term.toLowerCase())>-1;
  })
}

onSearchChange=(term)=>{
  this.setState({term});
};


filter(items,filter){
switch(filter){
  case 'all':
    return items;
  case 'active':
    return items.filter((item)=>!item.done);
  case 'done':
    return items.filter((item)=>item.done);
  default:
    return items;
}
}

onFilterChange=(filter)=>{
this.setState({filter})
}
 render(){
   const {term,todoData,filter}=this.state;

   const visiableItems=this.filter(this.search(todoData,term),filter);
  const doneCount=todoData.filter((el)=>el.done).length;
  
  const todoCount=todoData.length-doneCount;

  return (
    <div className="todo-app">
      <AppHeader toDo={todoCount} done={doneCount} />
      <div className="top-panel d-flex">
        <SearchPanel onSearchChange={this.onSearchChange} />
        <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange} />
      </div>

      <TodoList todos={visiableItems} onDeleted={this.deleteItem} 
      onToggleImportant={this.onToggleImportant} onToggleDone={this.onToggleDone}
      />
      <ItemAddForm addItem={this.addNewItem}/>
    </div>
  );
};}


