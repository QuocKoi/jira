import { Button, Form, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeaderCyberBugs from '../../components/CyberBugs/main/HeaderCyberBugs'
import { Editor } from '@tinymce/tinymce-react'
import * as ProjectCategoryAction from '../../redux/actions/ProjectCategoryAction'
import { NewInput } from '../../JSS/Input'
import { NewFormItem } from '../../JSS/Form'
import * as ProjectAction from '../../redux/actions/ProjectAction'

export default function ProjectDetail(props) {
    let [values, setValues] = useState({ projectName: '', description: '', categoryId: 1 })
    const dispatch = useDispatch();
    const category = useSelector(state => state.ProjectCategoryReducer.category);
    useEffect(() => {
        dispatch(ProjectCategoryAction.actFetchCategoryApi());
    }, [])
    const renderCategory = () => {
        return category.map((item, index) => {
            const { id, projectCategoryName } = item;
            return <Option name='categoryId' key={index} value={id}>{projectCategoryName}</Option>
        })
    }
    const { Option } = Select;
    const handleSubmit = (e) => {
        dispatch(ProjectAction.actCreateProjectApi(values))
    }
    const handleChangeInput = (e) => {
        let { value, name } = e.target;
        setValues({ ...values, [name]: value });

    }
    const handleChangeTinyCloud = (content) => {
        setValues({ ...values, description: content });

    }
    const handleChangeSelect = (value) => {
        setValues({ ...values, categoryId: value })
    }
    return (
        <div style={{ width: '50%', margin: '0 auto', padding: '40px 0' }}>
            <h3>Create Project</h3>
            <Form layout='vertical' onSubmitCapture={handleSubmit}>
                <NewFormItem label="Project Name"
                    name='projectName'
                    rules={[{ required: true, message: 'Please input name!' }]}
                >
                    <NewInput type='text' name='projectName' onChange={handleChangeInput} />

                </NewFormItem>
                <Editor
                    name="description"
                    onEditorChange={handleChangeTinyCloud}
                    outputFormat='text'
                    init={{
                        height: 500,
                        menubar: false,
                        resize: false,
                        height: 200,
                        max_width: 500,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }' + 'p {margin-bottom:0!important}'
                    }}
                />
                <NewFormItem label='Project Category' >
                    <Select name='categoryId' onChange={handleChangeSelect} defaultValue="Dự án web">
                        {renderCategory()}
                    </Select>
                </NewFormItem>

                <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>


        </div>

    )
}

