const keccak256 = require('keccak256');

interface Data {
    name: string;
    industry: string;
    registration_number: string;
}
function generateSmartContractId(companyData: Data) {
  const companyInfo = `${companyData.name}${companyData.industry}${companyData.registration_number}`;
  
  const companyBuffer = Buffer.from(companyInfo, 'utf-8');
  
  const hash = keccak256(companyBuffer);
  
  const smartContractId = hash.slice(-20).toString('hex');
  
  return `0x${smartContractId}`;
}

export default generateSmartContractId;
