import { Form, Space, Select } from 'antd'
import { NewFormItem } from '../../JSS/Form'
import React, { useState, useEffect } from 'react'
import { NewInput } from '../../JSS/Input'
import { Editor } from '@tinymce/tinymce-react'
import { useSelector, useDispatch } from 'react-redux'
import { actUpdateProjectApi } from '../../redux/actions/ProjectAction'
import { actSetCallback } from '../../redux/actions/ModalAction'
const { Option } = Select;
export default function FormEditProject(props) {
    let [values, setValues] = useState({ id: '', projectName: '', creator: '', description: '', categoryId: '' });
    const category = useSelector(state => state.ProjectCategoryReducer.category);
    const dispatch = useDispatch();
    const { id, description, projectName, categoryId, creator } = useSelector(state => state.ProjectReducer.editProject);
    useEffect(() => {
        setValues({ id: id, projectName: projectName, creator: 0, description: description, categoryId: categoryId });
    }, [id]);
    useEffect(() => {
        dispatch(actSetCallback(onSubmit));
    }, [values])
    const renderCategory = () => {
        return category.map((item, index) => {
            const { id, projectCategoryName } = item;
            return <Option name='categoryId' key={index} value={id}>{projectCategoryName}</Option>
        })
    }
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }
    const handleChangeEditor = (value) => {
        setValues({ ...values, description: value })
    }
    const handleChangeSelect = (value) => {
        setValues({ ...values, categoryId: value })
    }
    const onSubmit = () => {
        dispatch(actUpdateProjectApi(values))
    }
    return (
        <Form layout='vertical' >
            <Space>
                <NewFormItem label='Id'>
                    <NewInput disabled value={values.id} />
                </NewFormItem>
                <NewFormItem label='Project Name'>
                    <NewInput name='projectName' value={values.projectName} onChange={handleChangeInput} />
                </NewFormItem>
                <NewFormItem label='Project Category' >
                    <Select name='categoryId' value={values.categoryId} onChange={handleChangeSelect}>
                        {renderCategory()}
                    </Select>
                </NewFormItem>
            </Space>
            <Editor
                outputFormat='text'
                tagName='description'
                textareaName='description'
                onEditorChange={handleChangeEditor}
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
        </Form>
    )
}
