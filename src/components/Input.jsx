import React from 'react';

const Input = (props) => {

    const validateInput = (event) => {
        props.setValue(event.target.value.trim());
        props.setVisited(true);
        if (event.target.value.length < 1) {
            props.setCurrentError(props.error);
            return;
        }
        if (event.target.value == 0) {
            props.setCurrentError('Значение не может быть пробелом');
            return;
        }

        switch(String(event.target.name)) {

            case 'firstName':
                const validFirstName = /^[a-zA-Zа-яА-Я]+$/ui;
                props.setVisited(true);
                if (!validFirstName.test(String(event.target.value).toLocaleLowerCase())) {
                    props.setCurrentError('Имя должно состоять из букв без пробелов');
                    props.setVisited(true);
                    break;
                }
                if (event.target.value[0] === event.target.value[0].toLocaleLowerCase()) {
                    props.setCurrentError('Имя должно начинаться с заглавной буквы');
                    break;
                }
                props.setVisited(false);
                props.setCurrentError('');
                break;
                
            case 'lastName':
                const validLastName = /^[a-zA-Zа-яА-Я]+$/ui;
                props.setVisited(true);
                if (!validLastName.test(String(event.target.value).toLocaleLowerCase())) {
                    props.setCurrentError('Фамилия должна состоять из букв без пробелов');
                    break;
                }
                if (event.target.value[0] === event.target.value[0].toLocaleLowerCase()) {
                    props.setCurrentError('Фамилия должна начинаться с заглавной буквы');
                    break;
                }
                props.setVisited(false);
                props.setCurrentError('');
                break;

            case 'date':
                const validDate = /^\d{2}([./-])\d{2}\1\d{4}$/;
                props.setVisited(true);
                if (!validDate.test(event.target.value)) {
                    props.setCurrentError('Укажите дату в формате дд.мм.гггг');
                    break;
                }
                props.setVisited(false);
                props.setCurrentError('');
                break;

            case 'phone':
                const validPhoneNumber = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
                props.setVisited(true);
                if (!validPhoneNumber.test(event.target.value)) {
                    props.setCurrentError('Укажите корректный номер телефона');
                    break;
                }
                props.setVisited(false);
                props.setCurrentError('');
                break;

            case 'site':
                const validLink = /^((ftp|http|https):\/\/)(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;
                props.setVisited(true);
                if (!validLink.test(event.target.value)) {
                    props.setCurrentError('Укажите полную ссылку в формате "https://abc.com"');
                    break;
                }
                props.setVisited(false);
                props.setCurrentError('');
                break;
            default:
                props.setVisited(true);
                props.setCurrentError('');
        }
        
    }

    const changeValue = (event) => {
        props.setValue(event.target.value);
        setTimeout(() => {
            props.setValue(event.target.value.trim());
        }, 600)
    }

    return (
        <div className='elementsContainer'>
            <div className='elementsContainer__left'>
                <label className='elementsContainer__label'>{props.description}</label>
            </div>
            <div className='elementsContainer__right'>
                {(props.visited && props.error) && <div className='error error--input'>{props.currentError}</div>}
                <input 
                    className='elementsContainer__input'
                    description={props.description}
                    name={props.name}
                    type='text'   
                    value={props.value}
                    onBlur={(e) => validateInput(e)}
                    onChange={(e) => changeValue(e)}
                    error={props.currentError}
                    > 
                </input>
            </div>
        </div>
    )

}

export default Input;