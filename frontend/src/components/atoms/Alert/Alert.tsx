import { Alert as AntAlert } from 'antd';
import type { AlertProps } from 'antd'
import './Alert.css'

const Alert = (props: AlertProps) => {

    return <AntAlert className='alert-general' {...props} />
}

export default Alert