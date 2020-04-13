import React from 'react';
import renderer from 'react-test-renderer';
import DashboardStudent from './DashboardStudent';
import { BrowserRouter} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});
const initialState = {
  auth: {}
};


import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux'
const mockStore = configureMockStore();
const store = mockStore(initialState);


describe('Test suits for DashboardStudent', () => {
it('renders', () => {
	const wrapper = shallow(<DashboardStudent store={store}/>);
	expect(wrapper).toMatchSnapshot();

 });
});
