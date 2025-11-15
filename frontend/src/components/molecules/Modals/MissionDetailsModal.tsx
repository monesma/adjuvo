import Modal from "../../atoms/Modal/Modal";
import Button from "../../atoms/Button";
import { H2, H3 } from "../../atoms/Headers";
import type { MissionQuery } from "../../../types/mission-types";
import type { HederaAppQuery } from "../../../types/hederaApp-types";

type Props = {
  open: boolean;
  onCancel: () => void;
  onApply: () => void;
  mission: MissionQuery | null;
  app: HederaAppQuery | null;
};

const MissionDetailsModal = ({ open, onCancel, onApply, mission, app }: Props) => {
  if (!mission || !app) return null;

  return (
    <Modal open={open} onCancel={onCancel} title="Mission Details" footer={null}>
      <div className="text-black space-y-4 flex gap-2">
        <div className="w-24 h-24 aspect-square rounded-md overflow-hidden border-2 border-indigo-600">
          <img
            src={`/avatars/${app.avatar}`}
            alt="App avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full">
        <div>
          <H2 className="text-indigo-400 mb-2 mt-0 text-left">{mission.title}</H2>
          <p className="text-sm mb-2">
            <strong>Description:</strong> {mission.description}
          </p>
          <p className="text-sm mb-2">
            <strong>Reward:</strong> {mission.reward} HBAR
          </p>
        </div>

        <div className="border border-black/50 rounded-sm p-2">
          <H3 className="text-sm text-indigo-400 mb-1 mt-0 text-left">App Info</H3>
          <p className="text-xs font-bold mb-1">{app.app_name}</p>
          <p className="text-xs mb-1">
            <a
              href={app.app_twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-indigo-400"
            >
              {app.app_twitter}
            </a>
          </p>
          <p className="text-xs mb-1">
            <strong>Level:</strong> {app.level}
          </p>
          <p className="text-xs">
            <strong>Score:</strong> {app.score}
          </p>
        </div>

        <div className="text-right pt-2">
          <Button className="mx-0 px-4 py-2" onClick={onApply}>Apply</Button>
        </div>
        </div>
      </div>
    </Modal>
  );
};

export default MissionDetailsModal;
