//growthStage is updated based on growthProgress:
  // 0–2 → seed
  // 2–5 → seedling
  // 5–10 → young
  // 10+ → mature

export function growthStage(unit) {
    if(unit<=2) return 'seed';
    else if(unit>2 && unit<=5) return 'seedling';
    else if(unit>5 && unit<=10) return 'young';
    else return 'mature';
}
