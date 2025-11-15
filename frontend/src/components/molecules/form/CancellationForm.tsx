import { useState } from "react";
import { Input } from "../../atoms/input/Input";
import Button from "../../atoms/Button";
import type { CreateNewCancellation } from "../../../types/cancellation-types";

interface CancellationFormProps {
  onSubmit: (data: CreateNewCancellation) => void;
  appId: string | null;
  builderId: string | null;
  missionId: string;
  onCancel: () => void;
}

const CancellationForm: React.FC<CancellationFormProps> = ({
  onSubmit,
  appId,
  builderId,
  missionId,
  onCancel,
}) => {
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      app_id: appId,
      builder_id: builderId,
      reason,
      mission_id: missionId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="text-sm mb-1 block">Reason for cancellation:</label>
        <Input
          placeholder="Explain why you want to cancel..."
          type="textarea"
          value={reason}
          changeValue={setReason}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          onClick={onCancel}
          className="bg-transparent shadow-transparent border border-indigo-600 text-indigo-600 px-4 py-2 rounded"
        >
          Cancel
        </Button>
        <Button
            className="pt-1"
          onClick={handleSubmit}
        >
          Submit Cancellation
        </Button>
      </div>
    </form>
  );
};

export default CancellationForm;
