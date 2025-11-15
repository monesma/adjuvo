export const calculateLevel = (score: number): string => {
  if (score >= 10000) return "Singularity Sovereign";
  if (score >= 9000) return "Omni-Reality Shaper";
  if (score >= 8000) return "Quantum Paragon";
  if (score >= 7000) return "Voidline Prophet";
  if (score >= 6000) return "Omni-System Oracle";
  if (score >= 5000) return "Quantum Ghost";
  if (score >= 4200) return "Neural Archon";
  if (score >= 3600) return "Hyperlink Overmind";
  if (score >= 3000) return "Digital Legend";
  if (score >= 2200) return "Cyber Deity";
  if (score >= 1500) return "Matrix Master";
  if (score >= 1000) return "Neon Overlord";
  if (score >= 600) return "Cyber Samurai";
  if (score >= 300) return "Data Dealer";
  if (score >= 100) return "Code Runner";
  return "Beginner";
};
