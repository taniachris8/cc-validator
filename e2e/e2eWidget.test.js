import puppeteer from "puppeteer";
jest.setTimeout(30000);

describe("Form validation", () => {
  let browser;
  let page;

  let form, input, button;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();

    await page.goto("http://localhost:9000/");
    await page.waitForSelector(".card-validator-form");

    form = await page.$(".card-validator-form");
    input = await form.$(".input");
    button = await form.$(".submit");
  });

  afterAll(async () => {
    await browser.close();
  });

  test("should add class valid if card is valid", async () => {
    await input.type("4773913722100048");
    await button.click();
    await page.waitForSelector(".card-validator-form .input.valid");
  });

  test("should add class invalid if card is invalid", async () => {
    await input.type("477391372");
    await button.click();
    await page.waitForSelector(".card-validator-form .input.invalid");
  });
});
