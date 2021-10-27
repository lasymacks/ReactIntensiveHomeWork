import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../redux';

const RegistrationModale = () => {

    const dispatch = useDispatch();
    const registration = useSelector(state => state.registration.registration);
    const newUsers = useSelector(state => state.app.newUsers);

    const inputHandler = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;

        switch (fieldName) {
            case 'username':
                dispatch({type: 'SET_REGISTRATION', payload: {...registration, username: value}});
            break;

            case 'password':
                dispatch({type: 'SET_REGISTRATION', payload: {...registration, password: value}});
            break;

            case 'name':
                dispatch({type: 'SET_REGISTRATION', payload: {...registration, name: {firstname: value}}});
            break;

        }
        
    }

    const closeHandler = () => {
        dispatch({type: 'SET_REGISTRATION_MODALE', payload: false});
    }

    const registrationHandler = (e) => {
        e.preventDefault();
    
        if (registration.username.length < 1 || registration.password.length < 1 || registration.name.firstname.length < 1) {
            dispatch({type: 'SET_REGISTRATION', payload: {...registration, error: 'Поле или поля не могут быть пустыми'}});
            return;
        } else {
            dispatch({type: 'SET_REGISTRATION', payload: {...registration, error: ''}});
        }

        fetch('https://fakestoreapi.com/users',{
            method:"POST",
            body:JSON.stringify(
                {
                    email:'John@gmail.com',
                    username:registration.username,
                    password:registration.password,
                    name:{
                        firstname:registration.name,
                        lastname:'Doe'
                    },
                    address:{
                        city:'kilcoole',
                        street:'7835 new road',
                        number:3,
                        zipcode:'12926-3874',
                        geolocation:{
                            lat:'-37.3159',
                            long:'81.1496'
                        }
                    },
                    phone:'1-570-236-7033'
                }
            )
        })
        .then(res=>res.json())
        .then(result => dispatch({type: 'SET_NEW_USERS', payload: newUsers.push(result)}));

        dispatch({type: 'SET_NEW_USERS', payload: [...newUsers, registration]});
        dispatch({type: 'SET_REGISTRATION_MODALE' ,payload: false});
    }

    return (
        <div className='modale-container'>
            <form  className='modale-container__form modale-container__form--registration'>
                <input 
                    className='modale-container__input' 
                    placeholder='Введите логин' 
                    name='username' 
                    onChange={(e) => inputHandler(e)} 
                    value={registration.username}
                    >
                </input>
                <input 
                    className='modale-container__input' 
                    placeholder='Придумайте пароль' 
                    name='password' 
                    onChange={(e) => inputHandler(e)} 
                    value={registration.password}
                    >
                </input>
                <input 
                    className='modale-container__input' 
                    placeholder='Ваше имя' 
                    name='name' 
                    onChange={(e) => inputHandler(e)} 
                    value={registration.name.firstname}
                    >
                </input>
                <button 
                    className='modale-container__form-button' 
                    type='submit' 
                    onClick={(e) => registrationHandler(e)}
                    >
                        Зарегистрироваться
                    </button>
                <button 
                    className='modale-container__button' 
                    type='button'
                    onClick={closeHandler}
                    > X
                </button>
                {registration.error === '' ? 
                    <div></div> :
                    <div className='modale-container__error'>{registration.error}</div> 
                }
            </form>
        </div>
    )
}

export default RegistrationModale;