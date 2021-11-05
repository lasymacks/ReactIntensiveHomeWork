import TodoItem from "../components/TodoItem";
import {mountWithWrapper} from "../setupTests";
import React from "react";

describe('Popup', () => {
    let wrapper;
    let instance;
    const onClick = jest.fn();
    const onBlur = jest.fn();
    const onChange = jest.fn();
    const props = {
        id: 1635933622413,
    }

    beforeEach(() => {
        wrapper = shallow(mountWithWrapper(<TodoItem {...props}/>));
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('component should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
        console.log(wrapper.debug());
    });

});
