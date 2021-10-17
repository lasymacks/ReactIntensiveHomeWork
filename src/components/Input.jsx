import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: props.description,
            name: props.name,
            handler: props.handler,
            ref: props.ref,
            visited: false,
            error: props.error,
            currentError: props.error,
            value: ''
        }
    }

    validateInput = (event) => {
        this.setState({value: event.target.value.trim()});
        this.setState({visited: true});
        if (event.target.value.length < 1) {
            this.setState({currentError: this.state.error});
            return;
        }
        if (event.target.value == 0) {
            this.setState({visited: true});
            this.setState({currentError: 'Значение не может быть пробелом'});
            return;
        }
        switch(String(event.target.name)) {

            case 'firstName':
                const validFirstName = /^[a-zA-Zа-яА-Я]+$/ui;
                this.setState({visited: true});
                if (!validFirstName.test(String(event.target.value).toLocaleLowerCase())) {
                    this.setState({currentError: 'Имя должно состоять из букв без пробелов'});
                    break;
                }
                if (event.target.value[0] === event.target.value[0].toLocaleLowerCase()) {
                    this.setState({currentError: 'Имя должно начинаться с заглавной буквы'});
                    break;
                }
                this.setState({visited: false});
                this.setState({currentError: ''});
                break;
                
            case 'lastName':
                const validLastName = /^[a-zA-Zа-яА-Я]+$/ui;
                this.setState({visited: true});
                if (!validLastName.test(String(event.target.value).toLocaleLowerCase())) {
                    this.setState({currentError: 'Фамилия должна состоять из букв без пробелов'});
                    break;
                }
                if (event.target.value[0] === event.target.value[0].toLocaleLowerCase()) {
                    this.setState({currentError: 'Фамилия должна начинаться с заглавной буквы'});
                    break;
                }
                this.setState({visited: false});
                this.setState({currentError: ''});
                break;

            case 'date':
                const validDate = /^\d{2}([./-])\d{2}\1\d{4}$/;
                this.setState({visited: true});
                if (!validDate.test(event.target.value)) {
                    this.setState({currentError: 'Укажите дату в формате дд.мм.гггг'}
                    );
                    break;
                }
                this.setState({visited: false});
                this.setState({currentError: ''});
                break;

            case 'phone':
                const validPhoneNumber = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
                this.setState({visited: true});
                if (!validPhoneNumber.test(event.target.value)) {
                    this.setState({currentError: 'Укажите корректный номер телефона'}
                    );
                    break;
                }
                this.setState({visited: false});
                this.setState({currentError: ''});
                break;

            case 'site':
                const validLink = /^((ftp|http|https):\/\/)(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;
                this.setState({visited: true});
                if (!validLink.test(event.target.value)) {
                    this.setState({currentError: 'Укажите полную ссылку в формате "https://abc.com"'}
                    );
                    break;
                }
                this.setState({visited: false});
                this.setState({currentError: ''});
                break;
            default:
                this.setState({visited: false});
                this.setState({currentError: ''});
        }
        
    }

    changeValue(event) {
        this.setState({value: event.target.value});
        setTimeout(() => {
            this.setState({value: event.target.value.trim()});
        }, 600)
    }

    render() {
        return (
            <div className='elementsContainer'>
                <div className='elementsContainer__left'>
                    <label className='elementsContainer__label'>{this.state.description}</label>
                </div>
                <div className='elementsContainer__right'>
                    {(this.state.visited && this.state.error) && <div className='error error--input'>{this.state.currentError}</div>}
                    <input 
                        className='elementsContainer__input'
                        name={this.state.name}
                        type='text'   
                        value={this.state.value}
                        onBlur={(e) => this.validateInput(e)}
                        onChange={(e) => this.changeValue(e)}
                        > 
                    </input>
                </div>
            </div>
        )
    }

}

export default Input;