import React, { Component } from 'react'
import "./item-add-form.css";
const style=
   { marginRight:'15px'

    ,padding:'5px 57px'}
   
export default class ItemAddForm extends Component {

state={
    value:''
}

handleChange=(event)=>{
    event.preventDefault();
    this.setState({value:event.target.value});
}

onSubmit=(e)=>{
    e.preventDefault();
    this.props.addItem(this.state.value);
    this.setState({
        value:''
    })
}

    render() {
        return (
            <form onSubmit={this.onSubmit} className='item-add-form d-flex'>
                <input className='form-control' value={this.state.value} style={style} onChange={this.handleChange} placeholder='write new task' />
                <button  className='btn btn-outline-secondary'>Add Item</button>
            </form>
        )
    }
}
