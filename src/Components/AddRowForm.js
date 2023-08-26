import React from "react";
import { Form, Input, Button } from "antd";

function AddRowForm({ columns, onAddRow }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onAddRow(values); // Pass the form values to the parent component
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish}>
      {columns.map((column) => (
        <Form.Item
          key={column.dataIndex}
          name={column.dataIndex}
          label={column.title}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add New Row
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddRowForm;
