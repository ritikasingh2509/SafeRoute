
export const safetyData = [
  {
    area: "Dwarka",
    incidentRisk: 20,
    lightingRisk: 15,
    publicActivityRisk: 20,
    isolationRisk: 10,
    communityRisk: 15,
    dataType: "SIMULATED"
  },
  {
    area: "Connaught Place",
    incidentRisk: 25,
    lightingRisk: 10,
    publicActivityRisk: 10,
    isolationRisk: 10,
    communityRisk: 20,
    dataType: "SIMULATED"
  },
  {
    area: "India Gate",
    incidentRisk: 15,
    lightingRisk: 20,
    publicActivityRisk: 15,
    isolationRisk: 20,
    communityRisk: 10,
    dataType: "SIMULATED"
  },
  {
    area: "Rohini",
    incidentRisk: 30,
    lightingRisk: 35,
    publicActivityRisk: 30,
    isolationRisk: 25,
    communityRisk: 30,
    dataType: "SIMULATED"
  },
  {
    area: "Janakpuri",
    incidentRisk: 20,
    lightingRisk: 20,
    publicActivityRisk: 25,
    isolationRisk: 15,
    communityRisk: 20,
    dataType: "SIMULATED"
  }
];

export function calculateSafetyScore(data) {
  const weightedRisk =
    data.incidentRisk * 0.30 +
    data.lightingRisk * 0.20 +
    data.publicActivityRisk * 0.15 +
    data.isolationRisk * 0.15 +
    data.communityRisk * 0.20;

  return Math.round(100 - weightedRisk);
}
