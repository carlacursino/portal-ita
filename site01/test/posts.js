describe('Test posts', function() {

    const {Builder, By, Key} = require('selenium-webdriver')
    const safari = require('selenium-webdriver/safari')

    before(() => {
        console.info('BEFORE SUITE')
    })

    after(() => {
        console.info('AFTER SUITE')
    })

    beforeEach(() => {
        console.info('BEFORE UNIT')
    })

    afterEach(() => {
        console.info('AFTER UNIT')
    })

    it('Get post', (done) => {

        // (async function () {
        //     let driver

        //     try {
        //         driver = await new Builder()
        //             .forBrowser('safari')
        //             .build()
                
        //         await driver.get('http://localhost:3001')
        //     }
        //     catch(e) {
        //         console.info(e)
        //     }
        //     finally {
        //         if (driver) {
        //             await driver.quit()
        //         }
        //     }
        // })()

        done()
    })

})