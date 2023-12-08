import styles from "./DashboardPage.module.scss";
import { useState } from "react";
import moment from "moment";
import { Button } from "react-bootstrap";
import clsx from "clsx";

function AdminLogin() {
  const [displayProduct, setDisplayProduct] = useState<string[]>([]);
  return (
    <div className="">
      <div className="">
        {/* <h1 className="mb-3">Quản lí sản phẩm</h1> */}
        {/* <div className="serch mb-3">
              <div className="btn_search">
                <input
                  type="text"
                  placeholder="Nhập từ khóa tìm kiếm"
                  value=""
                />
                <button type="button">Tìm kiếm</button>
              </div>
              <div className="btn-addnew"></div>
            </div> */}
        <table id="customers">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
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
          <tbody>
            {displayProduct.length === 0 ? (
              <div className="空洞的">
                {/* <b>
                      <h1 className="text-center">Không </h1>
                    </b> */}
              </div>
            ) : (
              <>
                {" "}
                {/* {displayProduct.map((user, index) => (
                      <tr key={user.id}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>{user.sku}</td>
                        <td>{user.name}</td>
                        <td>{user.unit_price}</td>
                        <td>{user.description}</td>
                        <td>
                          {user.category === 1
                            ? "STN"
                            : user.category === 2
                            ? "VH & NT"
                            : "T & TT"}
                        </td>

                        <td>
                          {moment(user.created_at).format("YYYY-MM-DD HH:mm")}
                        </td>
                        <td>
                          {moment(user.updated_at).format("YYYY-MM-DD HH:mm")}
                        </td>
                        <td className="edit-main">
                          <Button className="ml-3" variant="danger">
                            Xóa
                          </Button>
                        </td>
                      </tr>
                    ))} */}
              </>
            )}
          </tbody>
        </table>
        {/* <div className="paging text-center mt-5 mb-5">
              <div>
                <button className="btn-pagig">
                  <AiOutlineLeft />
                </button>
                <a href={`/admin/product/${getNumberPages}`}>
                  <button
                    className="btn-pagig"
                    onClick={(event) => getNumberPager(event)}
                  >
                    1
                  </button>
                </a>
                <a href={`/admin/product/${getNumberPages}`}>
                  <button
                    className="btn-pagig"
                    onClick={(event) => getNumberPager(event)}
                  >
                    2
                  </button>
                </a>
                <a href={`/admin/product/${getNumberPages}`}>
                  <button
                    className="btn-pagig"
                    onClick={(event) => getNumberPager(event)}
                  >
                    3
                  </button>
                </a>
                <span className="btn-pagig">...</span>
                <button className="btn-pagig">
                  <AiOutlineRight />
                </button>
              </div>
            </div> */}
      </div>
    </div>
  );
}

export default AdminLogin;
