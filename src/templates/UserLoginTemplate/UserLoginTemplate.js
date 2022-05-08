import React, { Fragment } from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min'
import { Button } from 'antd';
import { Layout } from 'antd';


export default function UserLoginTemplate(props) {
    const { Header, Footer, Sider, Content } = Layout;
    const { Component, ...restParam } = props;
    return (
        <Route {...restParam} render={(propsRoute) => {
            return <Fragment>
                <Layout style={{ height: '100vh' }}>
                    <Sider width={'60vw'} style={{
                        backgroundImage: 'url(https://wallpaperaccess.com/full/1657789.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
                        , backgroundPosition: 'center'
                    }}></Sider>
                    <Content style={{ padding: '20px' }}><Component {...propsRoute}></Component></Content>
                </Layout>
            </Fragment>
        }}></Route>
    )
}
