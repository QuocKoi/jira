import styled from "styled-components";
import { Layout, Menu, Slider } from 'antd';
const { Header, Sider, Content } = Layout;
const {SubMenu}=Menu;


export const NewSider=styled(Sider)`
position:fixed;
z-index:10;
display:block;
height:100vh;
`