import type { ReactElement } from 'react'
import { Upload as AntUpload } from 'antd';
import type { UploadProps } from 'antd';
import Button from '../Button/Button';
import { UploadOutlined } from '@ant-design/icons';

  type CustomUploadProps = UploadProps & {
    children: ReactElement
  }


  export default function UploadFile(props: CustomUploadProps) {
    return (
        <AntUpload
            showUploadList={false}
        {...props}
        >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </AntUpload>
    )
  }
  