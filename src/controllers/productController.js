// src/controllers/productController.js

// Dummy product list
let products = [
  { id: 1, name: "Pizza", price: 300 },
  { id: 2, name: "Burger", price: 150 },
];

// ✅ Get all products
export const getProducts = (req, res) => {
  res.status(200).json(products);
};

// ✅ Get single product by ID
export const getProductById = (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// ✅ Add a new product
export const addProduct = (req, res) => {
  const { name, price } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

// ✅ Update a product
export const updateProduct = (req, res) => {
  const { name, price } = req.body;
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// ✅ Delete a product
export const deleteProduct = (req, res) => {
  const productIndex = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// ✅ Dummy for vendor product listing
export const getVendorProducts = (req, res) => {
  // Later real logic laga sakte ho vendor ke hisaab se
  res.status(200).json(products);
};

// ✅ Dummy for category wise product fetch
export const getProductsByCategory = (req, res) => {
  const { category_id } = req.params;
  // Static data hai, filter ka example:
  const filtered = products.filter((p) => p.category_id === category_id);
  res.status(200).json(filtered.length ? filtered : []);
};
