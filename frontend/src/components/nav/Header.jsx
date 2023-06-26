import { HomeTwoTone, TagsTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

const menuItems = [
    {
        key: 'h',
        icon: <HomeTwoTone />,
        label: <Link to="/">Home</Link>
    },
    {
        key: '2',
        icon: <TagsTwoTone />,
        label: <Link to="/s002">S002</Link>

    },
    {
        key: 'l',
        icon: <CheckCircleTwoTone />,
        label: <Link to="/login">Login</Link>
    }
];

const Header = () => {
    const [current, setCurrent] = useState('h');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <>
            <Menu items={menuItems} onClick={onClick} selectedKeys={[current]} mode="horizontal" />
            {/* <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="h" icon={<HomeTwoTone />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="r" icon={<EditTwoTone />}>
                    <Link to="/register">Register</Link>
                </Menu.Item>
                <Menu.Item key="l" icon={<CheckCircleTwoTone />}>
                    <Link to="/login">Login</Link>
                </Menu.Item>
            </Menu> */}
            <Outlet />
        </>

    )
};
export default Header;