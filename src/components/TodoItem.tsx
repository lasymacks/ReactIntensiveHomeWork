import React, { MouseEvent, useEffect, useState } from 'react';
import PopupMenu from './PopupMenu';
import { Store } from 'redux';
import { useTypeSelector } from '../hooks/useTypeSelector'
import { useDispatch } from 'react-redux';
import { ITaskType, TodoActionTypes } from '../types/todo';
import PopupItem from './PopupMenu';
import { useMemo } from 'react';
import ReactDOM from 'react-dom';

interface ITodoItemProps {
    id: number
}

const TodoItem = (props: ITodoItemProps) => {
    
    const dispatch = useDispatch();
    const tasks = useTypeSelector(state => state.todo.tasks);
    
    const [isOpen, setIsOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [remove, setRemove] = useState(false);

    const filteredTask: ITaskType = tasks.reduce((acc, task) => {
        if (task.id == props.id) {
            acc = Object.assign({}, task);
        }
        return acc;
    })

    const openHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        isOpen? setIsOpen(() => false) : setIsOpen(() => true);
    }

    const chosenHandler = () => {
        filteredTask.chosen ?
        filteredTask.chosen = false :
        filteredTask.chosen = true ;

        const items = tasks.map((item) => {
            if (item.key == filteredTask.key) {
                return filteredTask;
            }
            return item;
        });

        fetch(`http://localhost:3000/tasks/${filteredTask.id}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(filteredTask)
        })
        .then(res => res.json())
        .then(
            (result) => dispatch({type: TodoActionTypes.SET_TASKS, payload: items}),
            (error) => console.log('error', error.message)
        )
    }

    const completedHandler = () => {
        filteredTask.completed ?
        filteredTask.completed = false :
        filteredTask.completed = true ;

        const items = tasks.map((item) => {
            if (item.key == filteredTask.key) {
                return filteredTask;
            }
            return item;
        });

        fetch(`http://localhost:3000/tasks/${filteredTask.id}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(filteredTask)
        })
        .then(res => res.json())
        .then(
            (result) => dispatch({type: TodoActionTypes.SET_TASKS, payload: items}),
            (error) => console.log('error', error.message)
        )
    }

    const editHandler = () => {
        edit ?
        setEdit(() => false) :
        setEdit(() => true) ;
    }

    const textareaBlur = (e: any) => {
        e.target.value.trim();
        console.log(e.target.value);
        
    }

    const editCompleteHandler = (e: any) => {
        if (e.key === "Enter") {
            if (e.target.value.trim().length < 1 || e.target.value.trim().length > 160) {
                return;
            }
            const items = tasks.map((item) => {
                if (item.key == filteredTask.key) {
                    filteredTask.name = e.target.value.trim()
                    return filteredTask;
                }
                return item;
            });

            fetch(`http://localhost:3000/tasks/${filteredTask.id}`, {
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(filteredTask)
            })
            .then(res => res.json())
            .then(
                (result) => dispatch({type: TodoActionTypes.SET_TASKS, payload: items}),
                (error) => console.log('error', error.message)
            )
            setEdit(() => false);
        }
    }

    const deleteHandler = () => {
        setRemove(() => true);  
    }

    const closeDelete = () => {
        setRemove(() => false);
    }

    const removeHandler = () => {
        const items = tasks.filter((item) => {
            if (item.key != filteredTask.key) {
                return filteredTask;
            }
        });

        fetch(`http://localhost:3000/tasks/${filteredTask.id}`, {method: 'DELETE'})
        .then(res => res.json())
        .then(
            (result) => dispatch({type: TodoActionTypes.SET_TASKS, payload: items}),
            (error) => console.log('error', error.message)
        )
        setRemove(() => false);
    }

    return (
        <div 
            className={filteredTask.completed ? 'container container--completed' : 'container'} 
        >
            {filteredTask.chosen &&
                <button
                    className='chosen-button'
                    onBlur={(e) => textareaBlur(e)}
                    onClick={chosenHandler}
                    >
                        <img className='chosen' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR64TnOs1Zy6f5bB7yli2qnBtgNKwXb_k878DYdVVEgjjPGwV_B43IHhREiABFmyZPRF94&usqp=CAU'></img>
                </button>}
            
            <li className='todo-item' id={String(filteredTask.id)} key={filteredTask.key}>
                {edit ? 
                    <textarea 
                        className='textarea'
                        autoFocus 
                        onKeyPress={(e) => editCompleteHandler(e)}
                        >
                            {filteredTask.name}
                    </textarea> :
                    <div className='todo-item__text'>{filteredTask.name}</div>
                    }
                <button 
                    className='button button--task' 
                    key={filteredTask.key} 
                    id={String(filteredTask.id)}
                    onClick={(e) => openHandler(e)}>Меню
                </button>
                
            </li>
            {/* <div id='modal'></div> 
            Это root для портала(если ты не был в PopupMenu.tsx, то там вопрос от меня. Спасибо!) */}
            {<PopupItem id={filteredTask.id} isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className='popup-container'>
                    <button className='button button--popup' onClick={chosenHandler}>В избранное / Убрать из избранного</button>
                    <button className='button button--popup' onClick={completedHandler}>Выполнено / Вернуть в работу</button>
                    <button className='button button--popup' onClick={editHandler}>Редактировать</button>
                    <button className='button button--delete' onClick={deleteHandler}>Удалить</button>
                </div>
            </PopupItem>}
            {remove ? 
                <div className='modal' onClick={closeDelete}>
                    <div className='modal-delete'>
                        <h4 className='modal-delete__header'>Вы действительно хотите удалить задачу?</h4>
                        <p className='modal-delete__task'>
                            <span className='modal-delete__description'>Название задачи: </span> 
                            {filteredTask.name}
                        </p>
                        <div className='modal-delete__time'> 
                            <span className='modal-delete__description'>Время создания: </span>
                            {filteredTask.date}
                        </div>
                        <div className='modal-delete__buttons'>
                            <button className='button button--modale' onClick={closeDelete}>Отмена</button>
                            <button className='button button--delete' onClick={removeHandler}>Удалить</button>
                        </div>
                    </div>
                </div> :
                null}
        </div>
    )
}

export default TodoItem;

