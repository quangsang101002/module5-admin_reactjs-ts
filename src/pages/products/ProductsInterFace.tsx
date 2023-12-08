export interface Product {
  id: number;
  sku: string;
  name_product: string;
  unit_price: number;
  description: string;
  category: number;
  created_at: string;
  updated_at: string;
  product_id: number;
}
// export default ProductsInterFace;
// useEffect(() => {
//   window.addEventListener("beforeunload", confirmExit);
//   return () => {
//     window.removeEventListener("beforeunload", confirmExit);
//   };
// }, [dataChanged]);

// // Hàm xác nhận thoát khỏi trang
// function confirmExit(e: BeforeUnloadEvent) {
//   if (dataChanged) {
//     e.preventDefault();
//     e.returnValue = "Bạn có chắc muốn rời khỏi trang này?";
//   }
// }
