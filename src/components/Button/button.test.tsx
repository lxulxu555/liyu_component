import { fireEvent, render, screen } from '@testing-library/react';
import { Button, ButtonProps } from './button';

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'test-button',
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe('test Button component', () => {
  it('should render the correct default button', () => {
    render(<Button>Nice</Button>);
    const element = screen.getByText('Nice');
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
  });
  it('should render the correct component based on different props', () => {
    render(<Button {...testProps}>primary</Button>);
    const element = screen.getByText('primary');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn btn-primary test-button');
  });
  it('should render a link when btnType equals link and href is provided', () => {
    render(
      <Button btnType="link" href="www.baidu.com">
        Link
      </Button>
    );
    const element = screen.getByText('Link');
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  });
  it('should render disabled button when disabled set to true', () => {
    render(<Button {...disabledProps}>Nice</Button>);
    const element = screen.getByText('Nice') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
