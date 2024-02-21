import classNames from 'classnames';
import { MenuContext } from './menu';
import { useContext } from 'react';

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const { index: current, onSelect } = useContext(MenuContext);

  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': current === index,
  });

  const handleClick = () => {
    if (onSelect && !disabled && typeof index === 'string') {
      onSelect(index);
    }
  };

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.displayName = 'MenuItem';
export default MenuItem;
