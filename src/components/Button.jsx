import React from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.name,
            description: props.description,
            handler: props.handler,
            type: props.type
        }
    }

    render() {
        return (
            <button className='button' type='submit' name={this.state.name} onClick={(e) => this.state.handler(e)}>{this.state.description}</button>
        )
    }
}

export default Button;