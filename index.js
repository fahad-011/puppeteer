const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();
  await page.goto(
    "https://www.amazon.com/s?k=amaznbasics&crid=2KKW6AT3UQID8&sprefix=amaznbasic%2Caps%2C314&ref=nb_sb_noss"
  );

  const productsHandles = await page.$$(
    "div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
  );

  for (const producthandle of productsHandles) {
    try {
      const title = await page.evaluate(
        (el) => el.querySelector("h2 > a > span").textContent,
        producthandle
      );

      const price = await page.evaluate(
        (el) => el.querySelector(".a-price > .a-offscreen").textContent,
        producthandle
      );

      const img = await page.evaluate(
        (el) => el.querySelector(".s-image").getAttribute("src"),
        producthandle
      );

      console.log(img);
    } catch (error) {}
  }

  // await browser.close();
})();
