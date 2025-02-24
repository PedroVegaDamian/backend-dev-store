import { chromium } from 'playwright';

const URL_WEB = 'https://www.eldevstore.com/store';

export async function getDataProducts(query_page: number = 1) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto(`${URL_WEB}/page/${query_page}`);
  await page.waitForSelector('ul.products');

  const data = await page.evaluate(() => {
    const products = document.querySelectorAll('ul.products>li');
    const arrayProducts = Array.from(products);

    const dataProducts = arrayProducts.map((element) => {
      const image = element.querySelector('img')!.src;
      const name = element.querySelector('h2')!.textContent!.trim();
      const category = element
        .querySelector('span.ast-woo-product-category')!
        .textContent!.trim();
      const price = element.querySelector('span.price')!.textContent?.trim();

      return {
        image,
        name,
        category,
        price: Number(price?.slice(3)),
        stock: 100,
      };
    });

    return dataProducts;
  });

  await browser.close();

  return data;
}
