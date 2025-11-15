import Modal from '../../atoms/Modal/Modal'
import Spin from '../../atoms/Spin/Spin'
import './Loader.css'

export default function Loader({isOpen, message}: {isOpen: boolean, message?: string | null}) {
  return (
    <Modal
        open={isOpen}
        className='modal-loader'
        centered
    >
        {message && <div className="mb-4">
            <p>{message}</p>
        </div>}
        <div> 
        <Spin size="large" />
        </div>
    </Modal>
  )
}
