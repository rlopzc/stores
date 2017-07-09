import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Store from '../../components/Stores/Store';


describe('Stores/Store', () => {
  const store = {position: {lat: 1, lng: 2}, name: 'store'};

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Store {...store}/>, div);

    const component = renderer.create(<Store {...store} />);
    expect(component).toMatchSnapshot();
  });

  it('renders an item with the store name', () => {
    const component = shallow(<Store {...store} />);
    const expected = store.name;
    expect(component.find('li').text()).toBe(expected);
  });
});
