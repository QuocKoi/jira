import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import {
    FileOutlined,
    UserOutlined,
    TeamOutlined,
    MenuUnfoldOutlined,
    PlusOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { NewSider } from '../../JSS/Slider';
import { useDispatch } from 'react-redux'
import { actOpenModal } from '../../redux/actions/ModalAction'
import FormCreateIssue from '../Form/FormCreateIssue';
export default function SideBar() {
    const dispatch = useDispatch();
    const { Header, Sider, Content } = Layout;
    const { SubMenu } = Menu;
    let [collapsed, setCollapsed] = useState(true);
    const toggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <NewSider collapsed={collapsed} >
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item icon={<MenuUnfoldOutlined />} onClick={() => { toggle() }}></Menu.Item>
                <Menu.Item key="1" icon={<PlusOutlined />} onClick={() => { dispatch(actOpenModal(<FormCreateIssue/>,"Create issue")) }}>
                    Create Issue
                </Menu.Item>
                <Menu.Item key="2" icon={<SearchOutlined />}>
                    Search
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined />}>
                    Files
                </Menu.Item>
            </Menu>
        </NewSider>
    )
}
