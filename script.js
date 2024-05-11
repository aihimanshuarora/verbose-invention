// // Sample product data (replace with actual data from backend)
// // Function to fetch products based on search query from the backend
// async function fetchAllProducts() {
//   try {
//     const response = await fetch('/api/products');
//     if (!response.ok) {
//       throw new Error('Failed to fetch products');
//     }
//     const data = await response.json();
//     return data.products;
//   } catch (error) {
//     console.error('Error fetching products:', error.message);
//     return [];
//   }
// }

// async function searchProducts(searchQuery) {
//   try {
//     const response = await fetch(`/api/products/search?q=${searchQuery}`);
//     if (!response.ok) {
//       throw new Error('Failed to search products');
//     }
//     const data = await response.json();
//     return data.products;
//   } catch (error) {
//     console.error('Error searching products:', error.message);
//     return [];
//   }
// }

// // Function to track a product by sending its URL to the backend
// async function trackProduct(productUrl) {
//   try {
//     const response = await fetch('/api/products/track', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ url: productUrl })
//     });
//     if (!response.ok) {
//       throw new Error('Failed to track product');
//     }
//     const data = await response.json();
//     console.log(data.message); // Log success message
//   } catch (error) {
//     console.error('Error tracking product:', error.message);
//   }
// }

// // Function to display products on the page
// function displayProducts() {
//     const productList = document.getElementById("product-list");
//     productList.innerHTML = ""; // Clear previous content
  
//     products.forEach((product) => {
//       const productCard = document.createElement("div");
//       productCard.classList.add("product-card");
//       productCard.innerHTML = `
//         <h3>${product.item_name}</h3>
//         <p>Price: $${product.price}</p>
//         <button onclick="trackPrice(${product.id})">Track Price</button>
//       `;
//       productList.appendChild(productCard);
//     });
//   }
  
//   // Function to track price (sample function, implement actual functionality)
//   function trackPrice(productId) {
//     const emailInput = document.getElementById("emailInput").value;
//     if (emailInput.trim() === "") {
//       alert("Please enter your email for notifications.");
//       return;
//     }
  
//     // Simulating sending notification to console (replace with actual notification logic)
//     console.log(
//       "Notification sent to ${emailInput}: Price tracking not implemented for Product ID ${productId}"
//     );
//   }
  
//   // Event listener for search button
//   document.getElementById("searchButton").addEventListener("click", async () => {
//     const searchInput = document.getElementById("searchInput").value;
//     const filteredProducts = await searchProducts(searchInput);
//   displayFilteredProducts(filteredProducts);
//     // Perform search functionality (not implemented in this example)
//     alert("Searching for: ${searchInput}");
//   });
//   // Function to display filtered products
// function displayFilteredProducts(filteredProducts) {
//   const productList = document.getElementById("product-list");
//   productList.innerHTML = ""; // Clear previous content

//   filteredProducts.forEach((product) => {
//     const productCard = document.createElement("div");
//     productCard.classList.add("product-card");
//     productCard.innerHTML = `
//       <h3>${product.item_name}</h3>
//       <p>Price: $${product.price}</p>
//       <button onclick="trackPrice(${product.id})">Track Price</button>
//     `;
//     productList.appendChild(productCard);
//   });
// }
//   // Initial display of products on page load
//   displayProducts();
// Function to fetch all products from the backend

// const baseURL = 'http://127.0.0.1:5000';

// async function scrape(url) {
//   try {
//       const response = await fetch('http://127.0.0.1:5000/api/scrape', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ url: url })
//       });
//       if (!response.ok) {
//           throw new Error('Failed to scrape data');
//       }
//       const data = await response.json();
//       // Process the scraped data as needed
//       console.log(data); // Example: log the scraped data to the console
//   } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to scrape data');
//   }
// }


// async function fetchAllProducts() {
//   try {
//     const response = await fetch(baseURL+ '/api/products');
//     if (!response.ok) {
//       throw new Error('Failed to fetch products');
//     }
//     const data = await response.json();
//     return data.products;
//   } catch (error) {
//     console.error('Error fetching products:', error.message);
//     return [];
//   }
// }

// // Function to fetch products based on search query from the backend
// async function searchProducts(searchQuery) {
//   try {
//     const response = await fetch( baseURL+`/api/products/search?q=${searchQuery}`);
//     if (!response.ok) {
//       throw new Error('Failed to search products');
//     }
//     const data = await response.json();
//     return data.products;
//   } catch (error) {
//     console.error('Error searching products:', error.message);
//     return [];
//   }
// }

// // Function to track a product by sending its URL to the backend
// async function trackProduct(productUrl) {
//   try {
//     const response = await fetch( baseURL+'/api/products/track', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ url: productUrl })
//     });
//     if (!response.ok) {
//       throw new Error('Failed to track product');
//     }
//     const data = await response.json();
//     console.log(data.message); // Log success message
//   } catch (error) {
//     console.error('Error tracking product:', error.message);
//   }
// }

// // Function to display products on the frontend
// async function displayProducts() {
//   const productList = document.getElementById("product-list");
//   productList.innerHTML = ""; // Clear previous content

//   const products = await fetchAllProducts();
//   products.forEach((product) => {
//     const productCard = document.createElement("div");
//     productCard.classList.add("product-card");
//     productCard.innerHTML = `
//       <h3>${product.item_name}</h3>
//       <p>Price: ₹${product.price}</p>
//     `;
//     productList.appendChild(productCard);
//   });
// }

// // Event listener for search button
// document.getElementById("searchButton").addEventListener("click", async () => {
//   const searchInput = document.getElementById("searchInput").value;
//   const filteredProducts = await searchProducts(searchInput);
// scrape(searchInput);
//   displayFilteredProducts(filteredProducts);
// });

// // Function to display filtered products
// function displayFilteredProducts(filteredProducts) {
//   const productList = document.getElementById("product-list");
//   productList.innerHTML = ""; // Clear previous content

//   filteredProducts.forEach((product) => {
//     const productCard = document.createElement("div");
//     productCard.classList.add("product-card");
//     productCard.innerHTML = `
//       <h3>${product.item_name}</h3>
//       <p>Price: ₹${product.price}</p>
//     `;
//     productList.appendChild(productCard);
//     console.log("${product.item_name")
//   });
// }

// // Event listener for track price button
// // document.getElementById("trackButton").addEventListener("click", async () => {
// //   const productUrl = document.getElementById("trackInput").value;
// //   if (productUrl.trim() !== "") {
// //     await trackProduct(productUrl);
// //   } else {
// //     alert("Please enter a valid product URL to track.");
// //   }
// // });

// // Initial display of products on page load
// displayProducts();


// Function to fetch all products from the backend
const baseURL = 'http://127.0.0.1:5000';

// async function scrape_flipkart(url) {
//   try {
//       const response = await fetch(`http://127.0.0.1:5500/api/scrape_flipkart`, {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ url: url })
//       });
//       if (!response.ok) {
//         console.log(response)
//           throw new Error('Failed to scrape data');
//       }
//       const data = await response.json();
//       // Process the scraped data as needed
//       console.log(data); // Example: log the scraped data to the console
//   } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to scrape data');
//   }
// }

// Event listener for search button
document.getElementById("searchButton").addEventListener("click", async () => {
  const searchInput = document.getElementById("searchInput").value;
  const emailInput = document.getElementById("emailInput").value;
  if (!searchInput.trim()&& !emailInput.trim()) {
    alert("Please enter a search query.");
    return;
  }
  // // Call the scrape function with the search input URL
  // console.log(searchInput)
  // scrape_flipkart(searchInput);

  // Call searchProducts function to get filtered products based on search query
  const filteredProducts = await searchProducts(searchInput,emailInput);

  // Display filtered products on the frontend
  displayFilteredProducts(filteredProducts);

  
});

// Function to display filtered products
function displayFilteredProducts(filteredProducts) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Clear previous content

  filteredProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <h3>${product.item_name}</h3>
      <p>Price: ₹${product.price}</p>
      <a>Link:${product.url}</p>
    `;
    productList.appendChild(productCard);
    console.log("${product.item_name")
  });
}

// Function to fetch products based on search query from the backend
async function searchProducts(searchQuery,emailQuery) {
  try {
    const response = await fetch(`${baseURL}/api/products/search?q1=${searchQuery}&q2=${emailQuery}`);
    if (!response.ok) {
      throw new Error('Failed to search products');
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error searching products:', error.message);
    return [];
  }
}

// Function to display products on the frontend
async function displayProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Clear previous content

  const products = await fetchAllProducts();
  products.forEach((product) => {
    console.log(product)
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <h3>${product[0]}</h3>
      <p>Price: ₹${product[1]}</p>
      <a href=${product[2]}> URL</p>
    `;
    productList.appendChild(productCard);
  });
}

// Function to fetch all products from the backend
async function fetchAllProducts() {
  try {
    const response = await fetch(`${baseURL}/api/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return [];
  }
}

// Initial display of products on page load
displayProducts();

