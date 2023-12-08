export interface BodyProduct {
  sku: string;
  name: string;
  category: string;
  description: string;
  unit_price: number;
  avatar: File | string;
  gallery: (File | string)[];
}

// const formData = new FormData();
// formData.append("avatar", selectedFile);
// // Thêm các trường dữ liệu sản phẩm vào formData
// formData.append("sku", code);
// formData.append("name", nameProduct);
// formData.append("category", classify);
// formData.append("description", author);
// formData.append("unit_price", price.toString());
// // Thêm hình ảnh avatar và gallery vào formData
// formData.append("avatar", avatar);
// for (let img of gallery) {
//   formData.append("gallery", img);
// }

// console.log("formData", formData);

// import React from "react";

// // Định nghĩa một functional component tên là "ProductList"
// const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
//   // Sử dụng prop "products" để hiển thị danh sách sản phẩm
//   return (
//     <div>
//       <h2>Danh sách sản phẩm:</h2>
//       <ul>
//         {products.map((product) => (
//           <li key={product.id}>
//             {product.name} - Giá: {product.price} VNĐ
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// // Định nghĩa một danh sách sản phẩm
// const productsData: Product[] = [
//   { id: 1, name: "Sản phẩm 1", price: 10 },
//   { id: 2, name: "Sản phẩm 2", price: 20 },
//   { id: 3, name: "Sản phẩm 3", price: 30 },
// ];

// // Định nghĩa một interface cho các thông tin của một sản phẩm
// interface Product {
//   id: number;
//   name: string;
//   price: number;
// }

// // Component cha
// const App: React.FC = () => {
//   return (
//     <div>
//       <h1>Ứng dụng React với Props</h1>
//       {/* Truyền danh sách sản phẩm vào component ProductList */}
//       <ProductList products={productsData} />
//     </div>
//   );
// };

// export default App;
