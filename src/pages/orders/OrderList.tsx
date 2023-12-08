import { useEffect, useState } from "react";
import moment from "moment";
import { Button } from "react-bootstrap";
import Styles from "./OrderList.module.scss";
import OrderAPI from "../../apis/orders/orders.api";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import "../../components/GlobalStyles/globalSTyleTable/StyleTable.scss";
import { IoMdAddCircle } from "react-icons/io";
import PaginationAdmin from "../../components/table/Pagination";
import { Order } from "../../../src/apis/GlobleIterface/GlobleInterFace";
import { useNavigate } from "react-router-dom";
function OrderList() {
  const [displayProduct, setDisplayProduct] = useState<Order[]>([]);
  const [search, setSeach] = useState<string>("");
  const [totalProduct, setTotalProduct] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [idUser, setIdUser] = useState<number[]>([]);
  const [changeColor, setChangeColor] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataUser();
  }, []);

  useEffect(() => {
    fetchDataUser();
  }, [search, currentPage, isChange]);

  useEffect(() => {
    fetchDataUser();
  }, [isChange]);

  const fetchDataUser = async () => {
    try {
      const response = await OrderAPI.SearchOrder(search, 7, currentPage);
      if (response) {
        setDisplayProduct(response.result.recount);
        setTotalProduct(response.result.totalOrders);
      } else {
        alert("Invalid response format");
      }
    } catch (err) {
      console.log(err);

      navigate("/login");
    }
  };

  const searchUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeach(event.target.value);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getId = (id: number) => {
    if (idUser.includes(id)) {
      const exits = idUser.filter((Userid) => Userid != id);
      setIdUser(exits);
    } else {
      setIdUser([...idUser, id]);
    }
  };
  const getAllId = () => {
    if (displayProduct.length === idUser.length) {
      setIdUser([]);
    } else {
      const allId = displayProduct.map((userId) => userId.id);
      setIdUser(allId);
    }
  };
  const deleteUser = (id: number) => {
    try {
      OrderAPI.deleteOrder(id);
      setIsChange(!isChange);
    } catch (error) {
      alert(error);
    }
  };

  const onchangeStatus = (
    event: React.ChangeEvent<HTMLSelectElement>, // Sửa kiểu dữ liệu ở đây
    id: number
  ) => {
    const newStatus = event.target.value;
    setChangeColor(newStatus);

    try {
      OrderAPI.updateStatus(id, newStatus);
      setIsChange(!isChange);
    } catch (error) {
      console.log(error);
    }
  };

  const getColorForStatus = (status: any) => {
    switch (status) {
      case "1":
        return "red";
      case "2":
        return "blue";
      case "3":
        return "green";
      case "4":
        return "purple";
      case "5":
        return "orange";
      case "6":
        return "pink";
      case "7":
        return "gray";
      default:
        return "transparent";
    }
  };
  return (
    <div className="wrapper">
      <div className="header_content">
        <div className="header_title">
          <h1>Quản lí người dùng</h1>
        </div>
        <div className="input_search">
          <input
            type="text"
            placeholder="Search..."
            onChange={searchUser}
          ></input>
          <small className="search">
            <IoIosSearch />
          </small>
        </div>
        <div className="add_product">
          <Link to="/admin/user_add">
            <Button className="btn_create_product">
              <IoMdAddCircle />
              Thêm Mới
            </Button>
          </Link>
        </div>
      </div>

      <table id="customers">
        <thead>
          <tr>
            <th>
              <input type="checkbox" onChange={getAllId} />
            </th>
            <th>Mã Đơn Hàng</th>
            <th>Tên người đặt</th>
            <th>Ghi chú</th>
            <th>Thời Gian Đặt</th>
            <th>Tổng Giá</th>
            <th>Trạng thái</th>
            <th>Thời gian tạo</th>
            <th>Thời cập nhật</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody className={Styles.wrapper_table}>
          {displayProduct.length === 0 ? (
            <tr>
              <td colSpan={9}>
                <h1 className="text-center">Không có sản phẩm nào</h1>
              </td>
            </tr>
          ) : (
            <>
              {displayProduct.map((user, index) => (
                <tr key={user.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{user.serial_number}</td>
                  <td>{user.username}</td>
                  <td>{user.note}</td>
                  <td>{moment(user.order_at).format("YYYY-MM-DD HH:mm")}</td>
                  <td>{user.total_price}</td>
                  <td>
                    {" "}
                    <form method="put">
                      <select
                        value={user.status}
                        onChange={(event) =>
                          onchangeStatus(event, user.order_id)
                        }
                        style={{
                          background: getColorForStatus(changeColor),
                        }}
                      >
                        <option value="1">Đơn hàng mới</option>
                        <option value="2">Đơn xác thực</option>
                        <option value="3">Đơn giao hàng</option>
                        <option value="4">Đã giao hàng</option>
                        <option value="5">Đã thanh toán</option>
                        <option value="6">Hoàn tất</option>
                        <option value="7">Bị từ chối</option>
                      </select>
                    </form>
                  </td>
                  <td>{moment(user.created_at).format("YYYY-MM-DD HH:mm")}</td>
                  <td>{moment(user.updated_at).format("YYYY-MM-DD HH:mm")}</td>
                  <td className="edit-main">
                    <Link to={`/admin/order_detail/${user.order_id}`}>
                      <Button>Xem</Button>
                    </Link>
                    <Button
                      className="ml-3"
                      variant="danger"
                      onClick={() => deleteUser(user.order_id)}
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

export default OrderList;
