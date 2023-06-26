import React, { useState } from 'react';
import dayjs from 'dayjs';
import {
    Button,
    Checkbox,
    DatePicker,
    Divider,
    Form,
    Input,
    InputNumber,
    notification,
    Table,
    TimePicker,
    Upload,
    Space,
} from 'antd';


const truckContentsColumn = [
    {
        title: "",
        dataIndex: "key",
        key: "key"
    },
    {
        title: "Departure",
        dataIndex: "departure",
        key: "departure"
    },
    {
        title: "Arrival",
        dataIndex: "arrival",
        key: "arrival"
    },
    {
        title: "Truck comments",
        dataIndex: "truck_comments",
        key: "truck_comments"
    }
];

const tyreConditionColumn = [
    {
        title: "Tyre condition",
        dataIndex: "key",
        key: "key",
    },
    {
        title: "Front L",
        dataIndex: "front_l",
        key: "front_l",
    },
    {
        title: "Front R",
        dataIndex: "front_r",
        key: "front_r",
    },
    {
        title: "Back L",
        dataIndex: "back_l",
        key: "back_l",
    },
    {
        title: "Back LL",
        dataIndex: "back_ll",
        key: "back_ll",
    },
    {
        title: "Back R",
        dataIndex: "back_r",
        key: "back_r",
    },
    {
        title: "Back RR",
        dataIndex: "back_rr",
        key: "back_rr",
    },
    {
        title: "Spare",
        dataIndex: "spare",
        key: "spare",
    },
];


const S001DriverForm = () => {
    // deals with form stuff
    const initVals = {
        date: dayjs(),
        factory_departure_time: dayjs()
    }

    const handleFormSubmit = (values) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };

        fetch("api/s001-driver-form", requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));

    };


    // deals with notification
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (vals) => {
        api.open({
            message: 'Button submitted',
            description: JSON.stringify(vals),
        });
    };


    // deals with adding helper
    const [helperInputs, setHelperInputs] = useState([1]);

    const addHelper = () => {
        const newHelperInputs = [...helperInputs];
        const newInputIndex = newHelperInputs[newHelperInputs.length - 1] + 1 || 1;
        newHelperInputs.push(newInputIndex);
        setHelperInputs(newHelperInputs);
    };

    const removeHelper = (index) => {
        const newHelperInputs = helperInputs.filter((inputIndex) => inputIndex !== index);
        setHelperInputs(newHelperInputs);
    };


    // stuff for truck content table
    const CheckboxTableItem = ({ label }) => (
        <Form.Item name={label} valuePropName="checked" initialValue={false} noStyle>
            <Checkbox />
        </Form.Item>
    );

    const InputTableItem = ({ label }) => (
        <Form.Item name={label} noStyle>
            <Input style={{ width: 400 }} placeholder="Please input" />
        </Form.Item>
    );

    const truckContentData = [
        {
            key: "Spare Tyre",
            departure: <CheckboxTableItem label="spare_tyre_departure" />,
            arrival: <CheckboxTableItem label="spare_tyre_arrival" />,
            truck_comments: <InputTableItem label="spare_tyre_truck_comments" />
        },
        {
            key: "Jack & handle",
            departure: <CheckboxTableItem label="jack_handle_departure" />,
            arrival: <CheckboxTableItem label="jack_handle_arrival" />,
            truck_comments: <InputTableItem label="jack_handle_truck_comments" />
        },
        {
            key: "Wheel spanner",
            departure: <CheckboxTableItem label="wheel_spanner_departure" />,
            arrival: <CheckboxTableItem label="wheel_spanner_arrival" />,
            truck_comments: <InputTableItem label="wheel_spanner_truck_comments" />
        },
        {
            key: "Life savers",
            departure: <CheckboxTableItem label="life_savers_departure" />,
            arrival: <CheckboxTableItem label="life_savers_arrival" />,
            truck_comments: <InputTableItem label="life_savers_truck_comments" />
        },
        {
            key: "Tarpaulin",
            departure: <CheckboxTableItem label="tarpaulin_departure" />,
            arrival: <CheckboxTableItem label="tarpaulin_arrival" />,
            truck_comments: <InputTableItem label="tarpaulin_truck_comments" />
        },
        {
            key: "Sterio",
            departure: <CheckboxTableItem label="sterio_departure" />,
            arrival: <CheckboxTableItem label="sterio_arrival" />,
            truck_comments: <InputTableItem label="sterio_truck_comments" />
        },
    ];


    // stuff for tyre condition table
    const NumberInputTableItem = ({ label }) => (
        <Form.Item name={label} noStyle>
            <InputNumber
                style={{ width: 100 }}
                // defaultValue={100}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace('%', '')}
            />
        </Form.Item>
    );

    const tyreConditionData = [
        {
            key: "Departure",
            front_l: <NumberInputTableItem label="departure_front_l" />,
            front_r: <NumberInputTableItem label="departure_front_r" />,
            back_l: <NumberInputTableItem label="departure_back_l" />,
            back_ll: <NumberInputTableItem label="departure_back_ll" />,
            back_r: <NumberInputTableItem label="departure_back_r" />,
            back_rr: <NumberInputTableItem label="departure_back_rr" />,
            spare: <NumberInputTableItem label="departure_spare" />,
        },
        {
            key: "Arrival",
            front_l: <NumberInputTableItem label="arrival_front_l" />,
            front_r: <NumberInputTableItem label="arrival_front_r" />,
            back_l: <NumberInputTableItem label="arrival_back_l" />,
            back_ll: <NumberInputTableItem label="arrival_back_ll" />,
            back_r: <NumberInputTableItem label="arrival_back_r" />,
            back_rr: <NumberInputTableItem label="arrival_back_rr" />,
            spare: <NumberInputTableItem label="arrival_spare" />,
        },
    ];


    return (
        <div>
            {contextHolder}
            <Form
                // labelCol={{ span: 4 }}
                // wrapperCol={{ span: 14 }}
                layout="inline"
                // style={{ maxWidth: 00 }}
                initialValues={initVals}
                onFinish={handleFormSubmit}
            >

                {/* <Space size={"large"} align="baseline" >
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Space>

                    <Divider /> */}

                <Space size={"large"} align="baseline" >
                    <Form.Item label="Truck Number">
                        <Form.Item
                            name="truck_number"
                            noStyle
                        // rules={[{ required: true, message: 'Truck number is required' }]}
                        >
                            <Input style={{ width: 160 }} placeholder="Please input" />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="Date">
                        <Form.Item
                            name="date"
                            noStyle
                        // rules={[{ required: true, message: 'Date is required' }]}
                        >
                            <DatePicker format={"MM/DD/YYYY"} />
                        </Form.Item>
                    </Form.Item>
                </Space>

                <Divider />

                <Space size="large" align="baseline">
                    <Form.Item label="Driver">
                        <Form.Item
                            name="driver"
                            noStyle
                        // rules={[{ required: true, message: 'Driver is required' }]}
                        >
                            <Input style={{ width: 160 }} placeholder="Please input" />
                        </Form.Item>
                    </Form.Item>

                    <Button type="primary" onClick={addHelper}>Add Helper</Button>

                    <Space direction='vertical' size="small">
                        {helperInputs.map((inputIndex) => (
                            <Space
                                key={inputIndex}
                                size={0}
                                align="baseline"
                                direction="inline"
                                style={{ display: "flex" }}
                            >
                                <Form.Item label={`Helper ${inputIndex}`}>
                                    <Form.Item
                                        name={`helper${inputIndex}`}
                                        noStyle
                                    >
                                        <Input style={{ width: 160 }} placeholder="Please input" />
                                    </Form.Item>
                                </Form.Item>

                                <Button
                                    type="dashed"
                                    onClick={() => removeHelper(inputIndex)}
                                >Remove</Button>
                            </Space>
                        ))}
                    </Space>
                </Space>

                <Divider />

                <Space size={"middle"} direction='vertical'>
                    <Space size={"large"} align="baseline" >
                        <Form.Item label="Factory Departure Time">
                            <Form.Item
                                name="factory_departure_arrival_time"
                                noStyle
                            // rules={[{ required: true, message: 'Time is required' }]}
                            >
                                {/* The json value for the time is $H and $m */}
                                <TimePicker.RangePicker use12Hours={true} format={'HH:mm'} />
                            </Form.Item>
                        </Form.Item>
                    </Space>


                    <Space size={"large"} align="baseline" >
                        <Form.Item label="Mileage before departure">
                            <Form.Item
                                name="mileage_before_departure"
                                noStyle
                            // rules={[{ required: true, message: 'Mileage is required' }]}
                            >
                                <InputNumber />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="Mileage after arrival">
                            <Form.Item
                                name="mileage_after_arrival"
                                noStyle
                            // rules={[{ required: true, message: 'Mileage is required' }]}
                            >
                                <InputNumber />
                            </Form.Item>
                        </Form.Item>

                    </Space>
                </Space>

                <Divider />

                <Space size={"large"} align="baseline" >
                    <Form.Item label="Fuel guage before departure">
                        <Form.Item
                            name="fuel_guage_before_departure"
                            noStyle
                        // rules={[{ required: true, message: 'Mileage is required' }]}
                        >
                            <InputNumber />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="Fuel guage after arrival">
                        <Form.Item
                            name="fuel_guage_after_arrival"
                            noStyle
                        // rules={[{ required: true, message: 'Mileage is required' }]}
                        >
                            <InputNumber />
                        </Form.Item>
                    </Form.Item>

                </Space>

                <Divider />

                <Space>
                    <Table
                        dataSource={truckContentData}
                        columns={truckContentsColumn}
                        pagination={false}
                    />
                </Space>

                <Divider />

                <Space>
                    <Table
                        dataSource={tyreConditionData}
                        columns={tyreConditionColumn}
                        pagination={false}
                    />
                </Space>

                <Divider />



                <Space size={"large"} align="baseline" >
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Space>
            </Form>

        </div>
    )

}


export default S001DriverForm;