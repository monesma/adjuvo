import type { ReactElement } from 'react'
import { Upload as AntUpload } from 'antd';
import type { UploadProps } from 'antd';

  type CustomUploadProps = UploadProps & {
    children: ReactElement
  }


  export default function UploadImage(props: CustomUploadProps) {
    return (
        <AntUpload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
        {...props}
        >
            {props.children}
        </AntUpload>
    )
  }
  