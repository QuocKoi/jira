import React, { useState, useEffect, useRef } from 'react'
import { Space, Tag, Modal, Avatar, Button, Popover, AutoComplete, Input } from 'antd';
import HeaderCyberBugs from '../../components/CyberBugs/main/HeaderCyberBugs';
import { NewTable } from '../../JSS/Table';
import { DeleteIcon, DeleteIconAvatar, EditIcon, WarningIcon } from '../../JSS/Icon';
import { useDispatch, useSelector } from 'react-redux'
import * as ProjectAction from '../../redux/actions/ProjectAction'
import { actOpenModal } from '../../redux/actions/ModalAction';
import FormEditProject from '../../components/Form/FormEditProject';
import { PlusOutlined } from '@ant-design/icons';
import { actGetUser } from '../../redux/actions/UserAction';
import { Div } from '../../JSS/Avatar';
import { NavLink } from 'react-router-dom';

export default function ProjectManagement(props) {
    let [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });
    let [valueInput, setValueInput] = useState('');
    let projectList = useSelector(state => state.ProjectReducer.projectList);
    const userList = useSelector(state => state.UserReducer.userList);
    const category = useSelector(state => state.ProjectCategoryReducer.category);
    let dispatch = useDispatch();
    let searchRef = useRef(null);
    useEffect(() => {
        dispatch(ProjectAction.actFetchAllProjectApi());
    }, []);
    let handleChange = (pagination, filters, sorter) => {
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };
    let handleFilterCategory = () => {
        return category.map((item, index) => {
            return { text: `${item.projectCategoryName}`, value: `${item.projectCategoryName}` }
        })
    };
    let handleDelete = (id) => {
        Modal.confirm({
            title: 'Do you want to delete this item?',
            icon: <WarningIcon />,
            okText: 'Delete',
            okType: 'danger',
            onOk() {
                dispatch(ProjectAction.actDeleteProjectApi(id))
            },
        });
    }
    let onModal = (project) => {
        dispatch(actOpenModal(<FormEditProject />,"Edit Project"));
        dispatch(ProjectAction.actSetEditProject(project))
    }
    let renderMember = (arrMembers, id) => {
        return arrMembers.map((member, index) => {
            return <Div className='avatar__item' key={index}>
                <Avatar key={index} src={member.avatar} />
                <Avatar icon={<DeleteIconAvatar onClick={() => { dispatch(ProjectAction.actRemoveUserFromProject({ projectId: id, userId: member.userId })) }} />} />
            </Div>

        })

    }
    let renderAutoComplete = (idProject) => {
        const handleSearch = (value) => {
            if (searchRef.current) {
                clearTimeout(searchRef.current);
            }
            searchRef.current = setTimeout(() => {
                dispatch(actGetUser(value));
            }, 300)
        }
        const handleSelect = (value, options) => {
            setValueInput(options.label);
            dispatch(ProjectAction.actAssignUserApi({ projectId: idProject, userId: Number(options.value) }))
        }
        const handleData = () => {
            return userList.map((user, index) => {
                const { name, userId } = user;
                return { label: name, value: userId.toString() }
            })
        }
        return (
            <AutoComplete
                dropdownMatchSelectWidth={252}
                options={handleData()}
                onSearch={handleSearch}
                onSelect={handleSelect}
                value={valueInput}
                onChange={(value) => { setValueInput(value) }}
            >
                <Input.Search size="large" placeholder="input here" enterButton />
            </AutoComplete>
        )
    }
    let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
            title: 'Id',
            key: 'id',
            ellipsis: true,
            render: (text, record, index) => {
                return <>{index + 1}</>
            },
        },
        {
            title: 'ProjectName',
            key: 'projectName',
            sorter: (a, b) => {
                if (a.projectName.trim().toLowerCase() < b.projectName.trim().toLowerCase()) { return -1; }
                if (a.projectName.trim().toLowerCase() > b.projectName.trim().toLowerCase()) { return 1; }
                return 0;
            },
            sortOrder: sortedInfo.columnKey === 'projectName' && sortedInfo.order,
            ellipsis: true,
            render: (text, record, index) => {
                return <NavLink to={`/project/board/${text.id}`}>{text.projectName}</NavLink>
            }

        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            filters: handleFilterCategory(),
            filteredValue: filteredInfo.categoryName || null,
            onFilter: (value, record) => record.categoryName.includes(value),
            ellipsis: true,
        },
        {
            title: 'Creator',
            key: 'creator',
            ellipsis: true,
            render: (text, record, index) => {
                return <Tag color="#87d068">{text.creator.name}</Tag>
            }
        },
        {
            title: 'Members',
            key: 'Members',
            ellipsis: true,
            render: (text, record, index) => {
                return <div className='d-flex'>
                    <Avatar.Group maxCount={1} >
                        {renderMember(text.members, text.id)}
                    </Avatar.Group>
                    <Popover title="Add Member" trigger="click" content={renderAutoComplete(text.id)}>
                        <Button shape='circle' icon={<PlusOutlined />} ></Button>
                    </Popover>
                </div>
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text) => {
                return <Space>
                    <a><EditIcon onClick={() => { onModal(text) }} /></a>
                    <a><DeleteIcon onClick={() => { handleDelete(text.id) }} /></a>
                </Space>

            },
        },
    ];

    return (
        <div className='main'>
            <h3 className='fw-bold'>Projects Management</h3>
            <NewTable columns={columns} rowKey='id' dataSource={projectList} onChange={handleChange} />
        </div>
    )
}
