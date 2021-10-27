import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../redux';

const Modale = (props) => {

    const dispatch = useDispatch();
    const authorization = useSelector(state => state.modale.authorization);
    const users = useSelector(state => state.app.users);
    const newUsers = useSelector(state => state.app.newUsers);

    const inputHandler = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        dispatch({type: 'SET_AUTHORIZATION', payload: { ...authorization,[name]: value}});
    }

    const formHandler = (event) => {
        event.preventDefault();

        let loginValidData = authorization.loginValid;
        let passwordValidData = authorization.passwordValid;
        let formValidData = authorization.formValid;
        let currentErrorData = authorization.currentError;
        let formErrorsData = authorization.formErrors;

        const currentUser = users.reduce((acc, item) => {
            if (item.username === authorization.login || item.password === authorization.password) { 
                return Object.assign(acc, item);
            }
            return acc;
        }, {})

        const currentNewUser = newUsers.reduce((acc, item) => {
            if (item.username === authorization.login || item.password === authorization.password) { 
                return Object.assign(acc, item);
            }
            return acc;
        }, {})

        switch (authorization.login) {

            case currentUser.username:
                loginValidData = true;
                formErrorsData = '';
            break;

            case currentNewUser.username:
                loginValidData = true;
                formErrorsData = '';
            break;

            default: 
                loginValidData = false;
                formErrorsData = 'Некорректный логин';
            break;
        }

        switch (authorization.password) {

            case currentUser.password:
                passwordValidData = true;
                formErrorsData = '';
            break;

            case currentNewUser.password:
                passwordValidData = true;
                formErrorsData = '';
            break;

            default: 
                passwordValidData = false;
                formErrorsData = 'Некорректный пароль';
            break;
        }

        formValidData = false;
        if (loginValidData === false) {
            formErrorsData = 'Некорректный логин';
        }
        if (passwordValidData === false) {
            formErrorsData = 'Некорректный пароль';
        }
        if (loginValidData === true  && passwordValidData === true) {
            formValidData = true;
            formErrorsData = '';
        } 
        if (loginValidData !== true && passwordValidData !== true) {
            formValidData = false;
            formErrorsData = 'Некорректные логин и пароль';
        }

        currentErrorData = formErrorsData;
        
        if (typeof(currentErrorData) === 'object') {
            currentErrorData = Object.values(currentErrorData);
        }

        dispatch({type: 'SET_AUTHORIZATION', payload: {...authorization, 
            loginValid: loginValidData, 
            passwordValid: passwordValidData, 
            formValid: formValidData,
            formErrors: formErrorsData,
            currentError: currentErrorData
            }
        })

        if (formValidData) {
            props.loginHandler();
            if (currentUser.username) {
                dispatch({type: 'SET_ROLE' , payload: currentUser.name.firstname});
            } else {    
                dispatch({type: 'SET_ROLE' , payload: currentNewUser.name.firstname});
            }
            
        }

    }

    const closeHandler = () => {
        dispatch({type: "SET_MODALE", payload: false});
    }

    return (
        <div className='modale-container'>
            <form  className='modale-container__form'>
                    <input 
                        className='modale-container__input' 
                        placeholder='Логин' 
                        name='login' 
                        onChange={(e) => inputHandler(e)} 
                        value={authorization.login}>
                    </input>
                    <input 
                        className='modale-container__input' 
                        placeholder='Пароль' 
                        name='password' 
                        onChange={(e) => inputHandler(e)} 
                        value={authorization.password}>
                    </input>
                    <button 
                        className='modale-container__form-button' 
                        type='submit' 
                        onClick={(e) => formHandler(e)}
                        >  Войти
                    </button>
                    <button 
                        className='modale-container__button' 
                        type='button'
                        onClick={closeHandler}
                        > X
                    </button>

                    {(authorization.formValid === '' || authorization.formValid === true) ? 
                        <div></div> :
                        <div className='modale-container__error'>{authorization.currentError}</div> 
                        
                    }

            </form>
        </div>
    )
}

export default Modale;