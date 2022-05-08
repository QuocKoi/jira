import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Databoard() {
    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src={require('../../assets/img/download.jfif')} />
                </div>
                <div className="account-info">
                    <p>CyberLearn.vn</p>
                    <p>Report bugs</p>
                </div>
            </div>
            <div className="control">
                <div>
                    <NavLink to='/project/board'>
                        <i className="fa fa-credit-card me-2" />
                        <span>Cyber Board</span>
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/project/detail'>
                        <i class="fa fa-wrench me-2"></i>
                        <span>Project Settings</span>
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/project/management'>
                        <i class="fa fa-cogs me-2"></i>
                        <span>Project Management</span>
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/usermanagement'>
                        <i class="fa fa-user-friends me-2"></i>
                        <span>Users Management</span>
                    </NavLink>
                </div>
            </div>
            <div className="feature">
                <div>
                    <i className="fa fa-truck" />
                    <span>Releases</span>
                </div>
                <div>
                    <i className="fa fa-equals" />
                    <span>Issues and filters</span>
                </div>
                <div>
                    <i className="fa fa-paste" />
                    <span>Pages</span>
                </div>
                <div>
                    <i className="fa fa-location-arrow" />
                    <span>Reports</span>
                </div>
                <div>
                    <i className="fa fa-box" />
                    <span>Components</span>
                </div>
            </div>
        </div>
    )
}
