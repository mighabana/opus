export const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?.,:;'- ".split('');

export const RANDOM_COLORS = [
  'text-red-400',
  'text-yellow-400',
  'text-orange-400',
  'text-green-400',
  'text-blue-400',
  'text-violet-400'
];

export function getRandomColor(probability: number = 0.15): string {
  if (Math.random() < probability) {
    return RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];
  }
  return 'text-amber-50';
}
