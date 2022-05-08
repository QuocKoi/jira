import { Button, Drawer, Space } from 'antd';
import styled from 'styled-components';



export const NewDrawer = styled(Drawer)`
& .ant-drawer-content{
    .ant-drawer-wrapper-body{
        .ant-drawer-header{
            .ant-drawer-header-title{
                flex-direction: row-reverse;
            }
        }
        .ant-drawer-footer{
            .ant-space{
                width:100%;
                justify-content:end;
            }
        }
    }
}
`