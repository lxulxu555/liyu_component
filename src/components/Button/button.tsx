import classNames from 'classnames';

interface BaseButtonProps {
  /**
   * custom class
   */
  className?: string;
  /**
   * set button to disabled
   */
  disabled?: boolean;
  /**
   * set button size
   */
  size?: 'lg' | 'sm';
  /**
   * set button type
   */
  btnType?: 'primary' | 'default' | 'danger' | 'link';
  /**
   * set button children
   */
  children: React.ReactNode;
  /**
   * set button link
   */
  href?: string;
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

export const Button = ({ btnType = 'default', disabled = false, size, children, href, className, ...restProps }: ButtonProps) => {
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled,
  });

  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};
