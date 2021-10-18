import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Input from './Input';
import TextArea from './Textarea';
import Button from './Button';


const Form = () => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const dateRef = useRef();
    const phoneRef = useRef();
    const siteRef = useRef();
    const aboutMeRef = useRef();
    const technologiesRef = useRef();
    const projectRef = useRef();
    const refs = [firstNameRef, lastNameRef, dateRef, phoneRef, siteRef, aboutMeRef, technologiesRef, projectRef];

    let [complete, setComplete] = useState(false);

    let elementAttributes = [
        {description: 'Имя', name: 'firstName', ref: firstNameRef, error: 'Поле не может быть пустым'},
        {description: 'Фамилия', name: 'lastName', ref: lastNameRef, error: 'Поле не может быть пустым'},
        {description: 'Дата рождения', name: 'date', ref: dateRef, error: 'Поле не может быть пустым'},
        {description: 'Номер телефона', name: 'phone', ref: phoneRef, error: 'Поле не может быть пустым'},
        {description: 'Ссылка на сайт', name: 'site', ref: siteRef, error: 'Поле не может быть пустым'},
        {description: 'О себе', name: 'aboutMe', ref: aboutMeRef, error: 'Поле не может быть пустым'},
        {description: 'Стек технологий', name: 'technologies', ref: technologiesRef, error: 'Поле не может быть пустым'},
        {description: 'Опишите последний проект', name: 'project', ref: projectRef, error: 'Поле не может быть пустым'}
    ];

    const Input = (props) => {
    
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
                        ref={props.ref}
                        error={currentError}
                        > 
                    </input>
                </div>
            </div>
        )
    
    }

    const fillElements = () => {
        let arr = [];
        for (let i = 0; i < elementAttributes.length; i++) {
            if (i > 4) {
                arr.push(<TextArea 
                    name={elementAttributes[i].name}
                    description={elementAttributes[i].description}
                    counter='600'
                    error={elementAttributes[i].error}
                    ref={elementAttributes[i].ref}
                />)
            } else {
                arr.push(<Input 
                    name={elementAttributes[i].name}
                    description={elementAttributes[i].description}
                    error={elementAttributes[i].error}
                    ref={elementAttributes[i].ref}
                />)
            }
        }
        return (arr);
    }

    const cancel = () => {
        for (let i = 0; i < refs.length; i++) {
            refs[i].current.value = '';
        }
    }

    const save = (e) => {
        e.preventDefault();
    }

    const showProfile = () => {
        setComplete(complete = true);
    }

    if ({complete} === true) {
        // return (
            // <div className='showProfile container'>
            //     <Header 
            //         text='Данные анкеты'
            //     />
            //     <div className='elementsContainer elementsContainer--result'>
            //         <div className='elementsContainer__left elementsContainer__left--result'>
            //             {firstNameRef.current.state.description}:
            //         </div>
            //         <div className='elementsContainer__right elementsContainer__right--result'>
            //             {firstNameRef.current.state.value}
            //         </div>
            //     </div>
            //     <div className='elementsContainer elementsContainer--result'>
            //         <div className='elementsContainer__left elementsContainer__left--result'>
            //             {lastNameRef.current.state.description}:
            //         </div>
            //         <div className='elementsContainer__right elementsContainer__right--result'>
            //             {lastNameRef.current.state.value}
            //         </div>
            //     </div>
            //     <div className='elementsContainer elementsContainer--result'>
            //         <div className='elementsContainer__left elementsContainer__left--result'>
            //             {dateRef.current.state.description}:
            //         </div>
            //         <div className='elementsContainer__right elementsContainer__right--result'>
            //             {dateRef.current.state.value}
            //         </div>
            //     </div>
            //     <div className='elementsContainer elementsContainer--result'>
            //         <div className='elementsContainer__left elementsContainer__left--result'>
            //             {phoneRef.current.state.description}:
            //         </div>
            //         <div className='elementsContainer__right elementsContainer__right--result'>
            //             {phoneRef.current.state.value}
            //         </div>
            //     </div>
            //     <div className='elementsContainer elementsContainer--result'>
            //         <div className='elementsContainer__left elementsContainer__left--result'>
            //             {siteRef.current.state.description}:
            //         </div>
            //         <div className='elementsContainer__right elementsContainer__right--result'>
            //             {siteRef.current.state.value}
            //         </div>
            //     </div>
            //     <div className='elementsContainer elementsContainer--result'>
            //         <div className='elementsContainer__left elementsContainer__left--result'>
            //             {aboutMeRef.current.state.description}:
            //         </div>
            //         <div className='elementsContainer__right elementsContainer__right--result'>
            //             {aboutMeRef.current.state.value}
            //         </div>
            //     </div>
            //     <div className='elementsContainer elementsContainer--result'>
            //         <div className='elementsContainer__left elementsContainer__left--result'>
            //             {technologiesRef.current.state.description}:
            //         </div>
            //         <div className='elementsContainer__right elementsContainer__right--result'>
            //             {technologiesRef.current.state.value}
            //         </div>
            //     </div>
            //     <div className='elementsContainer elementsContainer--result'>
            //         <div className='elementsContainer__left elementsContainer__left--result'>
            //             {projectRef.current.state.description}:
            //         </div>
            //         <div className='elementsContainer__right elementsContainer__right--result'>
            //             {projectRef.current.state.value}
            //         </div>
            //     </div>
            // </div>
            
        // )
    } else {
        return (
            <form className='container'>
                <Header 
                    text='Создание анкеты'
                />
                {fillElements()}
                <div className='elementsContainer elementsContainer__withButtons'>
                    <Button 
                    name='cancel'
                    description='Отмена'
                    handler={(e) => cancel(e)}
                    type='button'
                    />
                    <Button 
                    name='save'
                    description='Сохранить'
                    handler={(e) => save(e)}
                    type='submit'
                    />
                </div>
                {showProfile}
            </form>
        )
    }
}




// class Form extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             refs :{
//                 firstNameRef: React.createRef(),
//                 lastNameRef: React.createRef(),
//                 dateRef: React.createRef(),
//                 phoneRef: React.createRef(),
//                 siteRef: React.createRef(),
//                 aboutMeRef: React.createRef(),
//                 technologiesRef: React.createRef(),
//                 projectRef: React.createRef(),
//             },
//             error: 'Поле не может быть пустым',
//             complete: false
//         }
//     }

//     cancel(e) {
//         e.preventDefault();
//         const values = Object.values(this.state.refs);
//         for (let i = 0; i < values.length; i++) {
//             this.setState(() => values[i].current.state.value = '');
//             this.setState(() => values[i].current.state.visited = false);
//         }
//     }

//     save(e) {
//         const values = Object.values(this.state.refs);
//         let invalidFields = [];
//         for (let i = 0; i < values.length; i++) {
//             if (values[i].current.state.currentError !== '') {
//                 e.preventDefault();
//                 invalidFields.push(values[i].current.state.description);
//             }
//         }
//         if (invalidFields.length > 0) {
//             alert(`В полях(поле): "${invalidFields.join(', ')}" ошибки или нет данных! Введите корректные данные чтобы продолжить.`);
//             return;
//         }
//         e.preventDefault();
//         this.showProfile();
//     }

//     showProfile() {
//         this.setState({complete: true})
//     }

//     render() {
//         if (this.state.complete) {
//             return (
//                 <div className='showProfile container'>
//                     <Header 
//                         text='Данные анкеты'
//                     />
//                     <div className='elementsContainer elementsContainer--result'>
//                         <div className='elementsContainer__left elementsContainer__left--result'>
//                             {this.state.refs.firstNameRef.current.state.description}:
//                         </div>
//                         <div className='elementsContainer__right elementsContainer__right--result'>
//                             {this.state.refs.firstNameRef.current.state.value}
//                         </div>
//                     </div>
//                     <div className='elementsContainer elementsContainer--result'>
//                         <div className='elementsContainer__left elementsContainer__left--result'>
//                             {this.state.refs.lastNameRef.current.state.description}:
//                         </div>
//                         <div className='elementsContainer__right elementsContainer__right--result'>
//                             {this.state.refs.lastNameRef.current.state.value}
//                         </div>
//                     </div>
//                     <div className='elementsContainer elementsContainer--result'>
//                         <div className='elementsContainer__left elementsContainer__left--result'>
//                             {this.state.refs.dateRef.current.state.description}:
//                         </div>
//                         <div className='elementsContainer__right elementsContainer__right--result'>
//                             {this.state.refs.dateRef.current.state.value}
//                         </div>
//                     </div>
//                     <div className='elementsContainer elementsContainer--result'>
//                         <div className='elementsContainer__left elementsContainer__left--result'>
//                             {this.state.refs.phoneRef.current.state.description}:
//                         </div>
//                         <div className='elementsContainer__right elementsContainer__right--result'>
//                             {this.state.refs.phoneRef.current.state.value}
//                         </div>
//                     </div>
//                     <div className='elementsContainer elementsContainer--result'>
//                         <div className='elementsContainer__left elementsContainer__left--result'>
//                             {this.state.refs.siteRef.current.state.description}:
//                         </div>
//                         <div className='elementsContainer__right elementsContainer__right--result'>
//                             {this.state.refs.siteRef.current.state.value}
//                         </div>
//                     </div>
//                     <div className='elementsContainer elementsContainer--result'>
//                         <div className='elementsContainer__left elementsContainer__left--result'>
//                             {this.state.refs.aboutMeRef.current.state.description}:
//                         </div>
//                         <div className='elementsContainer__right elementsContainer__right--result'>
//                             {this.state.refs.aboutMeRef.current.state.value}
//                         </div>
//                     </div>
//                     <div className='elementsContainer elementsContainer--result'>
//                         <div className='elementsContainer__left elementsContainer__left--result'>
//                             {this.state.refs.technologiesRef.current.state.description}:
//                         </div>
//                         <div className='elementsContainer__right elementsContainer__right--result'>
//                             {this.state.refs.technologiesRef.current.state.value}
//                         </div>
//                     </div>
//                     <div className='elementsContainer elementsContainer--result'>
//                         <div className='elementsContainer__left elementsContainer__left--result'>
//                             {this.state.refs.projectRef.current.state.description}:
//                         </div>
//                         <div className='elementsContainer__right elementsContainer__right--result'>
//                             {this.state.refs.projectRef.current.state.value}
//                         </div>
//                     </div>
//                 </div>
                
//             )
//         } else {
//             return (
//                 <form className='container'>
//                     <Header 
//                         text='Создание анкеты'
//                     />
//                     <Input 
//                         ited}
//                         name='firstName'
//                         description='Имя'
//                         error={this.state.error}
//                         ref={this.state.refs.firstNameRef}
//                     />
//                     <Input 
//                         ted}
//                         name='lastName'
//                         description='Фамилия'
//                         error={this.state.error}
//                         ref={this.state.refs.lastNameRef}
//                     />
//                     <Input 
                        
//                         name='date'
//                         description='Дата рождения'
//                         error={this.state.error}
//                         ref={this.state.refs.dateRef}
//                     />
//                     <Input 
//                         }
//                         name='phone'
//                         description='Номер телефона'
//                         error={this.state.error}
//                         ref={this.state.refs.phoneRef}
//                     />
//                     <Input 
                        
//                         name='site'
//                         description='Ссылка на сайт'
//                         error={this.state.error}
//                         ref={this.state.refs.siteRef}
//                     />
//                     <TextArea 
//                         name='aboutMe'
//                         description='О себе'
//                         counter='600'
//                         error={this.state.error}
//                         ref={this.state.refs.aboutMeRef}
//                     />
//                     <TextArea 
//                         name='technologies'
//                         description='Стек технологий'
//                         counter='600'
//                         error={this.state.error}
//                         ref={this.state.refs.technologiesRef}
//                     />
//                     <TextArea 
//                         name='project'
//                         description='Опишите последний проект'
//                         counter='600'
//                         error={this.state.error}
//                         ref={this.state.refs.projectRef}
//                     />
//                     <div className='elementsContainer elementsContainer__withButtons'>
//                         <Button 
//                         name='cancel'
//                         description='Отмена'
//                         handler={(e) => this.cancel(e)}
//                         type='button'
//                         />
//                         <Button 
//                         name='save'
//                         description='Сохранить'
//                         handler={(e) => this.save(e)}
//                         type='submit'
//                         />
//                     </div>
//                     {this.showProfile}
//                 </form>
//             )
//         }
//     }
// }

export default Form; 