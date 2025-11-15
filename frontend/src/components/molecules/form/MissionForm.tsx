import { useState } from "react";
import { Input } from "../../atoms/input/Input";
import Button from "../../atoms/Button";
import type { CreateNewMission } from "../../../types/mission-types";

interface MissionFormProps {
  initialData?: Partial<CreateNewMission>;
  onSubmit: (data: CreateNewMission) => void;
  appId: string;
}

const MissionForm: React.FC<MissionFormProps> = ({ initialData = {}, onSubmit, appId }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [reward, setReward] = useState(initialData.reward || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mission: CreateNewMission = {
      app_id: appId,
      builder_id: initialData.builder_id || null,
      title,
      description,
      reward,
      currency: "HBAR"
    };

    onSubmit(mission);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label>Title:</label>
        <Input placeholder="Mission title" value={title} changeValue={setTitle} />
      </div>

      <div>
        <label>Description:</label>
        <Input placeholder="Mission description" type="textarea" value={description} changeValue={setDescription}/>
      </div>

      <div>
        <label>Reward (HBAR):</label>
        <Input
          type="number"
          placeholder="100"
          value={String(reward)}
          changeValue={(val) => setReward(Number(val))}
        />
      </div>

      <Button type="submit" className="m-0 p-2">{initialData.title ? "Update" : "Create"} Mission</Button>
    </form>
  );
};

export default MissionForm;
