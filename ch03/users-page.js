const {By} = require('selenium-webdriver');


// css selectors
const SUCCESS_BANNER = 'flash_success';

class UsersPage {
    constructor(driver) {
        this.driver = driver;
    }

    async get_banner_text() {
        return this.driver.findElement(By.id(SUCCESS_BANNER)).then((field) => {
            return field.getText();
        });
    }
}

module.exports = UsersPage;
