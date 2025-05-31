const fs = require("fs");
const path = require("path");

// Orijinal JSON dosyasını oku
const rawData = fs.readFileSync(
  path.join(__dirname, "trendyol-data.json"),
  "utf-8"
);
const jsonData = JSON.parse(rawData);

// Dönüştürülmüş ürünleri tutacak dizi
const formattedProducts = [];

jsonData.products.forEach((product) => {
  const formatted = {
    name: product.name,
    description: `Kategori: ${product.categoryHierarchy}`, // orijinalde description yok
    price:
      product.price?.discountedPrice ||
      product.variants?.[0]?.price?.discountedPrice ||
      0,
    images: product.images.map((img) => `https://cdn.dsmcdn.com${img}`),
    stock: 100, // stok bilgisi orijinal veride yok, sabit değer
    category: product.categoryName,
  };

  formattedProducts.push(formatted);
});

// JSON dosyası olarak kaydet
fs.writeFileSync(
  path.join(__dirname, "data_formatted.json"),
  JSON.stringify(formattedProducts, null, 2)
);

console.log("✅ Veriler başarıyla data_formatted.json dosyasına yazıldı.");
