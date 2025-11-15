// eslint-disable-next-line @typescript-eslint/no-require-imports
const keccak256 = require('keccak256');

interface Data {
    app_name: string;
    app_twitter: string;
    email: string;
}
export const generateSmartContractId = (hederaAppData: Data) => {
  const builderInfo = `${hederaAppData.app_name}${hederaAppData.app_twitter}${hederaAppData.email}`;
  
  const builderBuffer = Buffer.from(builderInfo, 'utf-8');
  
  const hash = keccak256(builderBuffer);
  
  const smartContractId = hash.slice(-20).toString('hex');
  
  return `0x${smartContractId}`;
}


