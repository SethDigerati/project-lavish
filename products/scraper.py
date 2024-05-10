import requests
from bs4 import BeautifulSoup
#import products from the website: https://www.asos.com/men/ctas/core-promos/promo-1/cat/?cid=50678&ctaref=hp|mw|promo|banner|1|edit|generic
url = "https://www.asos.com/men/ctas/core-promos/promo-1/cat/?cid=50678&ctaref=hp|mw|promo|banner|1|edit|generic"

# url = "https://shopit.co.ke/"


response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')
    product_names = []

    # Extract product names
    product_elements = soup.find_all(class_='lazyloaded')
    for element in product_elements:
        product_names.append(element.text.strip())

    print(product_names)
else:
    print("Failed to fetch webpage:", response.status_code)

