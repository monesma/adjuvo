export interface PointsCalculationConfig {
  basePoints: number;
  tiers: {
    minReward: number;
    maxReward: number;
    multiplier: number;
  }[];
  maxPointsPerMission: number;
}

export const defaultPointsConfig: PointsCalculationConfig = {
  basePoints: 10,
  tiers: [
    { minReward: 0, maxReward: 10, multiplier: 1.0 },
    { minReward: 10, maxReward: 50, multiplier: 1.2 },
    { minReward: 50, maxReward: 100, multiplier: 1.5 },
    { minReward: 100, maxReward: 500, multiplier: 2.0 },
    { minReward: 500, maxReward: Infinity, multiplier: 3.0 }
  ],
  maxPointsPerMission: 100
};


export const calculateMissionPoints = (
  reward: number,
  config: PointsCalculationConfig = defaultPointsConfig
): number => {
  const tier = config.tiers.find(
    t => reward >= t.minReward && reward < t.maxReward
  ) || config.tiers[0];

  let points = config.basePoints * tier.multiplier;

  const rewardBonus = Math.floor(reward * 0.1);
  points += rewardBonus;

  points = Math.min(points, config.maxPointsPerMission);

  points = Math.max(points, config.basePoints);

  return Math.round(points);
};


export const calculatePointsForBoth = (
  reward: number,
  config: PointsCalculationConfig = defaultPointsConfig
): { builderPoints: number; appPoints: number } => {
  const basePoints = calculateMissionPoints(reward, config);

  const appPoints = Math.round(basePoints * 0.8);

  return {
    builderPoints: Math.max(appPoints, config.basePoints),
    appPoints: Math.max(appPoints, config.basePoints)
  };
};