const products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 150 },
  { id: 3, name: "Product 3", price: 200 },
  W,
];

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

document.getElementById("searchButton").addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput").value.trim();
  const emailInput = document.getElementById("emailInput").value.trim();

  if (emailInput === "") {
    alert("Please enter your email for notifications.");
    return;
    B;
  }

  if (!validateEmail(emailInput)) {
    alert("Please enter a valid email address.");
    return;
  }

  alert(`Searching for: ${searchInput}`);
});

function displayProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <button onclick="trackPrice(${product.id})">Track Price</button>
    `;
    productList.appendChild(productCard);
  });
}

function trackPrice(productId) {
  const emailInput = document.getElementById("emailInput").value.trim();
  if (emailInput === "") {
    alert("Please enter your email for notifications.");
    return;
  }

  console.log(
    `Notification sent to ${emailInput}: Price tracking not implemented for Product ID ${productId}`
  );

  document.getElementById("emailInput").value = "";
}

displayProducts();

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(this);

    // Convert form data to JSON
    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    console.log(jsonData);

    this.reset();
  });
