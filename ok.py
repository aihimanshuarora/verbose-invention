
import requests
from bs4 import BeautifulSoup
import sqlite3
import smtplib


conn = sqlite3.connect("product_data.db")
cursor = conn.cursor()
cursor.execute(
    """CREATE TABLE IF NOT EXISTS products (
                                    item_name TEXT PRIMARY KEY,
                  price REAL,url TEXT
                )"""
)
conn.commit()



sender_email = "heroku2arinsharma@gmail.com"
sender_password = "dimy zttw exkt bfly"
recipient_email = "ai.himanshuarora@gmail.com"

def scrape_flipkart(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        item_name_element = soup.find("span", class_="VU-ZEz")
        price_element = soup.find("div", class_="Nx9bqj CxhGGd")
        
        if item_name_element and price_element :
            item_name = item_name_element.text.strip()
            price = price_element.text.strip().replace("₹", "").replace(",", "")
            return item_name, float(price)  # Convert price to float
        else:
            print(f"Failed to extract data from {url}")
            return None, None
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from {url}: {e}")
        return None, None


def store_data(item_name, price,url):
    conn = sqlite3.connect("product_data.db")
    cursor = conn.cursor()

    cursor.execute("SELECT price FROM products WHERE item_name = ?", (item_name,))
    data = cursor.fetchone()
    if data is None:
        cursor.execute(
            "INSERT INTO products VALUES (?, ?,?)", (item_name, price,url)
        )
        send_email_notification(item_name, price)
        conn.commit()
    else:
        print(f"Item already exists. Price: {data[0]}")
        if data[0] <= price:
            cursor.execute(
                "UPDATE products SET price=? WHERE item_name=?", (price, item_name)
            )
            conn.commit()
        else:
            drop_notification(item_name, data[0])

    cursor.close()
    conn.close()


def send_email_notification(item_name, price):
    message = f"Subject: Set Price Drop Alert Of Product on Flipkart! \n\nThank You For Registering for price drop alert of product :\nItem Name: {item_name}\nPrice at time of registration: ₹{price}"
    message = (message).encode("ascii", "ignore")
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, recipient_email, message)


def drop_notification(item_name, price):
    message = f"Subject: Price Dropped Alert Of Product on Flipkart! \n\nItem Name: {item_name}\nPrice: ₹{price}"
    message = (message).encode("ascii", "ignore")
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, recipient_email, message)





    
def main():
    product_url = "https://www.flipkart.com/lenovo-27-inch-full-hd-va-panel-tuv-eye-care-monitor-d27-40-d27-30/p/itm20eeaca295f0b?pid=MONFXZREMZYTJGNG&lid=LSTMONFXZREMZYTJGNGYRB0VL&marketplace=FLIPKART&store=6bo%2Fg0i%2F9no&srno=b_1_1&otracker=browse&otracker1=hp_rich_navigation_PINNED_neo%2Fmerchandising_NA_NAV_EXPANDABLE_navigationCard_cc_3_L2_view-all&iid=en_E3uY_R9B8F3wYR4Q14hwS6JDc_Cor713U0G0gu8U50OIPvt0S1p7tPvPwx9kMLPkG__6CV3cHnOeP0ZKXNtGHPUFjCTyOHoHZs-Z5_PS_w0%3D&ssid=512ilvmhnk0000001713502809303"
    item_name, price = scrape_flipkart(product_url)
    if item_name and price and product_url:
        store_data(item_name, price,product_url)
    else:
        print("Something Went Wrong")




if __name__ == "__main__":
    main();




    