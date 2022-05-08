import { Form } from 'antd'
import styled from 'styled-components'


export const NewFormItem = styled(Form.Item)`
font-weight:bold;
margin-top:20px;
.ant-form-item-control{
    .ant-form-item-control-input{
        .ant-form-item-control-input-content{
            .ant-input-affix-wrapper{
                .ant-input{
                    background:transparent;
                }
            }
            .ant-input-suffix{
                .ant-input-feedback-icon{
                    .anticon {
                        svg{
                            vertical-align:initial
                        }
                    }
                }
            }
        }
    }
    .ant-form-item-explain{
        font-weight:400
    }
}
`
export const FormTime = styled(Form.Item)`
margin-top:20px;
font-weight:500;
label{
    color:#959eae;
}
`