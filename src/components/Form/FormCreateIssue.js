import { Avatar, Form } from 'antd'
import React, { useState, useEffect } from 'react'
import { FormTime, NewFormItem } from '../../JSS/Form'
import { Select, Progress } from 'antd';
import { Editor } from '@tinymce/tinymce-react'
import { ClockCircleOutlined, ArrowUpOutlined, ArrowDownOutlined, ExclamationCircleOutlined, TagOutlined } from '@ant-design/icons';
import { NewSpace } from '../../JSS/Space';
import { NewInput } from '../../JSS/Input';
import { useDispatch, useSelector } from 'react-redux';
import { actGetAllPriorityApi } from '../../redux/actions/PriorityAction';
import { actFetchTaskTypeApi } from '../../redux/actions/TaskTypeAction';
import { actFetchAllStatusApi } from '../../redux/actions/StatusAction';
import { actCreateTaskApi, actFetchProjectDetailApi } from '../../redux/actions/ProjectAction';
import { actSetCallback } from '../../redux/actions/ModalAction';
const { Option } = Select;
export default function FormCreateIssue() {
    let [values, setValues] = useState({
        listUserAsign: [],
        taskName: "",
        description: "",
        statusId: "",
        originalEstimate: 0,
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
        projectId: 0,
        typeId: 0,
        priorityId: 0
    })
    const dispatch = useDispatch();
    const priorityList = useSelector(state => state.PriorityReducer.priorityList);
    const { projectList, projectDetail } = useSelector(state => state.ProjectReducer);
    const taskTypeList = useSelector(state => state.TaskTypeReducer.taskTypeList);
    const statusList = useSelector(state => state.StatusReducer);

    useEffect(() => {
        dispatch(actGetAllPriorityApi());
        dispatch(actFetchTaskTypeApi());
        dispatch(actFetchAllStatusApi());
    }, [])
    useEffect(()=>{
        dispatch(actSetCallback(hanldeSubmit))
    },[values])
    useEffect(() => {
        setValues({ ...values, statusId: statusList[0]?.statusId })
    }, [statusList])
    const renderPriorityList = () => {
        return priorityList.map((item, index) => {
            const { priority, priorityId } = item;
            let color = '#c00303';
            let icon = <ArrowUpOutlined style={{ color: color }} />;
            if (priorityId == 2) {
                color = "#dd9b04";
                icon = <ArrowUpOutlined style={{ color: color }} />
            } else if (priorityId == 3 || priorityId == 4) {
                color = "#16c60c";
                icon = <ArrowDownOutlined style={{ color: color }} />
            }
            return <Option name='priorityId' key={index} value={priorityId}>{icon}{priority}</Option>
        })
    }
    const renderTaskTypeList = () => {
        return taskTypeList.map((item, index) => {
            const { taskType, id } = item;
            let color = "#cc0606";
            let icon = <ExclamationCircleOutlined style={{ color: color }} />
            if (id == 2) {
                color = "#65ba43";
                icon = <TagOutlined style={{ color: color }} />
            }
            return <Option name='typeId' key={index} value={id}>{icon} {taskType}</Option>
        })
    }
    const renderProjectList = () => {
        return projectList.map((project, index) => {
            const { id, projectName } = project;
            return <Option name="projectId" key={index} value={id}>{projectName}</Option>
        })
    }
    const renderMember = () => {
        return projectDetail.members?.map((member, index) => {
            const { userId, name, avatar } = member;
            const img = <Avatar style={{ backgroundColor: '#87d068' }} size="small" src={avatar} />
            return <Option key={index} value={userId} label={name}>{img}{name}</Option>
        })
    }
    const renderStatus = () => {
        return statusList.map((status, index) => {
            const { statusId, statusName } = status;
            return <Option key={index} name='statusId' value={statusId}>{statusName}</Option>
        })
    }
    const handleChangeSelect = (value, option) => {
        const { name } = option;
        setValues({ ...values, [name]: value })
    }
    const handleChangeInput = (e) => {
        const { value, name } = e.target;
        setValues({ ...values, [name]: value })
    }
    const handleExchangePersent = () => {
        const { timeTrackingSpent, timeTrackingRemaining } = values;
        const sum = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
        return Math.round((timeTrackingSpent / sum) * 100);
    }
    const hanldeSubmit = () => {
        dispatch(actCreateTaskApi(values))
    }
    return (
        <Form layout='vertical'>
            <NewFormItem label="Select project">
                <Select
                    showSearch
                    placeholder="Select a project"
                    optionFilterProp="children"
                    onSelect={(projectId) => { dispatch(actFetchProjectDetailApi(projectId)) }}
                    onChange={handleChangeSelect}
                >
                    {renderProjectList()}
                </Select>
            </NewFormItem>
            <NewFormItem label="Task name">
                <NewInput name='taskName' onChange={handleChangeInput}></NewInput>
            </NewFormItem>
            <NewFormItem label="Status">
                <Select
                    showSearch
                    placeholder="Select a status"
                    onChange={handleChangeSelect}
                    optionFilterProp='children'
                    defaultValue='BACKLOG'
                >
                    {renderStatus()}
                </Select>
            </NewFormItem>
            <NewSpace >
                <NewFormItem name='priorityId' label="Priority" rules={[{ required: true, message: 'Please choose!' }]}>
                    <Select
                        placeholder="Select a project"
                        onChange={handleChangeSelect}
                    >
                        {renderPriorityList()}
                    </Select>
                </NewFormItem>
                <NewFormItem name='typeId' label="Type" rules={[{ required: true, message: 'Please choose!' }]}>
                    <Select
                        placeholder="Select a project"
                        onChange={handleChangeSelect}

                    >
                        {renderTaskTypeList()}
                    </Select>
                </NewFormItem>
                <FormTime name='originalEstimate' label='Original estimate (hours)' rules={[{ required: true, pattern: /^\d+$/, message: 'Only number!' }]}>
                    <NewInput name='originalEstimate' placeholder="Number" onChange={handleChangeInput} />
                </FormTime>
            </NewSpace>
            <Editor
                outputFormat='text'
                tagName='description'
                textareaName='description'
                onEditorChange={(content) => { setValues({ ...values, description: content }) }}
                value={values.description}
                init={{
                    height: 500,
                    menubar: false,
                    resize: false,
                    height: 200,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <NewFormItem label="Assigness">
                <Select
                    mode="multiple"
                    allowClear
                    placeholder="Please select"
                    optionFilterProp="children"
                    onChange={(value) => { setValues({ ...values, listUserAsign: value }) }}

                >
                    {renderMember()}
                </Select>
            </NewFormItem>
            <NewFormItem label='Time Tracking'>
                <ClockCircleOutlined />
                <Progress showInfo={true} percent={handleExchangePersent()} status="active" />
                <NewSpace>
                    <FormTime name='timeTrackingSpent' label='Time spend (hours)' rules={[{ required: true, pattern: /^\d+$/, message: 'Only number!' }]}>
                        <NewInput name='timeTrackingSpent' placeholder="Number" onChange={handleChangeInput} />
                    </FormTime>
                    <FormTime name='timeTrackingRemaining' label='Time remaining (hours)' rules={[{ required: true, pattern: /^\d+$/, message: 'Only number!' }]}>
                        <NewInput name='timeTrackingRemaining' placeholder="Number" onChange={handleChangeInput} />
                    </FormTime>
                </NewSpace>
            </NewFormItem>
        </Form>
    )
}
