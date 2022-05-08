
import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import Databoard from '../../components/CyberBugs/Databoard';
import SideBar from '../../components/CyberBugs/SideBar';

export default function CyberBugsTenplate(props) {
    const { Component, ...rest } = props;
    return (
        <Route exact {...rest} render={(propsRoute) => {
            return <div className="jira">
                {/* <!-- Sider Bar  --> */}
                <SideBar></SideBar>
                {/* <!--Menu -->*/}
                <Databoard></Databoard>
                {/* {/* Main Board * /} */}
                <Component {...propsRoute} ></Component>


            </div>
        }}></Route>
    )
}
