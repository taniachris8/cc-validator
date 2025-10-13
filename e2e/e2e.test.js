/* eslint-disable jest/expect-expect */

import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000);

describe("Credit Card Validator form", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      devtools: true,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  let form, input, button;

  beforeEach(async () => {
    await page.goto(baseUrl);
    await page.waitForSelector(".card-validator-form");

    form = await page.$(".card-validator-form");
    input = await form.$(".input");
    button = await form.$(".submit");
  });

  test("should add valid class if card is valid", async () => {
    await input.type("4773913722100048");
    await button.click();
    await page.waitForSelector(".card-validator-form .input.valid");
  });

  test("should add invalid class if card is invalid", async () => {
    await input.type("477391372");
    await button.click();
    await page.waitForSelector(".card-validator-form .input.invalid");
  });
});
