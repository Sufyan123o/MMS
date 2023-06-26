import React, { useState } from 'react';
import dayjs from 'dayjs';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Checkbox,
    DatePicker,
    Divider,
    Form,
    Input,
    InputNumber,
    notification,
    Popconfirm,
    Table,
    TimePicker,
    Upload,
    Space,
    Select,
} from 'antd';
const { TextArea } = Input;


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


const selectBeforeCurrency = (
    <Select
        defaultValue="dollar"
        style={{
            width: 60,
        }}
    >
        <Option value="dollar">$</Option>
        <Option value="peso">₱</Option>
    </Select>
);

const selectAfterWeight = (
    <Select
        defaultValue="kg"
        style={{
            width: 60,
        }}
    >
        <Option value="kg">kg</Option>
        <Option value="lbs">lbs</Option>
    </Select>
);


const S001FullForm = () => {
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
        // openNotification(values);
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

    const InputTableItem = ({ label, styles }) => (
        <Form.Item name={label} noStyle>
            <Input style={styles} placeholder="Please input" />
        </Form.Item>
    );

    const truckContentData = [
        {
            key: "Spare Tyre",
            departure: <CheckboxTableItem label="spare_tyre_departure" />,
            arrival: <CheckboxTableItem label="spare_tyre_arrival" />,
            truck_comments: <InputTableItem label="spare_tyre_truck_comments" styles={{ width: 400 }} />
        },
        {
            key: "Jack & handle",
            departure: <CheckboxTableItem label="jack_handle_departure" />,
            arrival: <CheckboxTableItem label="jack_handle_arrival" />,
            truck_comments: <InputTableItem label="jack_handle_truck_comments" styles={{ width: 400 }} />
        },
        {
            key: "Wheel spanner",
            departure: <CheckboxTableItem label="wheel_spanner_departure" />,
            arrival: <CheckboxTableItem label="wheel_spanner_arrival" />,
            truck_comments: <InputTableItem label="wheel_spanner_truck_comments" styles={{ width: 400 }} />
        },
        {
            key: "Life savers",
            departure: <CheckboxTableItem label="life_savers_departure" />,
            arrival: <CheckboxTableItem label="life_savers_arrival" />,
            truck_comments: <InputTableItem label="life_savers_truck_comments" styles={{ width: 400 }} />
        },
        {
            key: "Tarpaulin",
            departure: <CheckboxTableItem label="tarpaulin_departure" />,
            arrival: <CheckboxTableItem label="tarpaulin_arrival" />,
            truck_comments: <InputTableItem label="tarpaulin_truck_comments" styles={{ width: 400 }} />
        },
        {
            key: "Sterio",
            departure: <CheckboxTableItem label="sterio_departure" />,
            arrival: <CheckboxTableItem label="sterio_arrival" />,
            truck_comments: <InputTableItem label="sterio_truck_comments" styles={{ width: 400 }} />
        },
    ];


    // for materials table
    const [materialWeightData, setMaterialWeightData] = useState([
        {
            key: "0",
            type_of_materials_collected: <InputTableItem label="type_of_material_collected_0" />,
            place_company_person: <InputTableItem label="place_company_person_0" />,
            quantity: <InputTableItem label="quantity_0" />,
            price: <InputTableItem label="price_0" />
        },
        // {
        //     key: "1",
        //     type_of_materials_collected: <InputTableItem label="type_of_material_collected_1" />,
        //     place_company_person: <InputTableItem label="place_company_person_1" />,
        //     quantity: <InputTableItem label="quantity_1" />,
        //     price: <InputTableItem label="price_1" />
        // },
    ]);

    const [count, setCount] = useState(1);

    const handleDeleteMaterialRow = (key) => {
        const newData = materialWeightData.filter((item) => item.key !== key);
        setMaterialWeightData(newData);
    };

    const materialWeightColumn = [
        {
            title: "",
            dataIndex: "key",
            // key: "key"
            rowScope: 'row',
        },
        {
            title: "Type of materials collected",
            dataIndex: "type_of_materials_collected",
            key: "type_of_materials_collected"
        },
        {
            title: "Place/Company/Person",
            dataIndex: "place_company_person",
            key: "place_company_person"
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity"
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price"
        },
        {
            title: 'Delete row',
            dataIndex: 'delete',
            render: (_, record) =>
                materialWeightData.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteMaterialRow(record.key)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ]

    const handleAddMaterialRow = () => {
        const newData = {
            key: count,
            type_of_materials_collected: <InputTableItem label={`type_of_material_collected_${count}`} />,
            place_company_person: <InputTableItem label={`place_company_person_${count}`} />,
            quantity: <InputTableItem label={`quantity_${count}`} />,
            price: <InputTableItem label={`price_${count}`} />
        };
        setMaterialWeightData([...materialWeightData, newData]);
        setCount(count + 1);
    };


    // stuff for tyre condition table
    const NumberInputTableItem = ({ label }) => (
        <Form.Item name={label} noStyle>
            <InputNumber
                style={{ width: 100 }}
                // defaultValue={100}
                min={0}
                max={100}
                addonAfter={"%"}
                step={5}
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

    // deals with input image
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };


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

                {/* Truck number and date section */}
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
                            name="form_date"
                            noStyle
                        // rules={[{ required: true, message: 'Date is required' }]}
                        >
                            <DatePicker format={"MM/DD/YYYY"} />
                        </Form.Item>
                    </Form.Item>
                </Space>

                <Divider />
                {/* Helper and driver section */}
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
                {/* Journey section */}
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
                {/* Fuel guage section */}
                <Space size={"large"} align="baseline" >
                    <Form.Item label="Fuel guage before departure">
                        <Form.Item
                            name="fuel_guage_before_departure"
                            noStyle
                        // rules={[{ required: true, message: 'Mileage is required' }]}
                        >
                            <InputNumber
                                min={0}
                                max={100}
                                addonAfter={"%"}
                                step={25}
                            />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="Fuel guage after arrival">
                        <Form.Item
                            name="fuel_guage_after_arrival"
                            noStyle
                        // rules={[{ required: true, message: 'Mileage is required' }]}
                        >
                            <InputNumber
                                min={0}
                                max={100}
                                addonAfter={"%"}
                                step={25}
                            />
                        </Form.Item>
                    </Form.Item>

                </Space>

                <Divider />
                {/* Truck contents section */}
                <Space>
                    <Table
                        dataSource={truckContentData}
                        columns={truckContentsColumn}
                        pagination={false}
                        bordered={true}
                    />
                </Space>

                <Divider />
                {/* Tyre condition section */}
                <Space>
                    <Table
                        dataSource={tyreConditionData}
                        columns={tyreConditionColumn}
                        pagination={false}
                        bordered={true}
                    />
                </Space>

                <Divider />
                {/* Expenses section */}
                <Space direction='vertical' size={"large"}>
                    <Space direction='inline' size={"large"} align="baseline">
                        <Form.Item label="Toll paid">
                            <Form.Item
                                name="toll_paid"
                                noStyle
                            // rules={[{ required: true, message: 'Toll paid is required' }]}
                            >
                                <InputNumber
                                    min={0}
                                    addonBefore={selectBeforeCurrency}
                                />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item label="Weight paid">
                            <Form.Item
                                name="weight_paid"
                                noStyle
                            // rules={[{ required: true, message: 'Weight paid is required' }]}
                            >
                                <InputNumber
                                    min={0}
                                    addonBefore={selectBeforeCurrency}
                                />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item label="Other costs">
                            <Form.Item
                                name="other_costs"
                                noStyle
                            >
                                <InputNumber
                                    min={0}
                                    addonBefore={selectBeforeCurrency}
                                />
                            </Form.Item>
                        </Form.Item>
                    </Space>

                    <Space direction='inline' size={"large"}>
                        <Form.Item label="Money issued">
                            <Form.Item
                                name="money_issued"
                                noStyle
                            // rules={[{ required: true, message: 'Toll paid is required' }]}
                            >
                                <InputNumber
                                    min={0}
                                    addonBefore={selectBeforeCurrency}
                                />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item label="Issued by">
                            <Form.Item
                                name="money_issued_by_sign"
                                noStyle
                            // rules={[{ required: true, message: 'Truck number is required' }]}
                            >
                                <Input placeholder="Please input" />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item label="Received by">
                            <Form.Item
                                name="money_issued_received_by_sign"
                                noStyle
                            // rules={[{ required: true, message: 'Truck number is required' }]}
                            >
                                <Input placeholder="Please input" />
                            </Form.Item>
                        </Form.Item>
                    </Space>

                    <Space direction='inline' size={"large"}>
                        <Form.Item label="Balance returned">
                            <Form.Item
                                name="balance_returned"
                                noStyle
                            // rules={[{ required: true, message: 'Toll paid is required' }]}
                            >
                                <InputNumber
                                    min={0}
                                    addonBefore={selectBeforeCurrency}
                                />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item label="Returned by">
                            <Form.Item
                                name="balance_returned_by_sign"
                                noStyle
                            // rules={[{ required: true, message: 'Truck number is required' }]}
                            >
                                <Input placeholder="Please input" />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item label="Received by">
                            <Form.Item
                                name="balance_returned_received_by_sign"
                                noStyle
                            // rules={[{ required: true, message: 'Truck number is required' }]}
                            >
                                <Input placeholder="Please input" />
                            </Form.Item>
                        </Form.Item>
                    </Space>

                    <Space>
                        <Form.Item label="Expence comments">
                            <Form.Item
                                name="expence_comments"
                                noStyle
                            // rules={[{ required: true, message: 'Truck number is required' }]}
                            >
                                <TextArea style={{ width: 800 }} rows={4} />
                            </Form.Item>
                        </Form.Item>
                    </Space>
                </Space>

                <Divider />
                {/* Weight and material section */}
                <Space direction='vertical' size={"large"}>
                    <Space direction='inline' size={"large"}>
                        <Form.Item label="Weight Empty">
                            <Form.Item
                                name="weight_empty"
                                noStyle
                            // rules={[{ required: true, message: 'Toll paid is required' }]}
                            >
                                <InputNumber
                                    addonAfter={selectAfterWeight}
                                />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item label="Weight Full">
                            <Form.Item
                                name="weight_full"
                                noStyle
                            // rules={[{ required: true, message: 'Toll paid is required' }]}
                            >
                                <InputNumber
                                    addonAfter={selectAfterWeight}
                                />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item label="Weight Material">
                            <Form.Item
                                name="weight_material"
                                noStyle
                            // rules={[{ required: true, message: 'Toll paid is required' }]}
                            >
                                <InputNumber
                                    addonAfter={selectAfterWeight}
                                />
                            </Form.Item>
                        </Form.Item>
                    </Space>

                    <Space>
                        <Button
                            onClick={handleAddMaterialRow}
                            type="primary"
                            style={{
                                marginBottom: 16,
                            }}
                        >
                            Add a row
                        </Button>
                        <Table
                            dataSource={materialWeightData}
                            columns={materialWeightColumn}
                            pagination={false}
                        />

                    </Space>
                </Space>

                <Divider />
                {/* Guard Signature by image */}
                {/* NEED TO ADD POST REQ FOR IMAGE */}
                <Space direction={"vertical"}>
                    Material Received by at Factory:
                    <Form.Item
                        label="Guard Upload"
                        name="guard_upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    // rules={[{ required: true, message: 'Please upload an image' }]}
                    >
                        <Upload listType="picture-card" {...props}>
                            <div>
                                <UploadOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>
                </Space>

                <Divider />
                <p>For Official Finance Use</p>
                <Space direction={"vertical"} size={"large"}>
                    <Space direction={"inline"} size={"large"}>
                        <Form.Item label="Total payment">
                            <Form.Item
                                name="total_payment"
                                noStyle
                            // rules={[{ required: true, message: 'Total payment is required' }]}
                            >
                                <InputNumber
                                    min={0}
                                    addonBefore={selectBeforeCurrency}
                                />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item label="Date">
                            <Form.Item
                                name="finance_office_date"
                                noStyle
                            // rules={[{ required: true, message: 'Date is required' }]}
                            >
                                <DatePicker format={"MM/DD/YYYY"} />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item label="Cash">
                            <Form.Item
                                name="Cash"
                                noStyle
                            // rules={[{ required: true, message: 'Total payment is required' }]}
                            >
                                <InputNumber
                                    min={0}
                                    addonBefore={selectBeforeCurrency}
                                />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item label="Check number">
                            <Form.Item
                                name="check_number"
                                noStyle
                            // rules={[{ required: true, message: 'Total payment is required' }]}
                            >
                                <InputNumber
                                    min={0}
                                    addonBefore={selectBeforeCurrency}
                                />
                            </Form.Item>
                        </Form.Item>
                    </Space>

                    <Space direction="inline">
                        <Form.Item label="Payment Issued by">
                            <Form.Item
                                name="payment_issed_by_finance_office"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                            // rules={[{ required: true, message: 'Please upload an image' }]}
                            >
                                <Upload action="/api/upload" listType="picture-card">
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Form.Item>
                    </Space>
                </Space>


                <Divider />
                {/* Submit button */}
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


export default S001FullForm;