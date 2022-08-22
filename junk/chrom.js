const fs = require('fs');
// const webdriver = require('selenium-webdriver');
//  const chrome = require('selenium-webdriver/chrome');
//
// async function start() {
//     let options = new chrome.Options();
//     // options.setChromeBinaryPath(chromium.path);
//     //options.addArguments('--headless');
//     options.addArguments('--disable-gpu');
//     options.addArguments('--window-size=1280,960');
//
//     const driver = await new webdriver.Builder()
//         .forBrowser('chrome')
//         .setChromeOptions(options)
//         .build();
//
//     await driver.get('https://missions-api.alienworlds.io/missions?page%5Blimit%5D=100&page%5Bnumber%5D=0&page%5Border%5D=desc');
//     console.log('Hello Google!');
//     await takeScreenshot(driver, 'google-start-page');
//     driver.findElement(webdriver.By.name('q')).sendKeys('webdriver\n')
// //    element = await driver.find_element_by_xpath('//*')
// //    element = await element.get_attribute('innerHTML')
//     await driver.quit();
// }
//
// async function takeScreenshot(driver, name) {
//     await driver.takeScreenshot().then((data) => {
//         fs.writeFileSync(name + '.png', data, 'base64');
//         console.log('Screenshot is saved');
//     });
// }

// start();




const webdriver = require('selenium-webdriver');
require('chromedriver');

const capabilities = {
    'platform' : 'WIN10',
    'browserName' : 'chrome',
    'version' : 'latest',
    'name': 'NodeJS Sample Test'
}
async function runTest () {
    let driver = new webdriver.Builder()
        .withCapabilities(capabilities)
        .build();
    await driver.get("https://www.google.com/ncr");
    const inputField = await driver.findElement(webdriver.By.name("q"));
    await inputField.sendKeys("TestingBot", webdriver.Key.ENTER);
    try {
        await driver.wait(webdriver.until.titleMatches(/TestingBot/i), 5000);
    } catch (e) {
        await inputField.submit();
    }
    try {
        await driver.wait(webdriver.until.titleMatches(/TestingBot/i), 5000);
        console.log(await driver.getTitle());
    } catch (e) {
        console.error(e);
    }
    await driver.quit();
}
 runTest();
