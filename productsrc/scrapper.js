import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

let URL = "https://copia.co.ke/product-category/all/saleable/baby/";
let NAME_OF_FILE ="baby.json";
let NO_PAGES = 4;

async function scrape(url) {
  const response = await axios.get(url,  { timeout: 5000 });

  if (response.status === 200) {
    const $ = cheerio.load(response.data);

    const products = [];

    $(".product-small").each((i, el) => {
      const title = $(el).find(".woocommerce-LoopProduct-link").text();
      const image = $(el).find("img").attr("data-src");
      const priceText = $(el).find(".amount").first().text();
      const tag = $(el).find(".category").text().trim();

      const priceWithoutCurrency = priceText.replace(/KSh/g, '').replace(/,/g, ''); // Remove "KSh" and any commas
      const price = parseInt(priceWithoutCurrency, 10);

      products.push({ title, price, image, tag });
    });

    return products;
  } else {
    console.log("failed to fetch.");
    return [];
  }
}

async function start() {
  let products = [];
  for (let i = 1; i <= NO_PAGES; i++) {
    console.log(`Scrapping page ${i}...`);

    let url;

    if (i == 1) {
       url = URL;
    } else {
       url = `${URL}/page/${i}`;
    }

    console.log(`Scrapping url ${url}...`);

    const result = await scrape(url);
    products = products.concat(result);
  }

  fs.writeFileSync(`./productsrc/${NAME_OF_FILE}`, JSON.stringify(products));
}

start();
