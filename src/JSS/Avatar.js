import styled from "styled-components";
import { Avatar } from "antd";

export const Div = styled.div`
    position: relative;
    overflow: hidden;
        .ant-avatar:not(:first-child){
            margin-left:0
        }
        .ant-avatar-icon{
            position:absolute;
            top:-100%;
            left:0;
            line-height:25px;
            background-color:rgb(187,187,187);
            margin-left:0;
            display:block;
            transition:all .3s;
            cursor:pointer;
        }
        &:hover{
            .ant-avatar-icon{
                display:block;
                top:0;
            } 
        }
  

`
export const AvatarInfor=styled(Avatar)`
transition:all .3s;
cursor:pointer;
&:hover{
    transform: translateY(-10px);
}
`