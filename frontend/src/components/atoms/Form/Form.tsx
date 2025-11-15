import type { ReactNode } from 'react';
import { Form as AntForm } from 'antd';
import type { FormProps } from 'antd';
import './Form.css';

type FormComponent = React.FC<FormProps & { children?: ReactNode }> & {
    Item: typeof AntForm.Item;
    useForm: () => any;
  };

const Form: FormComponent = ({ children, name, ...props }) => {
  const [form] = AntForm.useForm(); 
  return (
    <AntForm 
      name={name} 
      form={form} 
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      {...props}
    >
      {children}
    </AntForm>
  );
};

Form.Item = AntForm.Item;

Form.useForm = AntForm.useForm;

export default Form;