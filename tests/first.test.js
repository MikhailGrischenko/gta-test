const { describe, it, before, after,  } = require('mocha');
const {assert} = require('chai');
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;


const Capabilities = require('selenium-webdriver/lib/capabilities').Capabilities;
// edge, ie, требуют установки в виртуальную машину. safari так же в виртуалку с OSX или под wine виндовая версия.
let browserName = 'chrome'; // firefox || chrome || edge || ie || safari

let capabilities = setCapabilities(browserName);
capabilities.set('marionette', true);

let url = 'http://garagetools.ru/'; // 'http://garagetools.ru/' || 'http://local.gta.ru/' || 'http://gta-???.garagetools.ru/'

const device = {
    iPhone5: {width: 320, height: 568, x: 0, y: 0},
    iPhone678: {width: 375, height: 667, x: 0, y: 0},
    iPhoneX: {width: 375, height: 812, x: 0, y: 0},
    iPad: {width: 768, height: 1024, x: 0, y: 0},
    iPadHorizontal: {width: 1024, height: 768, x: 0, y: 0},
    iPadPro: {width: 1024, height: 1366, x: 0, y: 0},
    galaxyS5: {width: 360, height: 640, x: 0, y: 0},
    desktopXS: {width: 1056, height: 792, x: 0, y: 0},
    desktopS: {width: 1200, height: 628, x: 0, y: 0},
    desktopM: {width: 1280, height: 720, x: 0, y: 0},
    desktopL: {width: 1366, height: 768, x: 0, y: 0},
    desktopXL: {width: 1440, height: 900, x: 0, y: 0},
    desktopXXL: {width: 1600, height: 1200, x: 0, y: 0},
    desktopXXXL: {width: 1920, height: 1080, x: 0, y: 0},
};

let driver;

function setCapabilities(browserName) {
    if (browserName === 'firefox') {
        return Capabilities.firefox();
    }  else if (browserName === 'chrome') {
        return Capabilities.chrome();
    }  else if (browserName === 'edge') {
        return Capabilities.edge()
    }  else if (browserName === 'ie') {
        return Capabilities.ie();
    }  else if (browserName === 'safari') {
        return Capabilities.safari();
    } else {
        return null;
    }
}

before(async() => {
    driver = await new webdriver.Builder().withCapabilities(capabilities).build();
    await driver.manage().window().setRect(device.iPhone5);
    driver.get(url);
});

after(async() => {
    await driver.quit();
});

describe('GarageTools tests', async () => {
    describe('Проверка содержания title на главной', () => {
        it('Ожидание: Профессиональный инструмент для автосервиса и промышленных предприятий', async() => {
            const title = await driver.getTitle();
            assert.equal(title, 'Профессиональный инструмент для автосервиса и промышленных предприятий');
        });
    });
    describe('Проверка тега H1 на главной', () => {
        it('Ожидание: тег H1 найден', async() => {
            const h1 = await driver.findElements({tagName: 'h1'});
            assert(h1.length > 0);
        });
        it('Ожидание: тег H1 найден только один', async() => {
            const arrH1 = await driver.findElements({tagName: 'h1'});
            assert(arrH1.length === 1);
        });
        it('Тег H1 содержит: ГаражТулс удобный поставщик инструмента', async() => {
            const textH1 = await driver.findElement({tagName: 'h1'}).getText();
            assert.equal(textH1, 'ГаражТулс удобный поставщик инструмента', 'Текст совпадает');
        });
    });
    describe('Проверка логина', () => {
        it('Есть меню логина', async() => {
            const customerWelcome = await driver.findElements({className: 'customer-welcome'});
            assert(customerWelcome);
        });
        it('Ьеню логина видно в интерфейсе', async() => {
            let by = By.className('customer-welcome');
            const el = await driver.findElements(by);
            assert(until.elementIsVisible(el));
        });
        // it('В меню логина есть пункт "Регистрация"', async() => {
        //     let by = By.css('.modal-inner-wrap');
        //     const el = await driver.findElements(by).isDisplayed();
        //     assert(el);
        // });
        // it('В меню логина есть пункт "Войти"', async() => {
        //     const arrH1 = await driver.findElements({className: 'customer-welcome'});
        //     assert(arrH1.length === 1);
        // });
        // it('При клике на пункте "Регистрация" открывается модадльное окно регистрации', async() => {
        //     const textH1 = await driver.findElement({tagName: 'h1'}).getText();
        //     assert.equal(textH1, 'ГаражТулс удобный поставщик инструмента', 'Текст совпадает');
        // });
        // it('При клике на пункте "Войти" открывается модадльное окно входа', async() => {
        //     const textH1 = await driver.findElement({tagName: 'h1'}).getText();
        //     assert.equal(textH1, 'ГаражТулс удобный поставщик инструмента', 'Текст совпадает');
        // });
    });
});

