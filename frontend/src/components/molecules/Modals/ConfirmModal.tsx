import Modal from "../../atoms/Modal/Modal";
import Button from "../../atoms/Button";

type ConfirmModalProps = {
  open: boolean;
  error: string | null;
  loading?: boolean;
  title?: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

const ConfirmModal = ({
  open,
  error = null,
  loading = false,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onCancel,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmModalProps) => {
  return (
    <Modal open={open} onCancel={onCancel} title={title} footer={null}>
      <div className="space-y-6 max-w-md">
        <p className="text-sm">{description}</p>
        {error !== null && <p className="text-sm text-red-500">{error}</p>}
        {loading && <p className="text-sm text-green-500">Loading... please wait!</p>}
        {!loading && <div className="flex justify-end gap-3 pt-4">
          <Button className="px-4 py-2" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button className="px-4 py-2" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>}
      </div>
    </Modal>
  );
};

export default ConfirmModal;
