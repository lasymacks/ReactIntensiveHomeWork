import React, { Reducer, ReducerState } from 'react';
import TodoItem from './components/TodoItem'
import './App.css';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Store } from 'redux';
import { useTypeSelector } from './hooks/useTypeSelector';
import { useRef } from 'react';
import { useEffect } from 'react';
import { addChosen, addCompleted, addFetchError, addFetchLoaded, addFetchTasks, addInput, addInWork, addTasks } from './store/reducers/todoReducer';

const App: React.FC = () => {

  const dispatch = useDispatch()
  const input = useTypeSelector(state => state.todo.input);
  const tasks = useTypeSelector(state => state.todo.tasks);
  const isLoaded = useTypeSelector(state => state.todo.isLoaded);
  const error = useTypeSelector(state => state.todo.error);
  const completed = useTypeSelector(state => state.todo.completed);
  const chosen = useTypeSelector(state => state.todo.chosen);
  const inWork = useTypeSelector(state => state.todo.inWork);
  

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
        .then(res => res.json())
        .then(
            (result) => {
                dispatch(addFetchLoaded(true));
                dispatch(addFetchTasks(result));
            },
            (error) => {
                dispatch(addFetchLoaded(true));
                dispatch(addFetchError(error.message));
            }
        )
  }, [])

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>):void => {
    const value = e.target.value;
    dispatch(addInput(value));
  }

  const inputBlur = (e: React.FocusEvent<HTMLInputElement>):void => {
    const value = e.target.value;
    dispatch(addInput(value.trim()));
  }

  const buttonHandler = (e: React.FormEvent<HTMLButtonElement>):void => {
    e.preventDefault();

    if (input.length > 160 || input.length < 1) {
      return;
    }
    const task = {
      id: Date.now(),
      name: input, 
      key: Date.now(), 
      completed: false,
      chosen: false,
      edit: false,
      date: (new Date(Date.now())).toString()
    }

    fetch(`http://localhost:3000/tasks`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    .then(
      (result) => {
        dispatch(addTasks([...tasks, task]));
      }, 
      (error) => { 
        dispatch(addFetchError(error.message));
      }
    )

    dispatch(addInput(''));
  }

  const chosenHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(addCompleted(false));
    dispatch(addInWork(false));

    chosen ?
    dispatch(addChosen(false)) :
    dispatch(addChosen(true)) ;
  }

  const completedHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(addChosen(false));
    dispatch(addInWork(false));

    completed ?
    dispatch(addCompleted(false)) :
    dispatch(addCompleted(true)) ;
  }

  const inWorkHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(addCompleted(false));
    dispatch(addChosen(false));

    inWork ?
    dispatch(addInWork(false)) :
    dispatch(addInWork(true)) ;
  }

  const createTodoItems = () =>  {
    if (chosen) {
      return tasks.map(task => {
        if (task.chosen && !task.completed) {
          return  <TodoItem key={task.key} id={task.id}></TodoItem>
        }
      })
    }
    if (completed) {
      return tasks.map(task => {
        if (task.completed) {
          return <TodoItem key={task.key} id={task.id}></TodoItem>
        }
      })
    }
    if (inWork) {
      return tasks.map(task => {
        if (!task.completed) {
          return <TodoItem key={task.key} id={task.id}></TodoItem>
        }
        
      })
    }
    return tasks.map(task => <TodoItem key={task.key} id={task.id}></TodoItem>)
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <body className="todo">
        <div className='todo-container'>
          <header className='todo-container__header'>
            <form className='todo-container__header__form'>
              <input className='input' placeholder='Описание дела' onBlur={(e) => inputBlur(e)} onChange={(e) => inputHandler(e)} value={input}></input>
              <button className='button' onClick={(e) => buttonHandler(e)}>Добавить дело</button>
              <div className='todo-container__header__form__filters'>
                <button 
                  className={chosen ? 'button button--filter button--delete' : 'button button--filter'}
                  onClick={(e) => chosenHandler(e)}
                  >Избранные</button>
                <button 
                  className={completed ? 'button button--filter button--delete' : 'button button--filter'}
                  onClick={(e) => completedHandler(e)}
                  >Выполненные</button>
                <button 
                  className={inWork ? 'button button--filter button--delete' : 'button button--filter'}
                  onClick={(e) => inWorkHandler(e)}
                  >В работе</button>
              </div>
              {input.length <= 160 ? 
              <div className='todo-container__header__form__count'>Символов доступно: {160 - input.length} </div> :
              <div className='todo-container__header__form__count todo-container__header__form__count--error'>Лимит превышен на: {-160 + input.length}</div>}
            </form>
          </header>
          <main className='todo-container__section'>
            <ul className='todo-container__list'>
              {createTodoItems()}
            </ul>
          </main>
        </div>
      </body>
    )
  }
  
}

export default App;
