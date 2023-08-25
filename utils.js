const sleep = require('sleep-promise')

async function sleepp(microsecond) {
  console.log('begin')
  await sleep(microsecond) // Ожидание 2 секунды
  console.log('2 sec passed')
}

function sleep(microsecond) {
  let e = new Date().getTime() + microsecond
  while (new Date().getTime() <= e) {}
}
if (require.main === module) {
  let result = main()
}

module.exports = {
  sleepp,
  sleep,
}
