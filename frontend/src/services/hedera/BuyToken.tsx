import {
  AccountId,
  TransferTransaction,
  TokenId,
  PrivateKey,
  Client,
} from '@hashgraph/sdk'

export const buyToken = async (
  callerAccountId: string,
  amount: number,
  tokenId: string
) => {
  const ownerAccountId = import.meta.env.VITE_TOKENCREATED_ID
  const ownerPrivateKey = import.meta.env.VITE_TOKENCREATED_KEY

  try {
    const privateKey = PrivateKey.fromString(ownerPrivateKey)

    const client = Client.forTestnet()

    client.setOperator(AccountId.fromString(ownerAccountId), privateKey)

    const transferTransaction = new TransferTransaction()
      .addTokenTransfer(TokenId.fromString(tokenId), ownerAccountId, -amount)
      .addTokenTransfer(TokenId.fromString(tokenId), callerAccountId, amount)

    const frozenTransaction = await transferTransaction.freezeWith(client)

    const signedTransaction = await frozenTransaction.sign(privateKey)

    const executeResult = await signedTransaction.execute(client)

    return { status: 200, result: { executeResult } }
  } catch (err) {
    return { status: 500, err: err }
  }
}
