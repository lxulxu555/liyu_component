import { Icon } from './components/Icon/icon';
import Menu from './components/Menu/menu';

function App() {
  return (
    <div className="App">
      <Icon name="coffee" size={10} />
      <Menu defaultIndex={'0'} onSelect={(index) => console.log(index)} defaultOpenSubMenus={['3']}>
        <Menu.Item>active</Menu.Item>
        <Menu.Item disabled>disabled</Menu.Item>
        <Menu.Item>xyz</Menu.Item>
        <Menu.SubMenu title="title">
          <Menu.Item>drop1</Menu.Item>
          <Menu.Item>drop2</Menu.Item>
          <Menu.Item>drop3</Menu.Item>
          <Menu.Item>drop3</Menu.Item>
          <Menu.Item>drop3</Menu.Item>
          <Menu.Item>drop3</Menu.Item>
          <Menu.Item>drop3</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
}

export default App;
