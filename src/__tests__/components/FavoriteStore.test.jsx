import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import FavoriteStore from '../../components/FavoriteStores';

describe('FavoriteStore', () => {
  const store = {position: {lat: 1, lng: 2}};
  const favorites = [store, store, store];

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FavoriteStore />, div);

    const component = renderer.create(<FavoriteStore />);
    expect(component).toMatchSnapshot();
  });

  it('renders favorite stores', () => {
    const component = renderer.create(<FavoriteStore stores={favorites} />);
    expect(component).toMatchSnapshot();
  });
});
