
const geckodriver = require('geckodriver')
const {Builder, By, Key, until} = require('selenium-webdriver');

console.log(geckodriver);

(async function example() {
   let driver = await new Builder()
      .forBrowser('firefox')
      .build();

   await driver.get('https://google.com');
   let element = await driver.findElement(By.name('q'));
   await element.click();
   await element.sendKeys('Hello WebDriver!', Key.RETURN);
   await driver.wait(until.titleContains('Hello WebDriver!'), 1000);
   await driver.quit();

})();
