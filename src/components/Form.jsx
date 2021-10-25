import React, { useState } from 'react';

const Form = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
    const [error, setError] = useState('');

    const inputHandler = (e) => {
        setInputValue(() => e.target.value);
    }

    const inputHandlerBlur = (e) => {
        setInputValue((prev) => prev.trim());
    }

    const textareaHandler = (e) => {
        setTextareaValue(() => e.target.value);
    }

    const textareaHandlerBlur = (e) => {
        setTextareaValue((prev) => prev.trim());
    }

    const editHandler = (e) => {
        e.preventDefault();
        if (inputValue === '' || textareaValue === '') {
            setError(() => 'Поля или поле не могут быть пустыми');
            return;
        }
        if (inputValue.length > 30) {
            setError(() => 'Название товара не может превышать 30 букв');
            return;
        }
        if (textareaValue.length > 600) {
            setError(() => 'Описание товара не может превышать 600 букв');
            return;
        }
        setError(() => '');

        const newItem = {...props.items, name: String(inputValue), description: String(textareaValue)}
        if (error === '') {
            props.itemsSetter(() => newItem);
        }

        fetch(`http://localhost:3000/goods/${props.id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newItem)
        });

        props.editSetter(() => false);
    }

    return (
        <form className='cardContainer__right cardContainer__right--more'>
            <input 
                className='cardContainer__right__input' 
                value={inputValue} 
                onBlur={(e) => inputHandlerBlur(e)} 
                onChange={(e) => inputHandler(e)}>
            </input>
            <textarea 
                className='cardContainer__right__textarea' 
                value={textareaValue} 
                onBlur={(e) => textareaHandlerBlur(e)} 
                onChange={(e) => textareaHandler(e)}>
            </textarea>
            <div className='description description--more'>В наличии - {props.items.inStock ? props.items.inStock : 0} кг</div>
            <div className='price price--more'>{props.items.price}р / кг</div>
            <button className='button button--save' onClick={(e) => editHandler(e)}>Сохранить</button>
            {error !== '' && <div className='cardContainer__right__error'>{error}</div>}
        </form>
    )
}

export default Form;