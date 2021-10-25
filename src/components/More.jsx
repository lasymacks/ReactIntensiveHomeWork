import React, {useState, useEffect} from 'react';

const More = (props) => {

    const [thisId, setThisId] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState({});
    const [count, setConunt] = useState(0);

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
            console.log(items);
            const newBascet = (count > 0 ? props.bascet.bascet += count : props.bascet.bascet += 1);
            const newSum = (count > 0 ? props.bascet.sum += (Number(newItems.price) * count) : props.bascet.sum += Number(newItems.price));

            props.bascetListener(() => Object.assign(props.bascet, {bascet: newBascet}, {sum: newSum}));

            fetch(`http://localhost:3000/goods/${event.target.id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newItems)
            });
            setConunt(() => 0);

            const newBascetValue = Object.assign(props.bascet, {bascet: newBascet}, {sum: newSum});
            console.log(newBascetValue);
            fetch(`http://localhost:3000/bascet`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newBascetValue)
            });
        }
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div className='container'>
                <div className='cardContainer cardContainer--more'>
                    <div className='cardContainer__left cardContainer__left--more'>
                        <img className='img img--more' src={items.image}></img>
                    </div>
                    <div className='cardContainer__right cardContainer__right--more'>
                        <h3 className='header header--more'>{items.name}</h3>
                        <div className='description description--more'>{items.description}</div>
                        <div className='description description--more'>В наличии - {items.inStock ? items.inStock : 0} кг</div>
                        <div className='price price--more'>{items.price}р /кг</div>
                        <div className='cardContainer__right__buttonsCont'>
                            <div className='counter-container'>
                                <button className='button button--counter' onClick={decrement}>-</button>
                                <span className='count'>{count}</span>
                                <button className='button button--counter'  onClick={increment}>+</button>
                            </div>
                            {items.inStock > 0 ? 
                                <button className='button button--more' id={items.id} onClick={(e) => bascetHandler(e)}>В корзину</button> :
                                <div className='description notAvailable'>Нет в наличии!</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default More;