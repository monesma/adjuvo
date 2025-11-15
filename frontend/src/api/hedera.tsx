import axios from "axios"
import { decryptObject } from "../helpers/decryptObject";
import { Buffer } from "buffer";

const urlapi = 'https://testnet.mirrornode.hedera.com'
//const mainnetUrl = 'https://mainnet.mirrornode.hedera.com'
const binanceApiUrl = 'https://api.binance.com/api/v3/ticker/price';

export const getWalletFromProject = async (id: string) => {
    return axios.get(`${urlapi}/api/v1/accounts/${id}`)
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}

export const getHbarPrice = async () => {
  try {
    const response = await axios.get(binanceApiUrl, {
      params: {
        symbol: 'HBARUSDT',
      },
    });

    const hbarPrice = parseFloat(response.data.price);
    if (isNaN(hbarPrice) || hbarPrice <= 0) {
      return null;
    }
    return hbarPrice;
  } catch (err) {
    return null;
  }
};

export const getUsdcPrice = async () => {
  try {
    const response = await axios.get(binanceApiUrl, {
      params: {
        symbol: 'USDCUSDT',
      },
    });

    const usdcPrice = parseFloat(response.data.price);
    if (isNaN(usdcPrice) || usdcPrice <= 0) {
      return null;
    }
    return usdcPrice;
  } catch (err) {
    return null;
  }
};

export const fetchMessageByTxId = async (topicId: string, transactionId: string) => {
  const [, timestamp] = transactionId.split("@")
  const url = `https://testnet.mirrornode.hedera.com/api/v1/topics/${topicId}/messages?timestamp=gte:${timestamp}`
  const res = await fetch(url)

  if (!res.ok) throw new Error("Failed to fetch messages from Mirror Node")

  const data = await res.json()
  const allMessages = data.messages
  if (!allMessages || allMessages.length === 0) throw new Error("No messages found")

  // Chercher tous les chunks ayant le même initial_transaction_id
  const initialTxId = allMessages[0].chunk_info?.initial_transaction_id?.transaction_valid_start
  const chunks = allMessages.filter(
    (msg: any) =>
      msg.chunk_info?.initial_transaction_id?.transaction_valid_start === initialTxId
  )
  if (chunks.length === 0) throw new Error("No message chunks found")

  await chunks.sort((a: any, b: any) => a.chunk_info.number - b.chunk_info.number)
  
  const fullMessageBuffer = Buffer.concat(
    chunks.map((c: any) => Buffer.from(c.message, "base64"))
  )
  const raw = fullMessageBuffer.toString("utf-8");
  
  const parsed = JSON.parse(raw);
  const decrypted = await decryptObject(parsed.encrypted)
  
  return {
    status: 200,
    consensusTimestamp: chunks[0].consensus_timestamp,
    appId: parsed.appId,
    builderId: parsed.builderId,
    timestamp: parsed.timestamp,
    data: decrypted,
  }
}
