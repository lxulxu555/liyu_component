import { Children, cloneElement, useContext, useState } from 'react';
import { MenuContext } from './menu';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';
import { CSSTransition } from 'react-transition-group';
import { Icon } from '../Icon/icon';

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props;
  const context = useContext(MenuContext);
  const openSubMenus = context.defaultOpenSubMenus || [];
  const isOpened = index && context.mode === 'vertical' ? openSubMenus.includes(index) : false;
  const [menuOpen, setOpen] = useState(isOpened);
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical',
  });

  const renderChildren = () => {
    const subMenuClasses = classNames('submenu');
    const childrenComponent = Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        return cloneElement(childElement, { index: `${index}-${i}` });
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem component');
      }
    });
    return (
      <CSSTransition in={menuOpen} timeout={300} unmountOnExit>
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </CSSTransition>
    );
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };

  let timer: NodeJS.Timeout;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };

  const clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {};
  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
          onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
        }
      : {};

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon name="arrow-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
