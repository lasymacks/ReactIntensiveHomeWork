import React, { useEffect, useState } from 'react';
import Header from './Header';
import Input from './Input';
import TextArea from './Textarea';
import Button from './Button';


const Form = () => {

    let [complete, setComplete] = useState(false);

    const [firstNameValue, setFirstNameValue] = useState('');
    const [firstNameVisited, setFirstNameVisited] = useState(false);
    const [firstNameDescription, setFirstNameDescription] = useState('Имя');
    const [firstNameName, setFirstNameName] = useState('firstName');
    const [firstNameError, setFirstNameError] = useState('Поле не может быть пустым');
    const [firstNameCurrentError, setFirstNameCurrentError] = useState(firstNameError);

    const [lastNameValue, setLastNameValue] = useState('');
    const [lastNameVisited, setLastNameVisited] = useState(false);
    const [lastNameDescription, setLastNameDescription] = useState('Фамилия');
    const [lastNameName, setLastNameName] = useState('lastName');
    const [lastNameError, setLastNameError] = useState('Поле не может быть пустым');
    const [lastNameCurrentError, setLastNameCurrentError] = useState(lastNameError);
    
    const [dateValue, setDateValue] = useState('');
    const [dateVisited, setDateVisited] = useState(false);
    const [dateDescription, setDateDescription] = useState('Дата рождения');
    const [dateName, setDateName] = useState('date');
    const [dateError, setDateError] = useState('Поле не может быть пустым');
    const [dateCurrentError, setDateCurrentError] = useState(dateError);

    const [phoneValue, setPhoneValue] = useState('');
    const [phoneVisited, setPhoneVisited] = useState(false);
    const [phoneDescription, setPhoneDescription] = useState('Номер телефона');
    const [phoneName, setPhoneName] = useState('phone');
    const [phoneError, setPhoneError] = useState('Поле не может быть пустым');
    const [phoneCurrentError, setPhoneCurrentError] = useState(phoneError);

    const [siteValue, setSiteValue] = useState('');
    const [siteVisited, setSiteVisited] = useState(false);
    const [siteDescription, setSiteDescription] = useState('Ссылка на сайт');
    const [siteName, setSiteName] = useState('site');
    const [siteError, setSiteError] = useState('Поле не может быть пустым');
    const [siteCurrentError, setSiteCurrentError] = useState(siteError);

    const [aboutMeValue, setAboutMeValue] = useState('');
    const [aboutMeVisited, setAboutMeVisited] = useState(false);
    const [aboutMeCounter, setAboutMeCounter] = useState(600);
    const [aboutMeDescription, setAboutMeDescription] = useState('О себе');
    const [aboutMeName, setAboutMeName] = useState('aboutMe');
    const [aboutMeError, setAboutMeError] = useState('Поле не может быть пустым');
    const [aboutMeCurrentError, setAboutMeCurrentError] = useState(aboutMeError);

    const [technologiesValue, setTechnologiesValue] = useState('');
    const [technologiesVisited, setTechnologiesVisited] = useState(false);
    const [technologiesCounter, setTechnologiesCounter] = useState(600);
    const [technologiesDescription, setTechnologiesDescription] = useState('Стек технологий');
    const [technologiesName, setTechnologiesName] = useState('technologies');
    const [technologiesError, setTechnologiesError] = useState('Поле не может быть пустым');
    const [technologiesCurrentError, setTechnologiesCurrentError] = useState(technologiesError);

    const [projectValue, setProjectValue] = useState('');
    const [projectVisited, setProjectVisited] = useState(false);
    const [projectCounter, setProjectCounter] = useState(600);
    const [projectDescription, setProjectDescription] = useState('Опишите последний проект');
    const [projectName, setProjectName] = useState('project');
    const [projectError, setProjectError] = useState('Поле не может быть пустым');
    const [projectCurrentError, setProjectCurrentError] = useState(projectError);

    const cancel = () => {
        setFirstNameValue('');
        setLastNameValue('');
        setDateValue('');
        setPhoneValue('');
        setSiteValue('');
        setAboutMeValue('');
        setTechnologiesValue('');
        setProjectValue('');

        setFirstNameVisited(false);
        setLastNameVisited(false);
        setDateVisited(false);
        setPhoneVisited(false);
        setSiteVisited(false);
        setAboutMeVisited(false);
        setTechnologiesVisited(false);
        setProjectVisited(false);
    }

    const save = (e) => {
        e.preventDefault();
        const errors = [[firstNameCurrentError, firstNameDescription],
        [lastNameCurrentError, lastNameDescription],
        [dateCurrentError, dateDescription],
        [phoneCurrentError, phoneDescription],
        [siteCurrentError, siteDescription],
        [aboutMeCurrentError, aboutMeDescription],
        [technologiesCurrentError, technologiesDescription],
        [projectCurrentError, projectDescription]]

        let existingErrors = errors.reduce((acc, error) => {
            if (error[0] !== '') {
                acc.push(error[1]);
            } 
            return acc;
        }, []);

        return existingErrors.length > 0 ? alert(`В полях(поле): ${existingErrors.join(', ')} - имеются ошибки или поля не заполнены! Введите корректные данные чтобы продолжить.`) : setComplete(complete = true);
    }

    useEffect(() => console.log('render'));

    if (complete) {
        console.log('ok');
        return (
            <div className='showProfile container'>
                <Header 
                    className='header header--result'
                    text={lastNameValue + ' ' + firstNameValue}
                />
                <div className='elementsContainer elementsContainer--result'>
                    <div className='elementsContainer__left elementsContainer__left--result'>
                        {dateDescription}:
                    </div>
                    <div className='elementsContainer__right elementsContainer__right--result'>
                        {dateValue}
                    </div>
                </div>
                <div className='elementsContainer elementsContainer--result'>
                    <div className='elementsContainer__left elementsContainer__left--result'>
                        {phoneDescription}:
                    </div>
                    <div className='elementsContainer__right elementsContainer__right--result'>
                        {phoneValue}
                    </div>
                </div>
                <div className='elementsContainer elementsContainer--result'>
                    <div className='elementsContainer__left elementsContainer__left--result'>
                        {siteDescription}:
                    </div>
                    <div className='elementsContainer__right elementsContainer__right--result'>
                        {siteValue}
                    </div>
                </div>
                <div className='elementsContainer elementsContainer--result'>
                    <div className='elementsContainer__left elementsContainer__left--result'>
                        {aboutMeDescription}:
                    </div>
                    <div className='elementsContainer__right elementsContainer__right--result'>
                        {aboutMeValue}
                    </div>
                </div>
                <div className='elementsContainer elementsContainer--result'>
                    <div className='elementsContainer__left elementsContainer__left--result'>
                        {technologiesDescription}:
                    </div>
                    <div className='elementsContainer__right elementsContainer__right--result'>
                        {technologiesValue}
                    </div>
                </div>
                <div className='elementsContainer elementsContainer--result'>
                    <div className='elementsContainer__left elementsContainer__left--result'>
                        {projectDescription}:
                    </div>
                    <div className='elementsContainer__right elementsContainer__right--result'>
                        {projectValue}
                    </div>
                </div>
            </div>
            
        )
    } else {
        return (
            <form className='container'>
                <Header 
                    className='header'
                    text='Создание анкеты'
                />
                <Input 
                    value={firstNameValue}
                    setValue={setFirstNameValue}
                    visited={firstNameVisited}
                    setVisited={setFirstNameVisited}
                    currentError={firstNameCurrentError}
                    setCurrentError={setFirstNameCurrentError}
                    name={firstNameName}
                    description='Имя'
                    error='Поле не может быть пустым'
                />
                <Input 
                    value={lastNameValue}
                    setValue={setLastNameValue}
                    visited={lastNameVisited}
                    setVisited={setLastNameVisited}
                    currentError={lastNameCurrentError}
                    setCurrentError={setLastNameCurrentError}
                    name={lastNameName}
                    description='Фамилия'
                    error='Поле не может быть пустым'
                />
                <Input 
                    value={dateValue}
                    setValue={setDateValue}
                    visited={dateVisited}
                    setVisited={setDateVisited}
                    currentError={dateCurrentError}
                    setCurrentError={setDateCurrentError}
                    name={dateName}
                    description='Дата'
                    error='Поле не может быть пустым'
                />
                <Input 
                    value={phoneValue}
                    setValue={setPhoneValue}
                    visited={phoneVisited}
                    setVisited={setPhoneVisited}
                    currentError={phoneCurrentError}
                    setCurrentError={setPhoneCurrentError}
                    name={phoneName}
                    description='Номер телефона'
                    error='Поле не может быть пустым'
                />
                <Input 
                    value={siteValue}
                    setValue={setSiteValue}
                    visited={siteVisited}
                    setVisited={setSiteVisited}
                    currentError={siteCurrentError}
                    setCurrentError={setSiteCurrentError}
                    name={siteName}
                    description='Ссылка на сайт'
                    error='Поле не может быть пустым'
                />
                <TextArea 
                    value={aboutMeValue}
                    setValue={setAboutMeValue}
                    visited={aboutMeVisited}
                    setVisited={setAboutMeVisited}
                    currentError={aboutMeCurrentError}
                    setCurrentError={setAboutMeCurrentError}
                    count='600'
                    counter={aboutMeCounter}
                    setCounter={setAboutMeCounter}
                    name={aboutMeName}
                    description='О себе'
                    error='Поле не может быть пустым'
                />
                <TextArea 
                    value={technologiesValue}
                    setValue={setTechnologiesValue}
                    visited={technologiesVisited}
                    setVisited={setTechnologiesVisited}
                    currentError={technologiesCurrentError}
                    setCurrentError={setTechnologiesCurrentError}
                    count='600'
                    counter={technologiesCounter}
                    setCounter={setTechnologiesCounter}
                    name={technologiesName}
                    description='Стек технологий'
                    error='Поле не может быть пустым'
                />
                <TextArea 
                    value={projectValue}
                    setValue={setProjectValue}
                    visited={projectVisited}
                    setVisited={setProjectVisited}
                    currentError={projectCurrentError}
                    setCurrentError={setProjectCurrentError}
                    count='600'
                    counter={projectCounter}
                    setCounter={setProjectCounter}
                    name={projectName}
                    description='Опишите последний проект'
                    error='Поле не может быть пустым'
                />
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
            </form>
        )
    }
}

export default Form; 