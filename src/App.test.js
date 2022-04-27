import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Map from './map/map'
import SearchBar from './searchBar/searchBar'
require("mapbox-gl-js-mock");

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  App: () => ({}),
}));

describe('<App />', () => {
  let shallow;

  beforeEach(() => {
    shallow = createShallow({ dive: true });
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.MapBox')).toExist();
  });
});




