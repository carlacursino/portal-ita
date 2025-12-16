describe('Test env', () => {

    const {Builder, By, Key, until} = require('selenium-webdriver')
    const safari = require('selenium-webdriver/safari')

    let driver

    before(() => {
        console.info('BEFORE SUITE')
        driver = new Builder()
            .forBrowser('safari')
            .build()
        driver.get('http://google.com')
    })

    after(() => {
        return driver.quit()
    })

    beforeEach(() => {
        console.info('BEFORE UNIT')
    })

    afterEach(() => {
        console.info('AFTER UNIT')
    })

    it('Verify webdriver in safari', () => {

        driver.findElement(By.name('q')).sendKeys('SeleniumJS', Key.RETURN)
        driver.wait(until.titleIs('SeleniumJS - Google Search'), 10000)

        driver.sleep()

    })

})