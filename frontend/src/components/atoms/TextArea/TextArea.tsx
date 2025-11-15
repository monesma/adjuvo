import React from 'react';
import { Input } from "antd";
const { TextArea } = Input;

const TextAreaInput = (props: React.ComponentProps<typeof TextArea>) => {
    return <TextArea {...props} />;
}

export default TextAreaInput