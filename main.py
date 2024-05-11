from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.routing import RequestRedirect
import requests
from bs4 import BeautifulSoup
import sqlite3
import smtplib

app = Flask(__name__)
conn = sqlite3.connect("product_data.db")
cursor = conn.cursor()
cursor.execute(
    """CREATE TABLE IF NOT EXISTS products (
                                    item_name TEXT PRIMARY KEY,
                  price REAL,url TEXT
                )"""
)
conn.commit()


CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5500"}})

sender_email = "heroku2arinsharma@gmail.com"
sender_password = "dimy zttw exkt bfly"
recipient_email = "krishverma0303@gmail.com"

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
            print(url)
            print(item_name)
            print(price)
            return item_name, float(price) ,url 
        else:
            print(f"Failed to extract data from {url}")
            print(item_name_element)
            print(price_element)
            return None, None
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from {url}: {e}")
        return None, None


def store_data(item_name, price,url,emailq):
    conn = sqlite3.connect("product_data.db")
    cursor = conn.cursor()

    cursor.execute("SELECT price FROM products WHERE item_name = ?", (item_name,))
    data = cursor.fetchone()
    if data is None:
        send_email_notification(item_name, price,emailq)
        cursor.execute(
            "INSERT INTO products (item_name, price,url) VALUES (?, ?,?)", (item_name, price,url)
        )
        conn.commit()
    else:
        print(f"Item already exists. Price: {data[0]}")
        if data[0] <= price:
            cursor.execute(
                "UPDATE products SET price=? WHERE item_name=?", (price, item_name)
            )
            conn.commit()
        else:
            drop_notification(item_name, data[0],emailq)

    cursor.close()
    conn.close()


def send_email_notification(item_name, price,emailq):
    message = f"Subject: Set Price Drop Alert Of Product on Flipkart! \n\nThank You For Registering for price drop alert of product :\nItem Name: {item_name}\nPrice at time of registration: ₹{price}"
    message = (message).encode("ascii", "ignore")
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, emailq, message)
        print("hello "+emailq)


def drop_notification(item_name, price,emailq):
    message = f"Subject: Price Dropped Alert Of Product on Flipkart! \n\nItem Name: {item_name}\nPrice: ₹{price}"
    message = (message).encode("ascii", "ignore")
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, emailq, message)

@app.route('/api/scrape_flipkart', methods=['POST'])
def scrape():
    data = request.json
    url = data.get('url')
    scrape_flipkart(url)


@app.route('/api/products', methods=['GET'])
def get_all_products():
    conn = sqlite3.connect("product_data.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM products")
    products = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify({'products': products})


@app.route('/api/products/search', methods=['GET'])
def search_products():
    search_query = request.args.get('q1')
    email_query = request.args.get('q2')
    print(recipient_email)
    if search_query:
        # print(f"hello"+search_query)
        item_name, price,url = scrape_flipkart(search_query)
        if item_name and price and url:
            store_data(item_name, price,url,email_query)
        else:
            print("Something Went Wrong")
        conn = sqlite3.connect("product_data.db")
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM products WHERE item_name LIKE ?", ('%' + search_query + '%',))
        products = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify({'products': products})
    else:
        return jsonify({'message': 'Please provide a search query'}), 400


@app.route('/api/products/track', methods=['POST'])
def track_product():
    data = request.json
    product_url = data.get('url')
    item_name, price = scrape_flipkart(product_url)
    if item_name and price and product_url:
        store_data(item_name, price,product_url)
        return jsonify({'message': 'Product tracked successfully'})
    else:
        return jsonify({'error': 'Failed to track product'}), 500
    
def main():
    product_url = "https://www.flipkart.com/redmi-13c-stardust-black-128-gb/p/itm9b22752239e4d?pid=MOBGW4HKVU4ZGZFZ&lid=LSTMOBGW4HKVU4ZGZFZCHB6WV&marketplace=FLIPKART&q=mobile&store=tyy%2F4io&srno=s_1_6&otracker=search&otracker1=search&iid=bce1c901-875e-4632-b575-384554a7be16.MOBGW4HKVU4ZGZFZ.SEARCH&ssid=6h7n64rj6o0000001714678342362&qH=532c28d5412dd75b"
    item_name, price,url= scrape_flipkart(product_url)
    if item_name and price and url:
        store_data(item_name, price,url,recipient_email)
    else:
        print("Something Went Wrong")




if __name__ == "__main__":
    main()
    app.run(debug=True,port=5000)



    