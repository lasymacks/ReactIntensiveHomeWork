import React, { useEffect, useState } from 'react';
import FormErrors from './FromErrors';

const Modale = (props) => {

    const [authorization, setAuthorization] = useState({
        login: '',
        password: '',
        formErrors: {login: '', password: '', all: ''},
        loginValid: false,
        passwordValid: false,
        formValid: false
    });

    const inputHandler = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        setAuthorization(Object.assign((authorization, { ...authorization,[name]: value}),
            () => { logInValidator(name, value) }))
    }

    const formHandler = (event) => {
        event.preventDefault();

        const formErrors = authorization.formErrors;
        const formValid = authorization.formValid;

        if ([formErrors.login] !== '' && [formErrors.password] !== '') {
            setAuthorization(Object.assign(authorization, {
                formErrors: {...formErrors, all: 'Некорректные логин и пароль'}
            }))
            return;
        }

        if (authorization.loginValid && authorization.passwordValid) {
            setAuthorization(Object.assign(authorization, {[formValid]: true}))
            return;
        }

    }

    const logInValidator = (name, value) => {

        console.log('validator');
        const formErrors = authorization.formErrors;

        switch (name) {

            case 'login':
                console.log('login', name);
                switch (value) {
                    case 'admin':
                        authorization.password === 'user' ? 
                        setAuthorization(Object.assign(authorization, 
                            {loginValid: false},
                            {formErrors: {...formErrors ,login: 'Некорректный логин'}}
                            )) :
                            setAuthorization(Object.assign(authorization, {loginValid: true})) ;
                    break;

                    case 'user':
                        authorization.password === 'admin' ? 
                        setAuthorization(Object.assign(authorization, 
                            {loginValid: false},
                            {formErrors: {...formErrors ,login: 'Некорректный логин'}}
                            )) :
                            setAuthorization(Object.assign(authorization, {loginValid: true})) ;
                    break;

                    default: 
                        console.log('bad login');
                        setAuthorization(Object.assign(authorization, 
                            {loginValid: false},
                            {formErrors: {...formErrors ,login: 'Некорректный логин'}}
                            ));
                    break;
                }

            break;

            case 'password':

                switch (value) {
                    case 'admin':
                        authorization.login === 'user' ? 
                        setAuthorization(Object.assign(authorization, 
                            {passwordValid: false},
                            {formErrors: {...formErrors ,password: 'Некорректный пароль'}}
                            )) :
                            setAuthorization(Object.assign(authorization, {passwordValid: true})) ;
                    break;

                    case 'user':
                        authorization.login === 'admin' ? 
                        setAuthorization(Object.assign(authorization, 
                            {passwordValid: false},
                            {formErrors: {...formErrors ,password: 'Некорректный пароль'}}
                            )) :
                            setAuthorization(Object.assign(authorization, {passwordValid: true})) ;
                    break;

                    default: 
                        setAuthorization(Object.assign(authorization, 
                            {passwordValid: false}, 
                            {formErrors: {...formErrors ,password: 'Некорректный пароль'}}
                            ));
                    break;
                }

            break;

            default: 
            break;

        }
    }

    return (
        <div className='modale-container'>
            <form  className='modale-container__form'>
                    <input className='modale-container__input' placeholder='Логин' name='login' onChange={(e) => inputHandler(e)} value={authorization.login}></input>
                    <input className='modale-container__input' placeholder='Пароль' name='password' onChange={(e) => inputHandler(e)} value={authorization.password}></input>
                    <button className='modale-container__form-button' type='submit' onClick={(e) => formHandler(e)}>Отправить</button>
                    <button className='modale-container__button' onClick={() => props.handler}>X</button>

                    <FormErrors erorrs={authorization.loginValid} />

            </form>
        </div>
    )
}

export default Modale;