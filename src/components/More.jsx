import React, {useState, useEffect} from 'react';
import Form from './Form';

const More = (props) => {

    const [thisId, setThisId] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState({});
    const [count, setConunt] = useState(0);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/goods")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(() => true);
                    setThisId(() => props.thisId);
                    setItems(() => result.reduce((acc, current) => {
                        if (current.id === Number(thisId)) {
                            Object.assign(acc, current);
                        }
                        return acc;
                    }, {}))
                },
                (error) => {
                    setIsLoaded(() => true);
                    setError(() => error);
                }
            )
    }, [thisId])

    const increment = () => {
        if (count < Number(items.inStock)) {
            setConunt((prev) => prev += 1);
        }
    }

    const decrement = () => {
        if (count > 0) {
            setConunt((prev) => prev -= 1);
        }
    }

    const buttonBascetCreater = () => {
        if (props.role === 'visitor') {
            return (
                <div className='description description-role'>
                    Авторизуйтесь, чтобы добавить в корзину
                </div>
            )
        } else {
            return (
                items.inStock > 0 ? 
                    <button className='button button--more' id={items.id} onClick={(e) => bascetHandler(e)}>В корзину</button> :
                    <div className='description notAvailable'>Нет в наличии!</div>
            )
        }
    }

    const bascetHandler = (event) => {
        if (items.inStock <= 0) {
            setItems((prev) => prev);
        } else {
            const newItems = Object.assign(items, items.inStock = (
                count > 0 ? 
                (Number(items.inStock) - count) 
                : 
                (Number(items.inStock) - 1))
            );

            setItems(() => newItems);
            
            const newBascet = (count > 0 ? props.bascet.bascet += count : props.bascet.bascet += 1);
            const newSum = (count > 0 ? props.bascet.sum += (Number(newItems.price) * count) : props.bascet.sum += Number(newItems.price));
            const newBascetValue = props.bascet;

            newBascetValue.bascet = newBascet;
            newBascetValue.sum = newSum;
            props.bascetListener({...props.bascet, newBascetValue})

            fetch(`http://localhost:3000/goods/${event.target.id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newItems)
            });

            setConunt(() => 0);

            fetch(`http://localhost:3000/bascet`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newBascetValue)
            });
        }
    }

    const cardBodyCreater = () => {
        if (edit) {
            return (
                <Form items={items} id={thisId} editSetter={setEdit} itemsSetter={setItems}/>
            )
        } else {
            return (
                <div className='cardContainer__right cardContainer__right--more'>
                    <h3 className='header header--more'>{items.name}</h3>
                    <div className='description description--more'>{items.description}</div>
                    <div className='description description--more'>В наличии - {items.inStock ? items.inStock : 0} кг</div>
                    <div className='price price--more'>{items.price}р / кг</div>
                    <div className='cardContainer__right__buttonsCont'>
                        <div className='counter-container'>
                            <button className='button button--counter' onClick={decrement}>-</button>
                            <span className='count'>{count}</span>
                            <button className='button button--counter'  onClick={increment}>+</button>
                        </div>
                        {buttonBascetCreater()}
                    </div>
                </div>
            )
        }
    }

    const editHandler = () => {
        setEdit(() => true);
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div className='container'>
                <div className='cardContainer cardContainer--more'>
                    {props.role === 'admin' && <button className='button button--edit' onClick={editHandler}>Редактировать</button>}
                    <div className='cardContainer__left cardContainer__left--more'>
                        <img className='img img--more' src={items.image}></img>
                    </div>
                    {cardBodyCreater()}
                </div>
            </div>
        )
    }
}

export default More;