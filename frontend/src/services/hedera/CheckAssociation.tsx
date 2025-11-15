import { 
  AccountId, 
  TokenId, 
  Client, 
  TokenAssociateTransaction 
} from "@hashgraph/sdk";

export const checkAssociation = async (
  accountId: string, 
  tokenId: string, 
  signer: unknown
) => {
  try {
    const client = Client.forTestnet();
    
    const tokenAssociateTransaction = new TokenAssociateTransaction()
      .setAccountId(AccountId.fromString(accountId))
      .setTokenIds([TokenId.fromString(tokenId)]);

    const freezeTransaction = await tokenAssociateTransaction.freezeWith(client);
    const signedTransaction = await freezeTransaction.sign(signer.privateKey);
    
    const executeResult = await signedTransaction.execute(client);
    const receipt = await executeResult.getReceipt(client);
    console.log(receipt)
    return { 
      status: 200, 
      result: receipt 
    };
  } catch (err: unknown) {
    if (err.toString().includes('ACCOUNT_ALREADY_ASSOCIATED')) {
      return { 
        status: 200, 
        message: "Token already associated" 
      };
    }
    
    return { 
      status: 500, 
      err: err 
    };
  }
};