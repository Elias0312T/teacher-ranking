const levelThresholds = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700];

export function xpForStars(stars: number) {
  const table: Record<number, number> = {
    1: 1,
    2: 2,
    3: 5,
    4: 7,
    5: 10
  };

  return table[stars] ?? 0;
}

export function calculateLevel(xp: number) {
  let level = 1;

  for (let index = 0; index < levelThresholds.length; index += 1) {
    if (xp >= levelThresholds[index]) {
      level = index + 1;
    }
  }

  if (xp > levelThresholds[levelThresholds.length - 1]) {
    const extraXp = xp - levelThresholds[levelThresholds.length - 1];
    level += Math.floor(extraXp / 600);
  }

  return level;
}

export function nextLevelXp(level: number) {
  return (
    levelThresholds[level] ??
    levelThresholds[levelThresholds.length - 1] + (level - levelThresholds.length + 1) * 600
  );
}
