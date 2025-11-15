const keccak256 = require('keccak256');

interface Data {
    firstname: string;
    birthdate: string;
    id_number: string;
}
function generateSmartContractId(employeeData: Data) {
  const companyInfo = `${employeeData.firstname}${employeeData.birthdate}${employeeData.id_number}`;
  
  const companyBuffer = Buffer.from(companyInfo, 'utf-8');
  
  const hash = keccak256(companyBuffer);
  
  const smartContractId = hash.slice(-20).toString('hex');
  
  return `0x${smartContractId}`;
}

export default generateSmartContractId;
