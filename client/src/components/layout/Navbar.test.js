import React from 'react';
import renderer from 'react-test-renderer';
import Navbar from './Navbar';
import { BrowserRouter} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});
const initialState = {
  auth: {}
};

const props = {
	auth: {
		user: {
			username: "Nadia"
		}
	}
}

import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux'
const mockStore = configureMockStore();
const store = mockStore(initialState);


describe('Test suits for Navbar', () => {
it('renders', () => {
	const wrapper = shallow(<Navbar store={store} {...props}/>);
	expect(wrapper).toMatchSnapshot();

 });
});
