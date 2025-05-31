import React from 'react';
import renderer, {act} from 'react-test-renderer';
import App from '../../../App';

describe('App Snapshot Test', () => {
  it('renders correctly', async () => {
    let tree;
    await act(async () => {
      tree = renderer.create(<App />).toJSON();
    });
    expect(tree).toMatchSnapshot();
  });
});
