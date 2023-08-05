const sleep = require('sleep-promise')

async function main() {
  console.log('begin')
  await sleep(2000) // Ожидание 2 секунды
  console.log('2 sec passed')
}
function sleeps(microsec) {
  let e = new Date().getTime() + microsec
  while (new Date().getTime() <= e) {}
}
main()
