export function getRandomIntager(len: number = 6) {
  if (Number.isNaN(len)) {
    len = 6;
  }
  let num = Math.random().toString().slice(len * -1);
  if (num.length < len) {
    for (let i = 0, limit = num.length - len; i < limit; i++) {
      num = '0' + num;
    }
  }
  return num;
}