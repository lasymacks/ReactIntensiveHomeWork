import React, { useEffect, useState } from 'react';

const Modale = (props) => {

    const [authorization, setAuthorization] = useState({
        login: '',
        password: '',
        formErrors: '',
        loginValid: '',
        passwordValid: '',
        formValid: '',
        currentError: ''
    });

    const inputHandler = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        setAuthorization(Object.assign((authorization, { ...authorization,[name]: value})))
    }

    const formHandler = (event) => {
        event.preventDefault();

        let loginValidData = authorization.loginValid;
        let passwordValidData = authorization.passwordValid;
        let formValidData = authorization.formValid;
        let currentErrorData = authorization.currentError;
        let formErrorsData = authorization.formErrors;

        switch (authorization.login) {

            case 'admin':
                if (authorization.password !== 'user') {
                    loginValidData = true;
                    formErrorsData = '';
                } else {
                    loginValidData = false;
                    formErrorsData = 'Некорректный логин';
                }
            break;

            case 'user':
                if (authorization.password !== 'admin') {
                    loginValidData = true;
                    formErrorsData = '';
                } else {
                    loginValidData = false;
                    formErrorsData = 'Некорректный логин';
                }
            break;

            default: 
                loginValidData = false;
                formErrorsData = 'Некорректный логин';
            break;
        }

        switch (authorization.password) {

            case 'admin':
                if (authorization.login !== 'user') {
                    passwordValidData = true;
                    formErrorsData = '';
                } else {
                    passwordValidData = false;
                    formErrorsData = 'Некорректный пароль';
                }
            break;

            case 'user':
                if (authorization.login !== 'admin') {
                    passwordValidData = true;
                    formErrorsData = '';
                } else {
                    passwordValidData = false;
                    formErrorsData = 'Некорректный пароль';
                }
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

        setAuthorization({...authorization, 
            loginValid: loginValidData, 
            passwordValid: passwordValidData, 
            formValid: formValidData,
            formErrors: formErrorsData,
            currentError: currentErrorData
        })

        if (formValidData) {
            props.loginHandler();
            props.roleSetter(() => authorization.login);
            const currentRole = {current: authorization.login}
            fetch(`http://localhost:3000/role`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(currentRole)
            });
        }

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
                        placeholder='Пароль' name='password' 
                        onChange={(e) => inputHandler(e)} value={authorization.password}>
                    </input>
                    <button className='modale-container__form-button' type='submit' onClick={(e) => formHandler(e)}>Войти</button>
                    <button className='modale-container__button' onClick={() => props.handler}>X</button>

                    {(authorization.formValid === '' || authorization.formValid === true) ? 
                        <div></div> :
                        <div className='modale-container__error'>{authorization.currentError}</div> 
                        
                    }

            </form>
        </div>
    )
}

export default Modale;