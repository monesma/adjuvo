import jsPDF from "jspdf";

interface BuilderCertificateData {
  builderName: string;
  builderNickname: string;
  appName: string;
  missionTitle: string;
  reward: number;
  completionDate: string;
  certificateId: string;
  topicId?: string;
}

export const generateBuilderCertificate = async (
  data: BuilderCertificateData
): Promise<void> => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  const primaryColor = [99, 102, 241];
  const accentColor = [129, 140, 248];
  const goldColor = [165, 180, 252];
  const darkColor = [30, 41, 59];
  const lightColor = [100, 116, 139];

  doc.setFillColor(250, 250, 250);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20, "F");

  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(2);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30, "S");

  const centerX = pageWidth / 2;

  try {
    doc.addImage("/Adjuvo-black.png", "PNG", centerX - 20, 25, 50, 20);
  } catch {
    console.log("Logo not found, using text fallback");
    doc.setFillColor(...primaryColor);
    doc.roundedRect(centerX - 25, 25, 50, 20, 2, 2, "F");
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("ADJUVO", centerX, 37, { align: "center" });
  }

  doc.setDrawColor(...accentColor);
  doc.setLineWidth(1);
  doc.line(centerX - 40, 55, centerX + 40, 55);

  doc.setFontSize(28);
  doc.setTextColor(...darkColor);
  doc.setFont("helvetica", "bold");
  doc.text("BUILDER CERTIFICATE", centerX, 75, { align: "center" });

  doc.setFontSize(14);
  doc.setTextColor(...lightColor);
  doc.setFont("helvetica", "normal");
  doc.text("This certifies that", centerX, 90, { align: "center" });

  doc.setFontSize(24);
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  doc.text(data.builderName, centerX, 105, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor(...lightColor);
  doc.setFont("helvetica", "italic");
  doc.text(`"${data.builderNickname}"`, centerX, 115, { align: "center" });

  doc.setFontSize(14);
  doc.setTextColor(...lightColor);
  doc.setFont("helvetica", "normal");
  doc.text("has successfully completed the mission", centerX, 130, {
    align: "center",
  });

  doc.setFontSize(18);
  doc.setTextColor(...accentColor);
  doc.setFont("helvetica", "bold");

  const missionTitleLines = doc.splitTextToSize(
    `"${data.missionTitle}"`,
    pageWidth - 80
  );
  doc.text(missionTitleLines, centerX, 145, { align: "center" });

  const currentY = 145 + missionTitleLines.length * 6;

  doc.setFontSize(14);
  doc.setTextColor(...lightColor);
  doc.setFont("helvetica", "normal");
  doc.text(`for ${data.appName}`, centerX, currentY + 10, { align: "center" });

  const detailsY = currentY + 25;

  doc.setFontSize(11);
  doc.setTextColor(...darkColor);

  doc.text(`Reward: ${data.reward} HBAR`, centerX - 60, detailsY);
  doc.text(`Completed: ${data.completionDate}`, centerX, detailsY);
  doc.text(`Certificate ID: ${data.certificateId}`, centerX + 60, detailsY);

  if (data.topicId) {
    doc.text(`Hedera Topic: ${data.topicId}`, centerX, detailsY + 6, {
      align: "center",
    });
  }

  const signatureY = detailsY + 20;

  doc.setDrawColor(...goldColor);
  doc.setLineWidth(0.5);
  doc.line(centerX - 40, signatureY, centerX + 40, signatureY);

  doc.setFontSize(9);
  doc.setTextColor(...lightColor);
  doc.text("Certified by Adjuvo - Hedera Ecosystem", centerX, signatureY + 6, {
    align: "center",
  });
  doc.text(
    `Generated on ${new Date().toLocaleDateString()}`,
    centerX,
    signatureY + 12,
    { align: "center" }
  );

  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.rect(18, 18, pageWidth - 36, pageHeight - 36, "S");

  const fileName = `certificate-${data.builderNickname}-${data.certificateId}.pdf`;
  doc.save(fileName);
};
