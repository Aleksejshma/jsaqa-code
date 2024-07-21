const { clickElement, putText, getText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
  await page.setDefaultNavigationTimeout(30000);
});

afterEach(() => {
  page.close();
});

describe("qamid.tmweb.ru/client/index.php тесты", () => {
  test("Бронь одного места в зале", async () => {
    await clickElement(page, "a:nth-child(3)");
    await clickElement(
      page,
      '.movie-seances__time[href="#"][data-seance-id="199"]'
    );
    await page.goto("https://qamid.tmweb.ru/client/hall.php");
    await clickElement(page, " div:nth-child(5) span:nth-child(7)");
    await clickElement(page, ".acceptin-button");
    await page.goto("https://qamid.tmweb.ru/client/payment.php");
    const actual = await getText(page, ".ticket__check-title");
    await expect(actual).toContain("билеты");
  });
  test("Бронь нескольких свободных мест в зале", async () => {
    await clickElement(page, "a:nth-child(3)");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='217']"
    );
    await page.goto("https://qamid.tmweb.ru/client/hall.php");
    await clickElement(
      page,
      "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)"
    );
    await clickElement(
      page,
      "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(2)"
    );
    await clickElement(page, ".acceptin-button");
    await page.goto("https://qamid.tmweb.ru/client/payment.php");
    const actual = await getText(page, ".ticket__details.ticket__chairs");
    await expect(actual).toContain("1/1, 1/2");
  });

  test("Бронь занятого места", async () => {
    await clickElement(page, "a:nth-child(3)");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='217']"
    );
    await page.goto("https://qamid.tmweb.ru/client/hall.php");
    await clickElement(page, "div:nth-child(6) span:nth-child(4)");
    const button = await page.$eval(".acceptin-button", (el) => el.disabled);
    expect(button).toBe(true);
  });
});
