import React from 'react';

const FormErrors = (props) => {
    return (
        <div className='modale-container__error'>Login valid: {String(props.errors)}</div>
    )
}

export default FormErrors;
