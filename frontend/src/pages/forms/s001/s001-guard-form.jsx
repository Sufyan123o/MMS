import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Upload, Form } from 'antd';

const S001GuardForm = () => {
    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append('image', values.upload[0].originFileObj);

        fetch('api/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => console.log(data));

    };


    const normFile = (e) => {
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
                        label="GuardUpload"
                        name="guard_upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    // rules={[{ required: true, message: 'Please upload an image' }]}
                    >
                        <Upload action="/upload" listType="picture-card">
                            <div>
                                <PlusOutlined />
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