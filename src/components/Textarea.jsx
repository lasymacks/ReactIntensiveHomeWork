import React from 'react';

class TextArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.name,
            description: props.description,
            counter: props.counter,
            count: props.counter,
            ref: props.ref,
            visited: false,
            error: props.error,
            currentError: props.error,
            value: ''
        }

    }

    validateTextarea = (event) => {
        this.setState({value: event.target.value.trim()});
        if (event.target.value.length < 1) {
            this.setState({visited: true});
            this.setState({currentError: this.state.error});
            return;
        }
        if (event.target.value == 0) {
            this.setState({visited: true});
            this.setState({currentError: 'Значение не может быть пробелом'});
            return;
        }
        this.setState({visited: false});
        this.setState({currentError: ''});
    }

    checkCounter = (event) => {
        this.setState((prevState) => {
            const length = event.target.value.length;
            let count = this.state.counter;
            count -= length;
            if (this.state.count <= 0) {
                if (prevState.value.length < event.target.value.length) {
                    return (event.target.value = prevState.value);
                } else {
                    return ({count: count});
                }
                
            } else {
                this.state.value = event.target.value;
                // this.setState({value: event.target.value})
                return ({count: count});
            }
            
        });
    }

    changeValue(event) {
        this.setState({value: event.target.value})
    }

    render() {
        return (
            <div className='elementsContainer'>
                <div className='elementsContainer__left elementsContainer__left--textarea'>
                    <label className='elementsContainer__label'>{this.state.description}</label>
                </div>
                <div className='elementsContainer__right'>
                    {(this.state.visited && this.state.error) && <div className='error error--textarea'>{this.state.currentError}</div>}
                    <textarea 
                    className='elementsContainer__textarea' 
                    name={this.state.name} 
                    onChange={(event) => this.checkCounter(event)} 
                    onBlur={(e) => this.validateTextarea(e)}
                    value={this.state.value}
                    >
                    </textarea>
                    <div className='elementsContainer__textarea-counter'>
                        Символов доступно: {this.state.count}
                    </div>
                </div>
            </div>
        )
    }
}

export default TextArea;