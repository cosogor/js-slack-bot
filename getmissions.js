const fs = require('fs')
const webdriver = require('selenium-webdriver')
require('chromedriver')
const missionsURL =
  'https://missions-api.alienworlds.io/missions?page%5Blimit%5D=100&page%5Bnumber%5D=0&page%5Border%5D=desc'
let missionsJsonFile = 'missionsJson.json'

async function getMissionsJson(baseUrl) {
  // return missionsJson // comment this line for the prod testing
  const capabilities = {
    platform: 'WIN10',
    browserName: 'chrome',
    version: 'latest',
    name: 'NodeJS Sample Test',
  }

  try {
    let driver = new webdriver.Builder().withCapabilities(capabilities).build()
    await driver.get(baseUrl)
    let element = await driver
      .findElement(webdriver.By.xpath('/html/body/pre'))
      .getAttribute('innerHTML')
    let json = JSON.parse(element)
    await driver.quit()
    console.log('missionsJson: ', element)
    fs.writeFileSync(missionsJsonFile, element)
    console.log('Downloaded file: ' + missionsJsonFile)
    return json
  } catch (e) {
    console.log(e)
  }
}
getMissionsJson(missionsURL)
