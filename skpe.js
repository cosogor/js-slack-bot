const request = require('supertest')
let totalarray = []
function sleep(microsec) {
  let e = new Date().getTime() + microsec
  while (new Date().getTime() <= e) {}
}

async function GetRequest(name, timeout, statusCode, baseUrl) {
  console.log(name + ' ' + baseUrl)
  let date1 = Date.now()
  const response = await request(baseUrl).get('')
  let date2 = Date.now()
  let delay = date2 - date1
  if (delay > timeout) {
    delay = delay + ' ERROR!!!'
  }
  let statusCodeMsg = response.statusCode + '\tEST: ' + statusCode
  if (response.statusCode != statusCode) {
    //ERROR
    statusCodeMsg = statusCodeMsg + ' ERROR!!!'
    return 1
  }
  console.log(' DELAY: ' + (date2 - date1) + '\tCODE: ' + statusCodeMsg)
  return response
}

async function testRarityPoosMining(testId, timeout, statusCode, baseUrl) {
  console.log('TEST STARTED ' + testId)
  let responce = await GetRequest('GET Numbers', 10000, 200, baseUrl)
  if (responce == 1) {
    return responce
  }

  let json = JSON.parse(responce.text)
  let numbers = json.numbers
  for (const number of numbers) {
    if (number == NaN) {
      console.log(json)
      continue
    }
    totalarray.push(number)
  }
  console.table(totalarray)
}

async function main() {
  for (i = 1; i <= 100; i++) {
    await testRarityPoosMining(
      '0001',
      10000,
      200,
      'https://api.skype.com/skype-number/countries/US/suggested-numbers?prefixId=319914'
    )
    sleep(5000)
  }
}

main()
