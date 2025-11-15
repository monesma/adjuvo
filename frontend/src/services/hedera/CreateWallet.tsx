import {
  Client,
  PrivateKey,
  Hbar,
  AccountCreateTransaction,
  TokenAssociateTransaction,
  TokenId,
} from '@hashgraph/sdk'

const client = Client.forTestnet()

const operatorId = import.meta.env.VITE_MY_ACCOUNT_ID || ''
const operatorKey = import.meta.env.VITE_PRIVATE_KEY || ''


if (!operatorId || !operatorKey) {
  throw new Error(
    'Hedera operator ID or key is not set in environment variables'
  )
}

try {
  client.setOperator(operatorId, PrivateKey.fromString(operatorKey))
} catch (error) {
  console.error('Failed to set operator:', error)
}

export const CreateWallet = async () => {
  try {
    const newAccountPrivateKey = PrivateKey.generateED25519()
    const newAccountPublicKey = newAccountPrivateKey.publicKey

    const newAccount = await new AccountCreateTransaction()
      .setKey(newAccountPublicKey)
      .setInitialBalance(new Hbar(10))
      .execute(client)

    const getReceipt = await newAccount.getReceipt(client)
    const newAccountId = getReceipt.accountId

    if (!newAccountId) {
      throw new Error('Failed to create new account')
    }

    const associateTransaction = await new TokenAssociateTransaction()
      .setAccountId(newAccountId)
      .setTokenIds([
        TokenId.fromString("0.0.5269350"), 
        TokenId.fromString("0.0.5269355")
      ])
      .freezeWith(client)

    const signedAssociateTransaction = await associateTransaction.sign(newAccountPrivateKey)

    const associateTransactionResponse = await signedAssociateTransaction.execute(client)
    const associateReceipt = await associateTransactionResponse.getReceipt(client)

    if (associateReceipt.status.toString() !== 'SUCCESS') {
      throw new Error('Token association failed')
    }

    return {
      accountId: newAccountId.toString(),
      privateKey: newAccountPrivateKey.toString(),
      publicKey: newAccountPublicKey.toString(),
    }
  } catch (err: unknown) {
    throw new Error(err)
  }
}