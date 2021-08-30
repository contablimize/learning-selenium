
const assert = require('assert');
const geckodriver = require('geckodriver')
const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
    const gridUrl = 'http://127.0.0.1:4444/wd/hub';
    const capabilities = {
        browserName: 'firefox'
    };
    let timestamp = new Date().getTime();
    let driver = await new Builder()
        .usingServer(gridUrl) 
        .withCapabilities(capabilities)
        .build();
 
    await driver.navigate().to('https://selenium-blog.herokuapp.com/signup');
    
    let username_field = await driver.findElement(By.id('user_username'));
    await username_field.sendKeys(`user ${timestamp}`);

    let email_field = await driver.findElement(By.id('user_email'));
    await email_field.sendKeys(`email${timestamp}@test.com`);

    let password_field = await driver.findElement(By.id('user_password'));
    await password_field.sendKeys('password');

    let submit_buton = await driver.findElement(By.id('submit'));
    await submit_buton.click();

    let banner = await driver.findElement(By.id('flash_success'));
    let banner_text = await banner.getText();

    try {
        assert.strictEqual(banner_text, `Welcome to the alpha blog user ${timestamp}`);
    } finally {
        await driver.quit();
    }
})();
