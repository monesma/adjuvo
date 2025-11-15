// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PaySlip {
    struct PayslipData {
        string companyId;    // ID hashé de l'entreprise
        string employeeId;   // ID hashé de l'employé
        string encryptedData;
        uint256 timestamp;
    }

    PayslipData private payslip;
    
    constructor(
        string memory _companyId,
        string memory _employeeId,
        string memory _encryptedData
    ) {
        require(bytes(_companyId).length > 0, "Company ID cannot be empty");
        require(bytes(_employeeId).length > 0, "Employee ID cannot be empty");
        require(bytes(_encryptedData).length > 0, "Encrypted data cannot be empty");
        
        payslip = PayslipData({
            companyId: _companyId,
            employeeId: _employeeId,
            encryptedData: _encryptedData,
            timestamp: block.timestamp
        });
    }

    function getPayslipInfo() external view returns (
        string memory companyId,
        string memory employeeId,
        string memory encryptedData,
        uint256 timestamp
    ) {
        return (
            payslip.companyId,
            payslip.employeeId,
            payslip.encryptedData,
            payslip.timestamp
        );
    }

    function getEncryptedData() external view returns (string memory) {
        return payslip.encryptedData;
    }
}
