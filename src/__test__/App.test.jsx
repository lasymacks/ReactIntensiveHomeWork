import App from "../App";
import {mountWithWrapper} from "../setupTests";
import React from "react";

describe('App', () => {
    let wrapper;
    const onClick = jest.fn();
    const onBlur = jest.fn();
    const onChange = jest.fn();
    const props = {
        isLoaded: true
    }

    beforeEach(() => {
        wrapper = mount(mountWithWrapper(<App {...props} />));
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('component should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('component should have input field', () => {
        expect(wrapper.find('input')).toHaveLength(1)
    })

    it('component should have 1 submit and 3 filter buttons', () => {
        expect(wrapper.find('button')).toHaveLength(4)
    })

    it('component should correctly add value in input', () => {
        const input = shallow(<input data-test-id='input' className='input' placeholder='Описание дела' onBlur={onBlur} onChange={onChange} value=''></input>);
        input.find('[data-test-id="input"]').simulate('change', { target: { value: 'Hello' } });
        expect(onChange.mock.calls.length).toEqual(1);
    })

    it('component should call a function onBlur with we lose focus', () => {
        const input = shallow(<input data-test-id='input' className='input' placeholder='Описание дела' onBlur={onBlur} onChange={onChange} value=''></input>);
        input.find('[data-test-id="input"]').simulate('blur');
        expect(onBlur.mock.calls.length).toEqual(1);
    })

    it('component should call a function onClick when we add new task', () => {
        const button = shallow(<button data-test-id='submit-button' className='button' onClick={onClick}>Добавить дело</button>);
        button.find('[data-test-id="submit-button"]').simulate('click');
        expect(onClick.mock.calls.length).toEqual(1)
    })

    it('component should call a function onClick when on filter - "chosen"', () => {
        const chosen = true;
        const button = shallow(<button data-test-id='chosen-button' className={chosen ? 'button button--filter button--delete' : 'button button--filter'} onClick={onClick}>Избранные</button>);
        button.find('[data-test-id="chosen-button"]').simulate('click');
        expect(onClick.mock.calls.length).toEqual(1)
    })

    it('component should call a function onClick when on filter - "completed"', () => {
        const completed = true;
        const button = shallow(<button data-test-id='completed-button' className={completed ? 'button button--filter button--delete' : 'button button--filter'} onClick={onClick}>Избранные</button>);
        button.find('[data-test-id="completed-button"]').simulate('click');
        expect(onClick.mock.calls.length).toEqual(1)
    })

    it('component should call a function onClick when on filter - "inWork"', () => {
        const chosen = true;
        const button = shallow(<button data-test-id='inWork-button' className={chosen ? 'button button--filter button--delete' : 'button button--filter'} onClick={onClick}>Избранные</button>);
        button.find('[data-test-id="inWork-button"]').simulate('click');
        expect(onClick.mock.calls.length).toEqual(1)
    })

});