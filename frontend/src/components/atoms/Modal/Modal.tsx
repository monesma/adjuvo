import { Modal as AntModal } from 'antd';
import type { ModalProps } from 'antd'
import './Modal.css'


const Modal = (props: ModalProps) => {

    return <AntModal {...props} />
}

export default Modal;