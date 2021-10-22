import React from 'react';

const Button = (props) => {
    return (
        <button 
        className='button' 
        type={props.type} 
        name={props.name} 
        onClick={props.handler}
        >{props.description}</button>
    )
}

export default Button;