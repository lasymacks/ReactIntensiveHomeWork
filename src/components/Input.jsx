import React, { forwardRef, useState } from 'react';

const Input = forwardRef((props, ref) => {
    
    const [description, setDescription] = useState(props.description);
    const [name, setName] = useState(props.name);
    const [visited, setVisited] = useState(props.false);
    const [error, setError] = useState(props.error);
    const [currentError, setCurrentError] = useState(error);
    const [value, setValue] = useState('');


    const validateInput = (event) => {
        setValue(event.target.value.trim());
        setVisited(true);
        if (event.target.value.length < 1) {
            setCurrentError(error);
            return;
        }
        if (event.target.value == 0) {
            setVisited(true);
            setCurrentError('Значение не может быть пробелом');
            return;
        }
        switch(String(event.target.name)) {

            case 'firstName':
                const validFirstName = /^[a-zA-Zа-яА-Я]+$/ui;
                setVisited(true);
                if (!validFirstName.test(String(event.target.value).toLocaleLowerCase())) {
                    setCurrentError('Имя должно состоять из букв без пробелов');
                    break;
                }
                if (event.target.value[0] === event.target.value[0].toLocaleLowerCase()) {
                    setCurrentError('Имя должно начинаться с заглавной буквы');
                    break;
                }
                setVisited(false);
                setCurrentError('');
                break;
                
            case 'lastName':
                const validLastName = /^[a-zA-Zа-яА-Я]+$/ui;
                setVisited(true);
                if (!validLastName.test(String(event.target.value).toLocaleLowerCase())) {
                    setCurrentError('Фамилия должна состоять из букв без пробелов');
                    break;
                }
                if (event.target.value[0] === event.target.value[0].toLocaleLowerCase()) {
                    setCurrentError('Фамилия должна начинаться с заглавной буквы');
                    break;
                }
                setVisited(false);
                setCurrentError('');
                break;

            case 'date':
                const validDate = /^\d{2}([./-])\d{2}\1\d{4}$/;
                setVisited(true);
                if (!validDate.test(event.target.value)) {
                    setCurrentError('Укажите дату в формате дд.мм.гггг');
                    break;
                }
                setVisited(false);
                setCurrentError('');
                break;

            case 'phone':
                const validPhoneNumber = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
                setVisited(true);
                if (!validPhoneNumber.test(event.target.value)) {
                    setCurrentError('Укажите корректный номер телефона');
                    break;
                }
                setVisited(false);
                setCurrentError('');
                break;

            case 'site':
                const validLink = /^((ftp|http|https):\/\/)(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;
                setVisited(true);
                if (!validLink.test(event.target.value)) {
                    setCurrentError('Укажите полную ссылку в формате "https://abc.com"');
                    break;
                }
                setVisited(false);
                setCurrentError('');
                break;
            default:
                setVisited(true);
                setCurrentError('');
        }
        
    }

    const changeValue = (event) => {
        setValue(event.target.value);
        setTimeout(() => {
            setValue(event.target.value.trim());
        }, 600)
    }

    return (
        <div className='elementsContainer'>
            <div className='elementsContainer__left'>
                <label className='elementsContainer__label'>{description}</label>
            </div>
            <div className='elementsContainer__right'>
                {(visited && error) && <div className='error error--input'>{currentError}</div>}
                <input 
                    className='elementsContainer__input'
                    description={description}
                    name={name}
                    type='text'   
                    value={value}
                    onBlur={(e) => validateInput(e)}
                    onChange={(e) => changeValue(e)}
                    ref={ref}
                    error={currentError}
                    > 
                </input>
            </div>
        </div>
    )

})

export default Input;