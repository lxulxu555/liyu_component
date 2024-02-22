import { render } from '@testing-library/react';
import { Icon, type IconProps } from './icon';

const testProps: IconProps = {
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

describe('test Icon component', () => {
  it('should render the correct component based on different props', () => {
    render(<Icon {...testProps} />);
  });
});
