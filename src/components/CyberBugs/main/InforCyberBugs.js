import { Avatar, Tooltip } from 'antd';
import React, { memo } from 'react'
import { AvatarInfor } from '../../../JSS/Avatar';
function InforCyberBugs(props) {
    const{projectDetail}=props;
    let renderMember = () => {
        return projectDetail.members?.map((member,index) => {
            return <AvatarInfor key={index} src={member.avatar} />
        })
    }
    return (
        <div className="info" style={{ display: 'flex' }}>
            <div className="search-block">
                <input className="search" />
                <i className="fa fa-search" />
            </div>
            <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                {renderMember()}
            </Avatar.Group>
            <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
            <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
        </div>

    )
}
export default memo(InforCyberBugs)
