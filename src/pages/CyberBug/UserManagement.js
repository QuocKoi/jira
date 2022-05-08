import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar, Input, Popover, Space } from 'antd';
import { NavLink } from 'react-router-dom'
import {
  CaretDownOutlined
} from '@ant-design/icons';
import { NewTable } from '../../JSS/Table'
import { DeleteIcon, EditIcon } from '../../JSS/Icon';
import { actDeleteUserApi, actGetUser, actSetUserEdit } from '../../redux/actions/UserAction';
import { actOpenModal } from '../../redux/actions/ModalAction';
import FormEditUser from '../../components/Form/FormEditUser';
export default function UserManagement() {
  const [newUserList, setNewUserList] = useState([]);
  const dispatch = useDispatch();
  const { userLogin, userList } = useSelector(state => state.UserReducer);
  useEffect(() => {
    dispatch(actGetUser(''))
  }, [])
  useEffect(() => {
    setNewUserList(userList)
  }, [userList])
  const content = (
    <NavLink className='logOut' to='/login'><i class="fa fa-door-open"></i> Log out</NavLink>
  );
  const columns = [
    {
      title: 'STT',
      width: '10%',
      render: (text, record, index) => {
        return index + 1
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      with: '30%'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
      sorter: (a, b) => {
        if (a.name.trim().toLowerCase() < b.name.trim().toLowerCase()) { return -1; }
        if (a.name.trim().toLowerCase() > b.name.trim().toLowerCase()) { return 1; }
        return 0;
      }

    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      width: '20%',
    },
    {
      title: 'Action',
      dataIndex: 'name',
      width: '20%',
      render: (text, record, index) => {
        return <Space>
          <a><EditIcon onClick={() => { handleClickEdit(text, record) }} /></a>
          <a><DeleteIcon onClick={() => { handleDelete(record) }} /></a>
        </Space>
      }
    },
  ];
  const handleKeyUp = (e) => {
    const { value } = e.target;
    const newArr = userList.filter(item => item.name.toLowerCase().search(value) != -1);
    setNewUserList(newArr)


  }
  const handleDelete = (account) => {
    const { userId } = account;
    dispatch(actDeleteUserApi(userId))
  }
  const handleClickEdit = (text, user) => {
    dispatch(actOpenModal(<FormEditUser/>, 'User edit'));
    dispatch(actSetUserEdit(user));


  }
  return (
    <div className='main'>
      <div className='border-bottom text-end pb-3'>
        Chào! <span>{userLogin.name}</span> <Avatar src={userLogin.avatar} ></Avatar>
        <Popover placement="bottomLeft" content={content} trigger="click" style={{ width: '100%' }}>
          <CaretDownOutlined style={{ fontSize: '25px', cursor: 'pointer' }} />
        </Popover>

      </div>
      <h3 className='fw-bolder my-3'>Users Management</h3>
      <div className='d-flex justify-content-between align-item-center mb-3 search'>
        <Input onKeyUp={handleKeyUp} className='searchInput' placeholder='Search name'></Input>
        <i class="fa fa-search p-2 search__icon"></i>
      </div>
      <NewTable columns={columns} dataSource={newUserList} />;
    </div>
  )
}
