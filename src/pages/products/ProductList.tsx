import { useEffect, useState } from "react";
import moment from "moment";
import { Button } from "react-bootstrap";
import Styles from "./ProductList.module.scss";
import clsx from "clsx";
import productAPI from "../../apis/products/products.api";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import "../../components/GlobalStyles/globalSTyleTable/StyleTable.scss";
import { IoMdAddCircle } from "react-icons/io";
import PaginationAdmin from "../../components/table/Pagination";
import { Product } from "./ProductsInterFace";
import { useNavigate } from "react-router-dom";
function ProductList() {
  const [displayProduct, setDisplayProduct] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isProduct, setProduct] = useState<boolean>(false);
  const [idCheck, setIdCheck] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProduct, setTotalProduct] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    searchProducts();
  }, [search, currentPage]);

  useEffect(() => {
    searchProducts();
  }, [isProduct]);
  const searchProducts = async () => {
    try {
      const response = await productAPI.SearchProduct(search, 7, currentPage);

      if (response) {
        setDisplayProduct(response[0]);
        setTotalProduct(response[1]);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  const deleteProducts = async (id: number) => {
    try {
      await productAPI.deleteProduct(id);
      setProduct(!isProduct);
    } catch (error) {}
  };
  const searchProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleId = (idInput: number) => {
    const isIdExist = idCheck.includes(idInput);

    if (isIdExist) {
      const updatedIds = idCheck.filter((id) => id !== idInput);
      setIdCheck(updatedIds);
    } else {
      setIdCheck([...idCheck, idInput]);
    }
  };
  const handleDeleteAll = () => {
    if (idCheck.length === displayProduct.length) {
      setIdCheck([]);
    } else {
      const getId = displayProduct.map((id) => id.id);
      setIdCheck(getId);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async () => {
    try {
      await productAPI.deleteProduct(idCheck);
      await setProduct(!isProduct);
    } catch (error) {
      console.log(error);

      navigate("/login");
    }
  };

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.header_content}>
        <div className={Styles.header_title}>
          <h1>Quản lí sản phẩm</h1>
        </div>
        <div className={Styles.input_search}>
          <input
            type="text"
            placeholder="Search..."
            onChange={searchProduct}
          ></input>
          <small className="search">
            <IoIosSearch />
          </small>
        </div>
        <div className={Styles.add_product}>
          <Link to="/admin/product_add">
            <Button className={Styles.btn_create_product}>
              <IoMdAddCircle />
              Thêm Mới
            </Button>
          </Link>
          <Button className={Styles.btn_create_product} onClick={handleDelete}>
            Xóa Tất Cả
          </Button>
        </div>
      </div>

      <table id="customers">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleDeleteAll}
                checked={idCheck.length === displayProduct.length}
              />
            </th>
            <th>Mã sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Đơn giá</th>
            <th>Mô tả</th>
            <th>Phân loại</th>
            <th>Thời gian tạo</th>
            <th>Thời gian cập nhật</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody className={Styles.wrapper_table}>
          {displayProduct.length === 0 ? (
            <div className={clsx(Styles.serach_emrty)}>
              <h1 className="text-center">Không có sản phẩm nào</h1>
            </div>
          ) : (
            <>
              {displayProduct.map((user, index) => (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleId(user.id)}
                      checked={idCheck.includes(user.id)}
                    />
                  </td>
                  <td>{user.sku}</td>
                  <td>{user.name_product}</td>
                  <td>{user.unit_price}</td>
                  <td>{user.description}</td>
                  <td>
                    {user.category === 1
                      ? "STN"
                      : user.category === 2
                      ? "VH & NT"
                      : "T & TT"}
                  </td>

                  <td>{moment(user.created_at).format("YYYY-MM-DD HH:mm")}</td>
                  <td>{moment(user.updated_at).format("YYYY-MM-DD HH:mm")}</td>
                  <td className="edit-main">
                    <Link to={`/admin/product_edit/${user.id}`}>
                      {" "}
                      <Button>Sửa </Button>
                    </Link>

                    <Button
                      className="ml-3"
                      variant="danger"
                      onClick={() => deleteProducts(user.id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      <PaginationAdmin total={totalProduct} setPage={handlePageChange} />
    </div>
  );
}

export default ProductList;
