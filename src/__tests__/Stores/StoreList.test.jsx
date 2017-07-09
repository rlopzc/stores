import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import StoreList from '../../components/Stores/StoreList';


describe('Stores/StoreList', () => {
  const store = {position: {lat: 1, lng: 2}};
  const favorites = [store, store, store];

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StoreList />, div);

    const component = renderer.create(<StoreList />);
    expect(component).toMatchSnapshot();
  });

  it('does not render a list when there are no favorites', () => {
    const component = shallow(<StoreList stores={[]} />);
    expect(component.find('ul').exists()).toBe(false);
  });

  it('renders a list when there are favorites', () => {
    const component = shallow(<StoreList stores={favorites} />);

    expect(component.find('ul').exists()).toBe(true);
    expect(component.find('Store').length).toBe(3);

    expect(renderer.create(<StoreList stores={favorites} />)).toMatchSnapshot();
  });
});
