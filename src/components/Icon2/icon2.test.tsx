import { render } from '@testing-library/react';
import { Icon2, type Icon2Props } from './icon2';

const testProps: Icon2Props = {
  name: 'fish',
  size: 24,
  color: 'red',
  width: 24,
  height: 24,
  strokeWidth: 2,
  absoluteStrokeWidth: true,
  fill: 'red',
  spin: true,
};

describe('test Icon2 component', () => {
  it('should render the correct component based on different props', () => {
    render(<Icon2 {...testProps} />);
  });
});
