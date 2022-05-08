import React from 'react'
import { notification } from 'antd';
const Notification = (type, message, description) => {
    notification[type]({
        message,
        description
    });
}
export default Notification
