// eslint-disable-next-line @typescript-eslint/no-require-imports
const keccak256 = require('keccak256');

interface Data {
    firstname: string;
    lastname: string;
    nickname: string;
}
export const generateSmartContractId = (builderData: Data) =>{
  const companyInfo = `${builderData.firstname}${builderData.lastname}${builderData.nickname}`;
  
  const companyBuffer = Buffer.from(companyInfo, 'utf-8');
  
  const hash = keccak256(companyBuffer);
  
  const smartContractId = hash.slice(-20).toString('hex');
  
  return `0x${smartContractId}`;
}
