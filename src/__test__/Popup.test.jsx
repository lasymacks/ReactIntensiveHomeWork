import PopupMenu from "../components/PopupMenu";
import React from "react";

describe('Popup', () => {
    let wrapper;
    const onClick = jest.fn();
    const props = {
        isOpen: true
    }

    beforeEach(() => {
        wrapper = mount(<PopupMenu {...props} />);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('component should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
        console.log(wrapper.debug());
    });

    it('component should call a function onBlur with we lose focus', () => {
        const div = shallow(<div data-test-id='popup' className='popup-backgroung' onClick={onClick} />);
        div.find('[data-test-id="popup"]').simulate('click');
        expect(onClick.mock.calls.length).toEqual(1);
    })

});