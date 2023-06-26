import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, Form, Space } from 'antd';

const S001GuardForm = () => {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleSubmit = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('image', file);
        });
        setUploading(true);
        fetch('/api/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => console.log(data));
    };

    const props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file, filename) => {
            const newFile = new File([file], filename, { type: file.type });
            setFileList([...fileList, newFile]);
            return false;
        },
        fileList,
    };



    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };


    return (
        <div>
            <Form onFinish={handleSubmit}>
                <Space direction={"vertical"}>
                    Material Received by at Factory:
                    <Form.Item
                        label="Guard Upload"
                        name="guard_upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    // rules={[{ required: true, message: 'Please upload an image' }]}
                    >
                        <Upload
                            listType="picture-card"
                            {...props} beforeUpload={(file) => props.beforeUpload(file, "HelloWorld.jpg")}
                            maxCount={1}
                        >
                            <div>
                                <UploadOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>
                </Space>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );

}

export default S001GuardForm;