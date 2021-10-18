import React, { forwardRef, useState } from 'react';

const TextArea = forwardRef((props, ref) => {
    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    const [counter, setCounter] = useState(props.counter);
    const [count, setCount] = useState(counter);
    const [visited, setVisited] = useState(props.visited);
    const [error, setError] = useState(props.error);
    const [currentError, setCurrentError] = useState(error);
    const [value, setValue] = useState('');

    const validateTextarea = (event) => {
        setValue(event.target.value.trim());
        if (event.target.value.length < 1) {
            setVisited(true);
            setCurrentError(error);
            return;
        }
        if (event.target.value == 0) {
            setVisited(true);
            setCurrentError('Значение не может быть пробелом');
            return;
        }
        setVisited(false);
        setCurrentError('');
    }

    const checkCounter = (event) => {
        setCount(() => {
            const length = event.target.value.length;
            let count = counter;
            count -= length;
            if (count <= 0) {
                if (value.length < event.target.value.length) {
                    return (event.target.value = value);
                } else {
                    return setCount(count);
                }
                
            } else {
                setValue(event.target.value);
                setTimeout(() => {
                    setValue(event.target.value.trim());
                }, 600)
                return setCount(count);
            }
            
        });
    }

    return (
        <div className='elementsContainer'>
            <div className='elementsContainer__left elementsContainer__left--textarea'>
                <label className='elementsContainer__label'>{description}</label>
            </div>
            <div className='elementsContainer__right'>
                {(visited && error) && <div className='error error--textarea'>{currentError}</div>}
                <textarea 
                className='elementsContainer__textarea' 
                name={name} 
                onChange={(event) => checkCounter(event)} 
                onBlur={(e) => validateTextarea(e)}
                value={value}
                description={description}
                ref={ref}
                error={currentError}
                >
                </textarea>
                <div className='elementsContainer__textarea-counter'>
                    Символов доступно: {count}
                </div>
            </div>
        </div>
    )
})

export default TextArea;