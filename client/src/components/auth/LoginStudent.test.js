import React from 'react';
import renderer from 'react-test-renderer';
import {LoginStudent} from './LoginStudent';
import { BrowserRouter} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { loginStudent } from "../../actions/authActions";
import { shallow, configure, mount } from 'enzyme';

configure({adapter: new Adapter()});

const props = {
	username: "",
    password: "",
	auth: {
		isAuthenticated: false,
	},
	loginStudent: loginStudent,
}


describe('Test suits for LoginStudent', () => {
	it('should match snapshot', () => {
		const component = renderer.create(<LoginStudent {...props}/>).toJSON();
    	expect(component).toMatchSnapshot();
	 });

	it('Should capture username correctly onChange', ()=> {
		const component = mount(<LoginStudent {...props}/>);
        const input = component.find('input').at(0);
        input.instance().value = 'myUsername';
  		input.simulate('change');
  		expect(component.state().username).toEqual('myUsername');
    });

    it('Should capture password correctly onChange', ()=> {
		const component = mount(<LoginStudent {...props}/>);
        const input = component.find('input').at(1);
        input.instance().value = 'myPassword';
  		input.simulate('change');
  		expect(component.state().password).toEqual('myPassword');
    });

    it('Should produce an error message on submission of empty form', ()=> {
    	
    	const component = mount(<LoginStudent {...props}/>);
		component.find('form').simulate('submit', { preventDefault () {} });
		console.log(component.debug());

    });



});
