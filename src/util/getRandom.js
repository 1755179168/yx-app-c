export default function getRandom(min, max) {
  return Math.floor((max - min) * Math.random() + min);
}
