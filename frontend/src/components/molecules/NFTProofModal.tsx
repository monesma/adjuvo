import { Modal } from "antd";
import { useState, useEffect } from "react";
import type { StoredNFTInfo, DecodedReceiptMetadata, DecodedRewardMetadata } from "../../types/nft-types";
import { useNFTMinting } from "../../hooks/useNFTMinting";

interface Props {
  mode: string;
  open: boolean;
  onClose: () => void;
  nftReceipt: StoredNFTInfo | null;
  nftReward: StoredNFTInfo | null;
  missionTitle: string;
}

interface ImageErrors {
  receipt: boolean;
  reward: boolean;
}

export const NFTProofModal: React.FC<Props> = ({
  mode,
  open, 
  onClose, 
  nftReceipt, 
  nftReward, 
  missionTitle 
}) => {
  const { decodeReceiptMetadata, decodeRewardMetadata } = useNFTMinting();
  const [receiptDecoded, setReceiptDecoded] = useState<DecodedReceiptMetadata | null>(null);
  const [rewardDecoded, setRewardDecoded] = useState<DecodedRewardMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState<ImageErrors>({
    receipt: false,
    reward: false
  });

  const openHashScan = (tokenId: string, serialNumber: number): void => {
    window.open(`https://hashscan.io/testnet/token/${tokenId}?serial=${serialNumber}`, '_blank');
  };

  const decodeNFTData = async (): Promise<void> => {
    if (!nftReceipt && !nftReward) return;
    
    setLoading(true);
    setImageErrors({ receipt: false, reward: false });
    
    try {
      if (nftReceipt?.metadata) {
        const decoded = decodeReceiptMetadata(nftReceipt.metadata);
        setReceiptDecoded(decoded);
      }
      
      if (nftReward?.metadata) {
        const decoded = decodeRewardMetadata(nftReward.metadata);
        setRewardDecoded(decoded);
      }
    } catch (error: unknown) {
      console.error("Error decoding NFT metadata:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      decodeNFTData();
    } else {
      setReceiptDecoded(null);
      setRewardDecoded(null);
      setImageErrors({ receipt: false, reward: false });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, nftReceipt, nftReward]);

  const handleImageError = (type: 'receipt' | 'reward'): void => {
    setImageErrors(prev => ({ ...prev, [type]: true }));
  };

  const DEFAULT_NFT_IMAGE = "https://bafybeibh2mx2icnq4i5qpxw2n6tr5fjztrgk44hql7fu2smdemooy3yl5i.ipfs.w3s.link/nft-adjuvo.png";

  const getReceiptImageUrl = (): string => {
    if (imageErrors.receipt) return getFallbackImage('💰 Receipt', 'green');
    return receiptDecoded?.imageUrl || DEFAULT_NFT_IMAGE;
  };

  const getRewardImageUrl = (): string => {
    if (imageErrors.reward) return getFallbackImage('🏆 Badge', 'purple');
    return rewardDecoded?.imageUrl || DEFAULT_NFT_IMAGE;
  };

  const getFallbackImage = (text: string, color: string): string => {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231f2937'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='12' fill='%23${color === 'green' ? '00ff00' : 'a855f7'}'%3E${encodeURIComponent(text)}%3C/text%3E%3C/svg%3E`;
  };

  // Fonction pour afficher les informations avec fallback
  const displayReceiptInfo = (field: keyof DecodedReceiptMetadata, fallback?: string) => {
    if (!receiptDecoded) return fallback || 'N/A';
    
    const value = receiptDecoded[field];
    if (field === 'missionId' && receiptDecoded.originalMissionId) {
      return receiptDecoded.originalMissionId || value;
    }
    if (field === 'from' && receiptDecoded.originalFrom) {
      return receiptDecoded.originalFrom || value;
    }
    if (field === 'to' && receiptDecoded.originalTo) {
      return receiptDecoded.originalTo || value;
    }
    return value || fallback || 'N/A';
  };

  const displayRewardInfo = (field: keyof DecodedRewardMetadata, fallback?: string) => {
    if (!rewardDecoded) return fallback || 'N/A';
    
    const value = rewardDecoded[field];
    if (field === 'missionId' && rewardDecoded.originalMissionId) {
      return rewardDecoded.originalMissionId || value;
    }
    if (field === 'rewardType' && rewardDecoded.originalRewardType) {
      return rewardDecoded.originalRewardType || value;
    }
    return value || fallback || 'N/A';
  };

  return (
    <Modal
      title={`🎁 NFT Proofs - ${missionTitle}`}
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={800}
    >
      <div className="space-y-6">
        {loading && (
          <div className="text-center py-4">
            <p className="text-gray-400">Decoding NFT data...</p>
          </div>
        )}

        <div className="flex gap-4 p-4 rounded-lg border border-green-700 bg-green-900/20">
          <div className="flex-1">
            <h3 className="text-green-400 font-semibold text-lg mb-3">💰 Payment Receipt</h3>
            {nftReceipt && nftReceipt.tokenId ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <strong>Token ID:</strong>
                    <div className="truncate">{nftReceipt.tokenId}</div>
                  </div>
                  <div>
                    <strong>Serial #:</strong>
                    <div>{nftReceipt.serialNumber}</div>
                  </div>
                  <div>
                    <strong>Transaction:</strong>
                    <div className="truncate">{nftReceipt.transactionId}</div>
                  </div>
                  <div>
                    <strong>Status:</strong>
                    <div className="text-green-400">✓ On Blockchain</div>
                  </div>
                </div>

                {receiptDecoded && (
                  <div className="mt-3 p-3 bg-black/30 rounded border border-gray-700">
                    <h4 className="font-semibold text-green-300 mb-2">Payment Details:</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><strong>From:</strong> {displayReceiptInfo('from')}</div>
                      <div><strong>To:</strong> {displayReceiptInfo('to')}</div>
                      <div><strong>Amount:</strong> {receiptDecoded.amount} HBAR</div>
                      <div><strong>Mission:</strong> {displayReceiptInfo('missionId')}</div>
                      <div><strong>Topic:</strong> {displayReceiptInfo('topicId')}</div>
                      <div><strong>Date:</strong> {new Date(receiptDecoded.timestamp).toLocaleString()}</div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => openHashScan(nftReceipt.tokenId, nftReceipt.serialNumber)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
                >
                  🔍 View on HashScan
                </button>
              </div>
            ) : (
              <p className="text-yellow-400">No receipt NFT minted for this mission</p>
            )}
          </div>

          <div className="flex-shrink-0 w-32 h-32 flex items-center justify-center">
            {!loading && (
              <img 
                src={getReceiptImageUrl()}
                alt="Payment Receipt NFT"
                className="w-full h-full object-cover rounded-lg border-2 border-green-500"
                onError={() => handleImageError('receipt')}
                key={`receipt-${receiptDecoded?.imageUrl}`}
              />
            )}
          </div>
        </div>

        {mode !== "builder" && (
          <div className="flex gap-4 p-4 rounded-lg border border-purple-700 bg-purple-900/20">
            <div className="flex-1">
              <h3 className="text-purple-400 font-semibold text-lg mb-3">🏆 Achievement Badge</h3>
              {nftReward && nftReward.tokenId ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <strong>Token ID:</strong>
                      <div className="truncate">{nftReward.tokenId}</div>
                    </div>
                    <div>
                      <strong>Serial #:</strong>
                      <div>{nftReward.serialNumber}</div>
                    </div>
                    <div>
                      <strong>Transaction:</strong>
                      <div className="truncate">{nftReward.transactionId}</div>
                    </div>
                    <div>
                      <strong>Status:</strong>
                      <div className="text-green-400">✓ On Blockchain</div>
                    </div>
                  </div>

                  {rewardDecoded && (
                    <div className="mt-3 p-3 bg-black/30 rounded border border-gray-700">
                      <h4 className="font-semibold text-purple-300 mb-2">Achievement Details:</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><strong>Type:</strong> {displayRewardInfo('rewardType')}</div>
                        <div><strong>Level:</strong> {rewardDecoded.level}</div>
                        <div><strong>Mission:</strong> {displayRewardInfo('missionId')}</div>
                        <div><strong>App:</strong> {rewardDecoded.originalAppName || 'N/A'}</div>
                        <div><strong>Builder:</strong> {rewardDecoded.originalBuilderName || 'N/A'}</div>
                        <div><strong>Date:</strong> {new Date(rewardDecoded.timestamp).toLocaleString()}</div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => openHashScan(nftReward.tokenId, nftReward.serialNumber)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-semibold"
                  >
                    🔍 View on HashScan
                  </button>
                </div>
              ) : (
                <p className="text-yellow-400">No reward NFT minted for this mission</p>
              )}
            </div>

            <div className="flex-shrink-0 w-32 h-32 flex items-center justify-center">
              {!loading && (
                <img 
                  src={getRewardImageUrl()}
                  alt="Achievement Badge NFT"
                  className="w-full h-full object-cover rounded-lg border-2 border-purple-500"
                  onError={() => handleImageError('reward')}
                  key={`reward-${rewardDecoded?.imageUrl}`}
                />
              )}
            </div>
          </div>
        )}

        <div className="p-3 rounded border border-blue-700">
          <p className="text-blue-700 text-sm">
            💡 <strong>Note:</strong> These NFTs serve as immutable proof of mission completion and payment on the Hedera network.
            The decoded data shows the actual mission information stored in the NFT metadata.
          </p>
        </div>
      </div>
    </Modal>
  );
};