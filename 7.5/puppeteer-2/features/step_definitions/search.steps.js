const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { getText, clickElement } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("пользователь зашел на сайт", async function () {
  return await this.page.goto(`https://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 20000,
  });
});

When("пользователь выбирает день просмотра кино", async function () {
  return await clickElement(this.page, "a:nth-child(3)");
});

When("пользователь выбирает фильм Микки Маус", async function () {
  return await clickElement(
    this.page,
    '.movie-seances__time[href="#"][data-seance-id="199"]'
  );
});

When("пользователь выбирает фильм Сталкер", async function () {
  return await clickElement(
    this.page,
    ".movie-seances__time[href='#'][data-seance-id='217']"
  );
});

When("пользователь выбирает место", async function () {
  await this.page.goto("https://qamid.tmweb.ru/client/hall.php");
  return await clickElement(this.page, " div:nth-child(5) span:nth-child(7)");
});

When("пользователь выбирает несколько мест", async function () {
  await this.page.goto("https://qamid.tmweb.ru/client/hall.php");
  await clickElement(
    this.page,
    "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)"
  );
  await clickElement(
    this.page,
    "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(2)"
  );
});

When("пользователь выбирает занятое место", async function () {
  await this.page.goto("https://qamid.tmweb.ru/client/hall.php");
  return await clickElement(this.page, "div:nth-child(6) span:nth-child(4)");
});

When("пользователь нажимает кнопку забронировать", async function () {
  return await clickElement(this.page, ".acceptin-button");
});

Then("Загололовок страницы содержит {string}", async function (string) {
  await this.page.goto("https://qamid.tmweb.ru/client/payment.php");
  const actual = await getText(this.page, ".ticket__check-title");
  const expected = await string;
  expect(actual).contain(expected);
});

Then("Список забронированных мест содержит {string}", async function (string) {
  await this.page.goto("https://qamid.tmweb.ru/client/payment.php");
  const actual = await getText(this.page, ".ticket__details.ticket__chairs");
  const expected = await string;
  expect(actual).contain(expected);
});

Then("Проверка активности кнопки забронировать", async function () {
  const button = await this.page.$eval(".acceptin-button", (el) => el.disabled);
  expect(button).to.be.equal(true);
});
