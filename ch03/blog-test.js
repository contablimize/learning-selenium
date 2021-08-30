
const assert = require('assert');
const geckodriver = require('geckodriver')
const {Builder} = require('selenium-webdriver');
const SignupPage = require('./signup-page');
const UsersPage = require('./users-page');


let timestamp = new Date().getTime();
let username = `user ${timestamp}`;
let email = `email${timestamp}@test.com`;
let password = 'password';
let expected_banner_text = `Welcome to the alpha blog user ${timestamp}`;

(async function example() {
    let driver = await new Builder()
       .forBrowser('firefox')
       .build();

    let signup_page = new SignupPage(driver);
    let users_page = new UsersPage(driver);

    await driver.navigate().to('https://selenium-blog.herokuapp.com/signup');
    
    await signup_page.enter_username(username);
    await signup_page.enter_email_address(email);
    await signup_page.enter_password(password);
    await signup_page.submit_form();
    let banner_text = await users_page.get_banner_text();

    try {
        assert.strictEqual(banner_text, expected_banner_text);
    } finally {
        await driver.quit();
    }
})();
