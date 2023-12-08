import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

export const NUMBER_RECORDS_PER_PAGE = 5;

interface AdminPaginationProps {
  total: number;
  setPage: (page: number) => void;
}

const PaginationAdmin: React.FC<AdminPaginationProps> = ({
  total,
  setPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPage = Math.ceil(total / NUMBER_RECORDS_PER_PAGE);

  const handleChangePage = (pageNumber: number) => {
    const page = parseInt(pageNumber.toString());

    setCurrentPage(page);
    setPage(page);
  };

  const items: JSX.Element[] = [];

  const maxPageDisplay = 5; // Số trang hiển thị tối đa
  const pagesToShow = 3; // Số trang liền kề để hiển thị

  let startPage = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
  let endPage = Math.min(startPage + pagesToShow - 1, totalPage);

  for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
    const item = (
      <Pagination.Item
        key={pageNumber}
        onClick={() => handleChangePage(pageNumber)}
        active={pageNumber === currentPage}
      >
        {pageNumber}
      </Pagination.Item>
    );

    items.push(item);
  }

  const increasePage = () => {
    const newPage = Math.min(currentPage + 1, totalPage - pagesToShow + 1);
    // Nếu newPage là một giá trị hợp lệ, hãy cập nhật trang hiện tại
    if (newPage >= 1) {
      setCurrentPage(newPage);
      setPage(newPage);
    }
  };

  return (
    <>
      <Pagination className="float-end">
        <Pagination.First
          disabled={currentPage === 1}
          onClick={() => handleChangePage(1)}
        />
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => handleChangePage(currentPage - 1)}
        />

        {items.map((item) => {
          return item;
        })}

        <Pagination.Next onClick={increasePage} />
        <Pagination.Last
          disabled={currentPage === totalPage}
          onClick={() => handleChangePage(totalPage)}
        />
      </Pagination>
      <p className="float-end mx-3">
        <strong>Tổng số bản ghi:</strong> {total}
      </p>
    </>
  );
};

export default PaginationAdmin;
