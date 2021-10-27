import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../redux';

const Form = () => {

    const dispatch = useDispatch();
    const inputValue = useSelector(state => state.form.inputValue);
    const textareaValue = useSelector(state => state.form.textareaValue);
    const errors = useSelector(state => state.form.errors);

    const id = useSelector(state => state.card.id);
    const cards = useSelector(state => state.more.cards);

    const inputHandler = (e) => {
        dispatch({type: 'SET_INPUT_VALUE', payload: e.target.value});
    }

    const inputHandlerBlur = () => {
        dispatch({type: 'SET_INPUT_VALUE', payload: inputValue.trim()});
    }

    const textareaHandler = (e) => {
        dispatch({type: 'SET_TEXTAREA_VALUE', payload: e.target.value});
    }

    const textareaHandlerBlur = () => {
        dispatch({type: 'SET_TEXTAREA_VALUE', payload: textareaValue.trim()});
    }

    const editHandler = (e) => {
        e.preventDefault();
        if (inputValue === '' || textareaValue === '') {
            dispatch({type: 'SET_ERRORS', payload: 'Поля или поле не могут быть пустыми'});
            return;
        }
        if (inputValue.length > 30) {
            dispatch({type: 'SET_ERRORS', payload: 'Название товара не может превышать 30 букв'});
            return;
        }
        if (textareaValue.length > 600) {
            dispatch({type: 'SET_ERRORS', payload: 'Описание товара не может превышать 600 букв'});
            return;
        }
        dispatch({type: 'SET_ERRORS', payload: ''});

        const newItem = {...cards, title: String(inputValue), description: String(textareaValue)}
        if (errors === '') {
            dispatch({type: 'SET_CARDS', payload: newItem});
        }

        fetch(`http://localhost:3000/goods/${id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newItem)
        });

        dispatch({type: 'SET_EDIT', payload: false})
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
            <div className='description description--more'>В наличии - {cards.inStock ? cards.inStock : 0} кг</div>
            <div className='price price--more'>{cards.price}р / кг</div>
            <button className='button button--save' onClick={(e) => editHandler(e)}>Сохранить</button>
            {errors !== '' && <div className='cardContainer__right__error'>{errors}</div>}
        </form>
    )
}

export default Form;