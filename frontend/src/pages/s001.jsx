import React, { useState } from 'react';
import Sidebar, { getItem } from '../components/Sidebar';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { Button } from 'antd';
import './s001.css';
import S001DriverForm from './forms/s001/s001-driver-form';
import S001GuardForm from './forms/s001/s001-guard-form';



const S001 = () => {
    // creating new form button
    const onClickAddButton = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit'
        });
        const formattedTime = currentDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
        const newButton = getItem(
            <div onClick={onClickFormButton}>Created at: {formattedDate} at {formattedTime}</div>,
            formattedTime,
            null,
            null,
            'button'
        );
        setSidebarItems((prevItems) => [...prevItems, newButton]);
    };



    const [displayForm, setDisplayForm] = useState(false);

    // clicking form button
    const onClickFormButton = () => {
        setDisplayForm(true);
    }


    // setting sidebar
    const [sidebarItems, setSidebarItems] = useState([
        getItem(<div onClick={onClickAddButton}>Add form</div>, "h"),
        {
            type: "divider"
        },
    ]);



    return (
        <div className="home-container">
            <div className="sidebar">
                <Sidebar sidebarItems={sidebarItems} />
            </div>
            <div className="content">
                {/* {displayForm && <S001DriverForm />} */}
                <S001GuardForm />
            </div>
        </div>
    );
}

export default S001;