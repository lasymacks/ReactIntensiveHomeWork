import React from 'react';
import Header from './Header';
import Input from './Input';
import TextArea from './Textarea';
import Button from './Button';


class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            refs :{
                firstNameRef: React.createRef(),
                lastNameRef: React.createRef(),
                dateRef: React.createRef(),
                phoneRef: React.createRef(),
                siteRef: React.createRef(),
                aboutMeRef: React.createRef(),
                technologiesRef: React.createRef(),
                projectRef: React.createRef(),
            },
            error: 'Поле не может быть пустым',
            complete: false
        }
    }

    cancel(e) {
        e.preventDefault();
        const values = Object.values(this.state.refs);
        for (let i = 0; i < values.length; i++) {
            this.setState(() => values[i].current.state.value = '');
            this.setState(() => values[i].current.state.visited = false);
        }
    }

    save(e) {
        const values = Object.values(this.state.refs);
        let invalidFields = [];
        for (let i = 0; i < values.length; i++) {
            if (values[i].current.state.currentError !== '') {
                e.preventDefault();
                invalidFields.push(values[i].current.state.description);
            }
        }
        if (invalidFields.length > 0) {
            alert(`В полях(поле): "${invalidFields.join(', ')}" ошибки или нет данных! Введите корректные данные чтобы продолжить.`);
            return;
        }
        e.preventDefault();
        this.showProfile();
    }

    showProfile() {
        this.setState({complete: true})
    }

    render() {
        if (this.state.complete) {
            return (
                <div className='showProfile container'>
                    <Header 
                        text='Данные анкеты'
                    />
                    <div className='elementsContainer elementsContainer--result'>
                        <div className='elementsContainer__left elementsContainer__left--result'>
                            {this.state.refs.firstNameRef.current.state.description}:
                        </div>
                        <div className='elementsContainer__right elementsContainer__right--result'>
                            {this.state.refs.firstNameRef.current.state.value}
                        </div>
                    </div>
                    <div className='elementsContainer elementsContainer--result'>
                        <div className='elementsContainer__left elementsContainer__left--result'>
                            {this.state.refs.lastNameRef.current.state.description}:
                        </div>
                        <div className='elementsContainer__right elementsContainer__right--result'>
                            {this.state.refs.lastNameRef.current.state.value}
                        </div>
                    </div>
                    <div className='elementsContainer elementsContainer--result'>
                        <div className='elementsContainer__left elementsContainer__left--result'>
                            {this.state.refs.dateRef.current.state.description}:
                        </div>
                        <div className='elementsContainer__right elementsContainer__right--result'>
                            {this.state.refs.dateRef.current.state.value}
                        </div>
                    </div>
                    <div className='elementsContainer elementsContainer--result'>
                        <div className='elementsContainer__left elementsContainer__left--result'>
                            {this.state.refs.phoneRef.current.state.description}:
                        </div>
                        <div className='elementsContainer__right elementsContainer__right--result'>
                            {this.state.refs.phoneRef.current.state.value}
                        </div>
                    </div>
                    <div className='elementsContainer elementsContainer--result'>
                        <div className='elementsContainer__left elementsContainer__left--result'>
                            {this.state.refs.siteRef.current.state.description}:
                        </div>
                        <div className='elementsContainer__right elementsContainer__right--result'>
                            {this.state.refs.siteRef.current.state.value}
                        </div>
                    </div>
                    <div className='elementsContainer elementsContainer--result'>
                        <div className='elementsContainer__left elementsContainer__left--result'>
                            {this.state.refs.aboutMeRef.current.state.description}:
                        </div>
                        <div className='elementsContainer__right elementsContainer__right--result'>
                            {this.state.refs.aboutMeRef.current.state.value}
                        </div>
                    </div>
                    <div className='elementsContainer elementsContainer--result'>
                        <div className='elementsContainer__left elementsContainer__left--result'>
                            {this.state.refs.technologiesRef.current.state.description}:
                        </div>
                        <div className='elementsContainer__right elementsContainer__right--result'>
                            {this.state.refs.technologiesRef.current.state.value}
                        </div>
                    </div>
                    <div className='elementsContainer elementsContainer--result'>
                        <div className='elementsContainer__left elementsContainer__left--result'>
                            {this.state.refs.projectRef.current.state.description}:
                        </div>
                        <div className='elementsContainer__right elementsContainer__right--result'>
                            {this.state.refs.projectRef.current.state.value}
                        </div>
                    </div>
                </div>
                
            )
        } else {
            return (
                <form className='container'>
                    <Header 
                        text='Создание анкеты'
                    />
                    <Input 
                        visited={this.state.firstNameVisited}
                        name='firstName'
                        description='Имя'
                        error={this.state.error}
                        ref={this.state.refs.firstNameRef}
                    />
                    <Input 
                        visited={this.state.lastNameVisited}
                        name='lastName'
                        description='Фамилия'
                        error={this.state.error}
                        ref={this.state.refs.lastNameRef}
                    />
                    <Input 
                        visited={this.state.dateVisited}
                        name='date'
                        description='Дата рождения'
                        error={this.state.error}
                        ref={this.state.refs.dateRef}
                    />
                    <Input 
                        visited={this.state.phoneVisited}
                        name='phone'
                        description='Номер телефона'
                        error={this.state.error}
                        ref={this.state.refs.phoneRef}
                    />
                    <Input 
                        visited={this.state.siteVisited}
                        name='site'
                        description='Ссылка на сайт'
                        error={this.state.error}
                        ref={this.state.refs.siteRef}
                    />
                    <TextArea 
                        name='aboutMe'
                        description='О себе'
                        counter='600'
                        error={this.state.error}
                        ref={this.state.refs.aboutMeRef}
                    />
                    <TextArea 
                        name='technologies'
                        description='Стек технологий'
                        counter='600'
                        error={this.state.error}
                        ref={this.state.refs.technologiesRef}
                    />
                    <TextArea 
                        name='project'
                        description='Опишите последний проект'
                        counter='600'
                        error={this.state.error}
                        ref={this.state.refs.projectRef}
                    />
                    <div className='elementsContainer elementsContainer__withButtons'>
                        <Button 
                        name='cancel'
                        description='Отмена'
                        handler={(e) => this.cancel(e)}
                        type='button'
                        />
                        <Button 
                        name='save'
                        description='Сохранить'
                        handler={(e) => this.save(e)}
                        type='submit'
                        />
                    </div>
                    {this.showProfile}
                </form>
            )
        }
    }
}

export default Form; 