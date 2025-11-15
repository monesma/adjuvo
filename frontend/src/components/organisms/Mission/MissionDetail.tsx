import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  selectHederaApp,
  loginHederaApp,
} from "../../../redux/hederaApp/hederaAppReducer";
import { selectBuilder } from "../../../redux/builder/builderReducer";
import { H1, H2 } from "../../atoms/Headers";
import type { MissionQuery } from "../../../types/mission-types";
import type { HederaAppQuery } from "../../../types/hederaApp-types";
import type { BuilderQuery } from "../../../types/builder-types";
import { getMissionById, updateMission } from "../../../api/mission";
import {
  getHederaAppByScId,
  updateHederaApp,
  checkHederaAppToken,
} from "../../../api/hederaApp";
import { getBuilderByScId, updateBuilder } from "../../../api/builder";
import Chat from "../../molecules/Chat";
import ConfirmModal from "../../molecules/Modals/ConfirmModal";
import Button from "../../atoms/Button";
import CancellationForm from "../../molecules/form/CancellationForm";
import { Modal } from "antd";
import type { CreateNewCancellation } from "../../../types/cancellation-types";
import { createNewCancellation } from "../../../api/cancellation";
import { createNewNotification } from "../../../api/notification";
import { createNewReport } from "../../../api/report";
import { useCreateTopic } from "../../../services/hedera/createTopicTransaction";
import { useStoreMessageToTopic } from "../../../services/hedera/StoreMessageToTopic";
import { useWalletInterface } from "../../../services/wallets/useWalletInterface";
import { useNFTMinting } from "../../../hooks/useNFTMinting";
import { NFTProofModal } from "../../molecules/NFTProofModal";
import type { StoredNFTInfo } from "../../../types/nft-types";
import { AccountId } from "@hashgraph/sdk";
import { generateBuilderCertificate } from "../../../services/utils/CertificationGenerator.ts";
import { generateMissionProof } from "../../../services/utils/ProofOfWorkGenerator.ts";
import {
  calculatePointsForBoth,
  defaultPointsConfig,
} from "../../../services/utils/CalculatePoints";
import { calculateLevel } from "../../../services/utils/LevelSystem";
type MissionWithAppInfos = MissionQuery & {
  appInfo?: HederaAppQuery;
  builderInfo?: BuilderQuery;
  nftReceipt?: StoredNFTInfo | null;
  nftReward?: StoredNFTInfo | null;
};

interface Props {
  missionId: string;
  onBack: () => void;
}

const MissionDetail: React.FC<Props> = ({ missionId, onBack }) => {
  const app = useSelector(selectHederaApp);
  const builder = useSelector(selectBuilder);
  const dispatch = useDispatch();
  const { mintPaymentReceipt, mintAchievementBadge } = useNFTMinting();
  const { createTopic } = useCreateTopic();
  const { store: storeMissionToTopic } = useStoreMessageToTopic();
  const [mission, setMission] = useState<MissionWithAppInfos | null>(null);
  const [isNFTModalOpen, setIsNFTModalOpen] = useState<boolean>(false);
  const mode = localStorage.getItem(import.meta.env.VITE_LS_ROLE_KEY);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const statusColorMap: Record<string, string> = {
    Pending: "text-gray-300",
    Ongoing: "text-yellow-400",
    Finished: "text-green-400",
  };

  const statusLabelMap: Record<string, string> = {
    Pending: "Free",
    Ongoing: "On going",
    Finished: "Finished",
  };
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { accountId: connectedAccountId, isConnected } = useSelector(
    (state: RootState) => state.walletConnect
  );
  const { metamaskAccountAddress: metamaskId } = useSelector(
    (state: RootState) => state.metamask
  );

  const { accountId, walletInterface } = useWalletInterface();

  const updatePoints = async (token: string) => {
    try {
      if (!mission) {
        return;
      }

      const { builderPoints, appPoints } = calculatePointsForBoth(
        mission.reward,
        defaultPointsConfig
      );

      const newAppScore = app.infos.score + appPoints;
      const newBuilderScore = mission.builderInfo.score + builderPoints;

      const newAppLevel = calculateLevel(newAppScore);
      const newBuilderLevel = calculateLevel(newBuilderScore);
      const updateAppData = {
        ...app.infos,
        missionsCompleted: app.infos.missionsCompleted + 1,
        score: newAppScore,
        level: newAppLevel,
      };

      const hederaAppPoints = await updateHederaApp({
        token: token,
        id: app.infos._id,
        data: updateAppData,
      });
      if (hederaAppPoints.status === 200) {
        await checkHederaAppToken(token).then((res) => {
          if (res.status === 200)
            dispatch(loginHederaApp(res.content.hederaApp));
        });
      }
      const updateBuilderData = {
        ...mission.builderInfo,
        missionsCompleted: mission.builderInfo.missionsCompleted + 1,
        score: newBuilderScore,
        level: newBuilderLevel,
      };
      await updateBuilder({
        token: token,
        id: mission.builderInfo._id,
        data: updateBuilderData,
      });
    } catch (err) {
      console.log("Error updating score", err);
    }
  };

  const handleEndMission = async () => {
    setError(null);

    if (!(isConnected || connectedAccountId || metamaskId)) {
      setError("Please connect your wallet first");
      setIsEndModalOpen(false);
      return;
    }

    if (!mission?.builderInfo) {
      setError("Builder information is missing");
      return;
    }

    setLoading(true);

    try {
      const token = window.localStorage.getItem(
        import.meta.env.VITE_LS_TOKEN_KEY
      );
      if (!token) throw new Error("Authentication token not found");

      let currentTopicId = app.infos.topic_id;
      if (!currentTopicId) {
        const topicResult = await createTopic(
          app.infos.app_name || "App Topic",
          1
        );
        if (topicResult.status !== 200 || !topicResult.content?.topicId) {
          throw new Error("Failed to create topic");
        }
        currentTopicId = topicResult.content.topicId;

        const updateAppData = { ...app.infos, topic_id: currentTopicId };
        const updateAppResult = await updateHederaApp({
          token: token,
          id: app.infos._id,
          data: updateAppData,
        });
        if (updateAppResult.status !== 200)
          throw new Error("Failed to update app with topic_id");

        await checkHederaAppToken(token).then((res) => {
          if (res.status === 200)
            dispatch(loginHederaApp(res.content.hederaApp));
        });
      }

      const payment = await walletInterface?.transferHBAR(
        AccountId.fromString(mission.builderInfo.wallet_id),
        mission.reward.toFixed(2)
      );

      if (!payment) {
        throw new Error(
          "Payment failed. Please check your wallet and balance."
        );
      }

      let receiptNFT = null;
      try {
        const receiptData = {
          missionId: mission._id,
          missionTitle: mission.title,
          amount: mission.reward,
          currency: mission.currency,
          from: app.infos?.wallet_id || "unknown",
          to: mission.builderInfo?.wallet_id || "unknown",
          timestamp: Date.now(),
          transactionHash: payment.toString(),
          topicId: currentTopicId,
        };

        receiptNFT = await mintPaymentReceipt(receiptData);
      } catch (error) {
        console.error("Error in receipt NFT minting:", error);
      }

      let rewardNFT = null;
      try {
        const connectedWallet =
          accountId || connectedAccountId || app.infos?.wallet_id;

        if (connectedWallet && connectedWallet !== "unknown") {
          const rewardData = {
            missionId: mission._id,
            missionTitle: mission.title,
            appName: app.infos?.app_name || "App",
            builderName: mission.builderInfo?.nickname || "unknown",
            rewardType: "completion" as const,
            level: Math.floor(Math.random() * 3) + 1,
            timestamp: Date.now(),
          };

          rewardNFT = await mintAchievementBadge(rewardData);
        } else {
          console.warn("❌ No valid wallet found for reward NFT");
        }
      } catch (error) {
        console.error("❌ Error in reward NFT minting:", error);
      }

      const infosMission = {
        ...mission,
        status: "Finished",
        nftReceipt: receiptNFT
          ? {
              tokenId: localStorage.getItem("receipt_nft_token_id"),
              serialNumber: receiptNFT.serialNumber,
              transactionId: receiptNFT.transactionId,
              metadata: receiptNFT.metadata,
            }
          : null,
        nftReward: rewardNFT
          ? {
              tokenId: localStorage.getItem("reward_nft_token_id"),
              serialNumber: rewardNFT.serialNumber,
              transactionId: rewardNFT.transactionId,
              metadata: rewardNFT.metadata,
            }
          : null,
      };

      const storeResult = await storeMissionToTopic({
        companyId: app.infos.smartcontract_id,
        receiverId: mission.builderInfo.smartcontract_id,
        data: infosMission,
        topicId: currentTopicId,
      });
      if (storeResult.status !== 200 || !storeResult.content?.messageId) {
        throw new Error("Failed to store mission to topic");
      }

      const updatedMission = {
        contract_address: storeResult.content.messageId.toString(),
        app_id: app.infos.smartcontract_id,
        builder_id: mission.builderInfo.smartcontract_id,
        title: mission.title,
        description: mission.description,
        reward: mission.reward,
        currency: mission.currency,
        status: "Finished",
        nftReceipt: receiptNFT
          ? {
              tokenId: localStorage.getItem("receipt_nft_token_id"),
              serialNumber: receiptNFT.serialNumber,
              transactionId: receiptNFT.transactionId,
              metadata: receiptNFT.metadata,
            }
          : null,
        nftReward: rewardNFT
          ? {
              tokenId: localStorage.getItem("reward_nft_token_id"),
              serialNumber: rewardNFT.serialNumber,
              transactionId: rewardNFT.transactionId,
              metadata: rewardNFT.metadata,
            }
          : null,
      };

      const missionUpdate = await updateMission({
        token,
        id: mission._id,
        data: updatedMission,
      });
      if (missionUpdate.status !== 200)
        throw new Error("Failed to update mission");

      await createNewNotification({
        token,
        data: {
          app_id: app.infos.smartcontract_id,
          builder_id: mission.builderInfo.smartcontract_id,
          title: "Mission ended successfully",
          description: `Congratulations, ${
            app.infos.app_name
          } ended the mission ${mission.title}.${
            receiptNFT ? " You received a payment receipt NFT!" : ""
          }${rewardNFT ? " You received an achievement badge NFT!" : ""}`,
          who: "builder",
          mission_id: missionId,
          cancellation_id: null,
          status: "Pending",
          creation_timestamp: Date.now(),
        },
      });
      await updatePoints(token);
      await getMission();
      setIsEndModalOpen(false);
      Modal.success({
        title: "Congratulations",
        content: "Your mission ended successfully with NFT proofs generated!",
        centered: true,
      });
    } catch (error) {
      let userErrorMessage =
        "An error occurred while ending the mission. Please contact the team!";

      if (error.message?.includes("Wallet connection")) {
        userErrorMessage = error.message;
      } else if (error.message?.includes("Insufficient HBAR")) {
        userErrorMessage = error.message;
      } else if (error.message?.includes("Payment failed")) {
        userErrorMessage = error.message;
      } else if (error.message?.includes("builder information")) {
        userErrorMessage =
          "Could not retrieve builder information. Please try again later.";
      } else if (error.message?.includes("topic")) {
        userErrorMessage =
          "Failed to create or update topic. Please try again later.";
      } else if (error.txError?.message === "USER_REJECT") {
        userErrorMessage = "User rejected the transaction.";
      }

      setError(userErrorMessage);
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelMission = async (mydata: CreateNewCancellation) => {
    try {
      const token = await localStorage.getItem(
        import.meta.env.VITE_LS_TOKEN_KEY
      );
      if (!token) return;
      if (mission?.builderInfo === undefined) return;
      const data = {
        ...mydata,
        status: "Pending",
        creation_date: Date.now(),
      };

      const cancelMission = await createNewCancellation({ token, data });
      if (cancelMission.status === 200) {
        if (mission === undefined) return;
        const data2 = {
          app_id: app.infos.smartcontract_id,
          builder_id: mission?.builderInfo?.smartcontract_id,
          title: "Mission canceled",
          description: `${app.infos.app_name} cancelled the mission ${mission?.title}.`,
          who: "builder",
          mission_id: missionId,
          cancellation_id: cancelMission.content.cancellation._id,
          status: "Pending",
          creation_date: Date.now(),
        };
        const notif = await createNewNotification({ token, data: data2 });
        if (notif.status === 200) {
          const data3 = {
            app_id: app.infos.smartcontract_id,
            builder_id: mission.builderInfo.smartcontract_id,
            title: mission.title,
            description: mission.description,
            reward: mission.reward,
            currency: mission.currency,
            status: "Canceled",
          };
          const updated = await updateMission({
            token,
            id: missionId,
            data: data3,
          });
          if (updated.status === 200) {
            onBack();
          }
        }
      }
      setIsCancelModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReportMission = async (mydata: CreateNewCancellation) => {
    try {
      const token = await localStorage.getItem(
        import.meta.env.VITE_LS_TOKEN_KEY
      );
      if (!token) return;
      if (mission?.builderInfo === undefined) return;
      const data = {
        ...mydata,
        status: "Pending",
        creation_date: Date.now(),
      };

      const reportMission = await createNewReport({ token, data });
      if (reportMission.status === 200) {
        setIsReportModalOpen(false);
        Modal.success({
          title: "Report submitted",
          content: "Your report has been received.",
          centered: true,
        });
      }
    } catch {
      setIsReportModalOpen(false);
    }
  };

  const handleGenerateCertificates = (): void => {
    if (!mission || !mission.builderInfo || !mission.appInfo) return;

    const certificateData: BuilderCertificateData = {
      builderName: mission.builderInfo.nickname,
      builderNickname: mission.builderInfo.nickname,
      builderWallet: mission.builderInfo.wallet_id,
      appName: mission.appInfo.app_name,
      appTwitter: mission.appInfo.app_twitter,
      missionTitle: mission.title,
      missionDescription: mission.description,
      reward: mission.reward,
      completionDate: new Date().toLocaleDateString(),
      certificateId: `ADJ-${mission._id.slice(-8).toUpperCase()}`,
      topicId: mission.appInfo.topic_id,
      transactionHash: mission.contract_address,
    };

    generateBuilderCertificate(certificateData);
  };

  const getMission = async () => {
    try {
      const token = await localStorage.getItem(
        import.meta.env.VITE_LS_TOKEN_KEY
      );
      if (!token) return;

      const missionRes = await getMissionById({ token, id: missionId });
      if (missionRes.status !== 200) return;

      const missionData: MissionWithAppInfos = missionRes.content.mission;

      if (missionData.app_id) {
        try {
          const appRes = await getHederaAppByScId(token, missionData.app_id);
          if (appRes.status === 200) missionData.appInfo = appRes.content.app;
        } catch (e) {
          console.warn("Erreur récupération app:", e);
        }
      }

      if (missionData.builder_id) {
        try {
          const builderRes = await getBuilderByScId(
            token,
            missionData.builder_id
          );
          if (builderRes.status === 200)
            missionData.builderInfo = builderRes.content.builder;
        } catch (e) {
          console.warn("Erreur récupération builder:", e);
        }
      }

      setMission(missionData);
    } catch (err) {
      console.error("Erreur getMission", err);
    }
  };

  useEffect(() => {
    getMission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full p-6 pt-2 max-h-[86vh] overflow-y-auto">
      <button
        onClick={onBack}
        className="text-sm text-blue-400 mb-2 cursor-pointer hover:underline"
      >
        ← Back
      </button>

      {mission ? (
        <>
          <div
            className="p-6 rounded-md shadow-md"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <H1 className="text-4xl mb-6 lg:text-left mx-0 mt-0">
              {mission.title}
            </H1>
            <p className="text-gray-300 mb-3 text-sm">
              <strong className="text-indigo-400">Description:</strong>{" "}
              {mission.description}
            </p>
            <p className="text-gray-300 mb-3 text-sm">
              <strong className="text-indigo-400">Reward:</strong>{" "}
              {mission.reward} HBAR
            </p>
            <p className="text-gray-300 mb-6 text-sm">
              <strong className="text-indigo-400">status:</strong>{" "}
              <span
                className={statusColorMap[mission.status] || "text-gray-400"}
              >
                {statusLabelMap[mission.status] || "Pending"}
              </span>
            </p>

            {mission.status === "Finished" && (
              <div className="mb-6 p-4 rounded-md bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-400 font-semibold">
                      ✅ Mission Completed
                    </p>
                    <p className="text-gray-300 text-sm mt-1">
                      This mission has been finalized on-chain with NFT proofs
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {mission.nftReceipt && (
                      <span className="px-3 py-1 bg-green-600 rounded-full text-xs font-semibold">
                        💰 Receipt NFT
                      </span>
                    )}
                    {mission.nftReward && mode !== "builder" && (
                      <span className="px-3 py-1 bg-purple-600 rounded-full text-xs font-semibold">
                        🏆 Reward NFT
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex gap-3">
                  <Button
                    className="py-2 px-4 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm"
                    onClick={() => setIsNFTModalOpen(true)}
                  >
                    🎁 View NFT Proofs
                  </Button>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {mission.appInfo && (
                <div
                  className="p-4 rounded-md shadow"
                  style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                >
                  <H2 className="text-indigo-400 lg:text-left text-2xl mt-0 mb-4">
                    App Info
                  </H2>
                  <div className="flex gap-4 items-start">
                    <img
                      src={`/avatars/${mission.appInfo.avatar}`}
                      alt="App avatar"
                      className="w-20 h-20 rounded object-cover border-2"
                      style={{
                        borderColor: "#00fff7",
                        boxShadow: "0 0 10px #00fff7",
                      }}
                    />
                    <div className="text-sm">
                      <p className="text-lg font-semibold text-indigo-400">
                        {mission.appInfo.app_name}
                      </p>
                      <p>Twitter: {mission.appInfo.app_twitter}</p>
                      <p>Score: {mission.appInfo.score}</p>
                      <p>Level: {mission.appInfo.level}</p>
                      <p>
                        missions accomplished:{" "}
                        {mission.appInfo.missionsCompleted}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {mission.builderInfo && (
                <div
                  className="p-4 rounded-md shadow"
                  style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                >
                  <H2 className="text-green-400 lg:text-left text-2xl mt-0 mb-4">
                    Builder Info
                  </H2>
                  <div className="flex gap-4 items-start">
                    <img
                      src={`/avatars/${mission.builderInfo.avatar}`}
                      alt="Builder avatar"
                      className="w-20 h-20 rounded object-cover border-2"
                      style={{
                        borderColor: "#00fff7",
                        boxShadow: "0 0 10px #00fff7",
                      }}
                    />
                    <div className="text-sm">
                      <p className="text-lg font-semibold text-green-400">
                        {mission.builderInfo.nickname}
                      </p>
                      <p>
                        <strong>Score</strong>: {mission.builderInfo.score}
                      </p>
                      <p>
                        <strong>Level</strong>: {mission.builderInfo.level}
                      </p>
                      <p>
                        <strong>missions accomplished</strong>:{" "}
                        {mission.builderInfo.missionsCompleted}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {mission.status !== "Pending" && (
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Chat
                    missionId={mission._id}
                    senderId={
                      mode === "builder"
                        ? builder?.infos?.smartcontract_id ?? "builder_unknown"
                        : app?.infos?.smartcontract_id ?? "app_unknown"
                    }
                    senderName={
                      mode === "builder"
                        ? builder?.infos?.nickname ?? "Builder"
                        : app?.infos?.app_name ?? "App"
                    }
                  />
                </div>

                <div className="p-6 rounded-2xl shadow-md bg-black/40 text-white space-y-5">
                  <H2 className="text-indigo-400 text-xl lg:text-left font-bold mb-4 mt-0">
                    Available Actions
                  </H2>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-300">
                        If you encounter a technical issue, feel free to notify
                        us.
                      </p>
                      <Button
                        className="w-full max-w-xs mx-auto py-2 px-4 rounded shadow-red-800 bg-red-700 hover:bg-red-800 text-white font-semibold transition duration-200"
                        onClick={() => setIsReportModalOpen(true)}
                      >
                        🚨 Report a Problem
                      </Button>
                    </div>

                    {mode !== "builder" && mission.status !== "Finished" && (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-300">
                          Mark this mission as completed if all deliverables are
                          reviewed and approved.
                        </p>
                        <Button
                          className="w-full max-w-xs mx-auto py-2 px-4 rounded text-white font-semibold transition duration-200"
                          onClick={() => setIsEndModalOpen(true)}
                        >
                          ✅ Complete the Mission
                        </Button>
                      </div>
                    )}

                    {mode !== "builder" && mission.status !== "Finished" && (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-300">
                          Cancel the mission if it can't be carried out. Use
                          cautiously.
                        </p>
                        <Button
                          className="w-full max-w-xs mx-auto py-2 px-4 border rounded shadow-transparent bg-transparent text-white font-semibold transition duration-200"
                          onClick={() => setIsCancelModalOpen(true)}
                        >
                          ❌ Cancel the Mission
                        </Button>
                      </div>
                    )}

                    {mission.status === "Finished" && (
                      <div className="mt-6 p-4 rounded-md bg-green-900/20 border border-green-700">
                        <p className="text-green-400 font-semibold mb-3">
                          MISSION COMPLETED
                        </p>
                        <div className="flex gap-4 flex-wrap">
                          <Button
                            className="py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm"
                            onClick={handleGenerateCertificates}
                          >
                            📄 Download Certificates
                          </Button>
                          <Button
                            className="py-2 px-4 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                            onClick={(): void => {
                              if (
                                !mission ||
                                !mission.builderInfo ||
                                !mission.appInfo
                              )
                                return;
                              const proofData: MissionProofData = {
                                missionTitle: mission.title,
                                missionDescription: mission.description,
                                appName: mission.appInfo.app_name,
                                appWallet: mission.appInfo.wallet_id,
                                appTwitter: mission.appInfo.app_twitter,
                                builderName: mission.builderInfo.nickname,
                                builderNickname: mission.builderInfo.nickname,
                                builderWallet: mission.builderInfo.wallet_id,
                                reward: mission.reward,
                                status: mission.status,
                                startDate: mission.creation_date
                                  ? new Date(
                                      mission.creation_date
                                    ).toLocaleDateString()
                                  : "N/A",
                                completionDate: new Date().toLocaleDateString(),
                                topicId: mission.appInfo.topic_id || "N/A",
                                transactionHash: mission.contract_address,
                                contractAddress: mission.contract_address,
                                chatMessages: 0,
                              };
                              generateMissionProof(proofData);
                            }}
                          >
                            🔗 Download Mission Proof
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <NFTProofModal
            mode={mode}
            open={isNFTModalOpen}
            onClose={() => setIsNFTModalOpen(false)}
            nftReceipt={mission.nftReceipt || null}
            nftReward={mission.nftReward || null}
            missionTitle={mission.title}
          />
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400">Loading mission details...</p>
        </div>
      )}

      <ConfirmModal
        open={isEndModalOpen}
        error={error}
        loading={loading}
        onCancel={() => setIsEndModalOpen(false)}
        onConfirm={handleEndMission}
        title="Confirm end of mission?"
        description="This action is final. Once validated, the mission will be marked as complete and NFTs will be generated."
        confirmText="Validate"
        cancelText="Cancel"
      />

      <Modal
        title="Cancel Mission"
        open={isCancelModalOpen}
        onCancel={() => {
          setIsCancelModalOpen(false);
        }}
        footer={null}
        centered
      >
        <CancellationForm
          onSubmit={(data) => {
            handleCancelMission(data);
          }}
          onCancel={() => setIsCancelModalOpen(false)}
          appId={mission?.appInfo?.smartcontract_id ?? null}
          builderId={mission?.builderInfo?.smartcontract_id ?? null}
          missionId={missionId}
        />
      </Modal>
      <Modal
        title="Report a Problem"
        open={isReportModalOpen}
        onCancel={() => setIsReportModalOpen(false)}
        footer={null}
        centered
      >
        <CancellationForm
          onSubmit={(data) => {
            handleReportMission(data);
          }}
          onCancel={() => setIsReportModalOpen(false)}
          appId={mission?.appInfo?.smartcontract_id ?? null}
          builderId={mission?.builderInfo?.smartcontract_id ?? null}
          missionId={missionId}
        />
      </Modal>
    </div>
  );
};

export default MissionDetail;
