import React from 'react';

const TextArea = (props) => {

    const validateTextarea = (event) => {
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
        props.setVisited(false);
        props.setCurrentError('');
    }

    const checkCounter = (event) => {

        props.setCounter(() => {
            const length = event.target.value.length;
            let count = props.count;
            count -= length;
            if (count <= 0) {
                if (props.value.length < event.target.value.length) {
                    return props.counter;
                } else {
                    return count;
                }
                
            } else {
                props.setValue(event.target.value);
                setTimeout(() => {
                    props.setValue(event.target.value.trim());
                }, 600)
                return count;
            }
            
        });
    }

    return (
        <div className='elementsContainer'>
            <div className='elementsContainer__left elementsContainer__left--textarea'>
                <label className='elementsContainer__label'>{props.description}</label>
            </div>
            <div className='elementsContainer__right'>
                {(props.visited && props.error) && <div className='error error--textarea'>{props.currentError}</div>}
                <textarea 
                className='elementsContainer__textarea' 
                name={props.name}
                onChange={(event) => checkCounter(event)} 
                onBlur={(e) => validateTextarea(e)}
                value={props.value}
                description={props.description}
                error={props.currentError}
                >
                </textarea>
                <div className='elementsContainer__textarea-counter'>
                    Символов доступно: {props.counter}
                </div>
            </div>
        </div>
    )
}

export default TextArea;