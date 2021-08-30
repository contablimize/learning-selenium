const {By} = require('selenium-webdriver');


// css selectors
const USERNAME_FIELD = 'user_username';
const EMAIL_FIELD = 'user_email';
const PASSWORD_FIELD = 'user_password';
const SUBMIT_BUTTON = 'submit';

class SignupPage {
    constructor(driver) {
        this.driver = driver;
    }

    async enter_field(id, text) {
        return this.driver.findElement(By.id(id)).then((field) => {
            return field.sendKeys(text);
        });
    }

    async enter_username(username) {
        return this.enter_field(USERNAME_FIELD, username);
    }
    async enter_email_address(email) {
        return this.enter_field(EMAIL_FIELD, email);
    }
    async enter_password(password) {
        return this.enter_field(PASSWORD_FIELD, password);
    }

    async submit_form() {
        return this.driver.findElement(By.id(SUBMIT_BUTTON)).then((button) => {
            return button.click();
        });
    }
}

module.exports = SignupPage;
