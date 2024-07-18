let page;
describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });

  afterEach(() => {
    page.close();
  });
  test("The h1 header content'", async () => {
    await page.waitForTimeout(4000);
    const firstLink = await page.$("header div div a");
    await firstLink.click();

    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Where the world builds software · GitHub");
  });

  test("The first link attribute", async () => {
    await page.waitForTimeout(4000);
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    await page.waitForTimeout(4000);
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free");
  });
});

test("Проверка гланого заголовка для https://github.com'", async () => {
  page = await browser.newPage();
  await page.goto("https://github.com");
  const title = await page.title();
  expect(title).toEqual("GitHub: Let’s build from here · GitHub");
  await page.close();
});
test("Проверка гланого заголовка для https://github.com/sponsors'", async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/sponsors");
  const title = await page.title();
  expect(title).toEqual("GitHub Sponsors · GitHub");
  await page.close();
});
test("Проверка гланого заголовка для https://github.com/pricing'", async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/pricing");
  const title = await page.title();
  expect(title).toEqual("Pricing · Plans for every developer · GitHub");
  await page.close();
});
