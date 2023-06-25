import React, { useState } from 'react';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { HomeTwoTone, EditTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import { Menu, Button } from 'antd';
import { NavLink, Outlet, Link } from 'react-router-dom';


export function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const Sidebar = ({ sidebarItems }) => {
    const onClick = (e) => {
        console.log('click ', e);
    };

    return (
        <div>
            <Menu
                onClick={onClick}
                style={
                    {
                        width: 256,
                        height: "100vh",
                    }
                }
                items={sidebarItems}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="vertical"
            />
        </div>
    );
};

export default Sidebar;