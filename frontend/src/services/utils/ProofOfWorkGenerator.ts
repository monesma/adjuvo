import jsPDF from "jspdf";

interface MissionProofData {
  missionTitle: string;
  missionDescription: string;
  appName: string;
  builderName: string;
  builderNickname: string;
  reward: number;
  status: string;
  startDate: string;
  completionDate: string;
  topicId: string;
  transactionHash: string;
  contractAddress: string;
}

export const generateMissionProof = (data: MissionProofData): void => {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.width;
  const centerX = pageWidth / 2;

  const primaryColor = [99, 102, 241];
  const successColor = [99, 102, 241];
  const darkColor = [30, 41, 59];
  const lightColor = [100, 116, 139];

  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, pageWidth, 40, "F");

  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1);
  doc.line(20, 38, pageWidth - 20, 38);

  doc.addImage("/Adjuvo-black.png", "PNG", centerX - 15, 12, 30, 12);
  doc.setFontSize(8);
  doc.setTextColor(...lightColor);
  doc.setFont("helvetica", "normal");
  doc.text("Mission Proof", centerX, 28, { align: "center" });

  doc.setFontSize(16);
  doc.setTextColor(...darkColor);
  doc.setFont("helvetica", "bold");
  doc.text(data.missionTitle, centerX, 45, { align: "center" });

  doc.setFontSize(11);
  doc.setTextColor(...successColor);
  doc.setFont("helvetica", "bold");
  doc.text(`Status: ${data.status.toUpperCase()}`, centerX, 58, {
    align: "center",
  });

  let yPosition = 75;

  doc.setFontSize(11);
  doc.setTextColor(...darkColor);
  doc.setFont("helvetica", "bold");
  doc.text("Description:", 20, yPosition);

  doc.setFontSize(10);
  doc.setTextColor(...darkColor);
  doc.setFont("helvetica", "normal");
  const splitDescription = doc.splitTextToSize(
    data.missionDescription,
    pageWidth - 40
  );
  doc.text(splitDescription, 20, yPosition + 8);

  yPosition += 8 + splitDescription.length * 5 + 15;

  const leftColumn = 20;
  const rightColumn = pageWidth / 2 + 10;

  doc.setFontSize(10);
  doc.setTextColor(...darkColor);
  doc.setFont("helvetica", "bold");
  doc.text("Application:", leftColumn, yPosition);
  doc.text("Builder:", leftColumn, yPosition + 12);
  doc.text("Reward:", leftColumn, yPosition + 24);
  doc.text("Timeline:", leftColumn, yPosition + 36);

  doc.setFontSize(9);
  doc.setTextColor(...darkColor);
  doc.setFont("helvetica", "normal");
  doc.text(data.appName, leftColumn + 28, yPosition);
  doc.text(
    `${data.builderName} (${data.builderNickname})`,
    leftColumn + 28,
    yPosition + 12
  );
  doc.text(`${data.reward} HBAR`, leftColumn + 28, yPosition + 24);
  doc.text(
    `${data.startDate} → ${data.completionDate}`,
    leftColumn + 28,
    yPosition + 36
  );

  doc.setFontSize(10);
  doc.setTextColor(...darkColor);
  doc.setFont("helvetica", "bold");
  doc.text("Hedera Data:", rightColumn, yPosition);
  doc.text("Transaction:", rightColumn, yPosition + 12);
  doc.text("Contract:", rightColumn, yPosition + 24);
  doc.text("Topic ID:", rightColumn, yPosition + 36);

  doc.setFontSize(8);
  doc.setTextColor(...darkColor);
  doc.setFont("helvetica", "normal");

  const shortTxHash = data.transactionHash;
  const shortContract = data.contractAddress;

  doc.text(shortTxHash, rightColumn + 28, yPosition + 12);
  doc.text(shortContract, rightColumn + 28, yPosition + 24);
  doc.text(data.topicId, rightColumn + 28, yPosition + 36);

  yPosition += 55;

  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.3);
  doc.line(20, yPosition, pageWidth - 20, yPosition);

  yPosition += 12;

  doc.setFontSize(9);
  doc.setTextColor(...lightColor);
  doc.setFont("helvetica", "italic");
  doc.text(
    "This document serves as proof of work completion on the Hedera network.",
    centerX,
    yPosition,
    { align: "center" }
  );
  doc.text(
    "All transactions are immutably recorded on the Hedera Consensus Service.",
    centerX,
    yPosition + 5,
    { align: "center" }
  );

  const footerY = doc.internal.pageSize.height - 15;

  doc.setFontSize(8);
  doc.setTextColor(...lightColor);
  doc.text(`Generated on ${new Date().toLocaleString()}`, centerX, footerY, {
    align: "center",
  });
  doc.text(
    "Adjuvo Platform - Trusted by Hedera Builders",
    centerX,
    footerY + 5,
    { align: "center" }
  );

  const fileName = `proof-${data.missionTitle
    .toLowerCase()
    .replace(/\s+/g, "-")}-${data.completionDate}.pdf`;
  doc.save(fileName);
};
