import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './components/Menu/menu';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import Icon from './components/Icon/icon';

function App() {
  return (
    <div className="App">
      <Icon icon="coffee" theme="danger" size="10x" />
      <Menu defaultIndex={'0'} onSelect={(index) => console.log(index)} defaultOpenSubMenus={['3']}>
        <Menu.Item>active</Menu.Item>
        <Menu.Item disabled>disabled</Menu.Item>
        <Menu.Item>xyz</Menu.Item>
        <Menu.SubMenu title="title">
          <Menu.Item>drop1</Menu.Item>
          <Menu.Item>drop2</Menu.Item>
          <Menu.Item>drop3</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
}

export default App;
