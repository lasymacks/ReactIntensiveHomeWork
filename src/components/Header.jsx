import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.text
        }
    }

    render() {
        return (
            <h1 className='header'>{this.state.text}</h1>
        )
    }
}

export default Header;