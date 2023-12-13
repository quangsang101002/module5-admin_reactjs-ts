import { Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from "./ProductAdd.module.scss";
import clsx from "clsx";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import productAPI from "../../../../apis/products/products.api";
import { useDropzone } from "react-dropzone";
import { AiOutlinePlusCircle } from "react-icons/ai";

function ProductAdd(): JSX.Element {
  const [code, setCode] = useState<string>("");
  const [nameProduct, setNameProduct] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [author, setAuthor] = useState<string>("");
  const [classify, setClassify] = useState<string>("");
  const [dataChanged, setDataChanged] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[] | null>([]);
  const [number, setNumber] = useState<string>("");
  const [validate, setValidate] = useState<{ [key: string]: string }>({});
  const [productPreview, setproductPreview] = useState<Product[]>([]);
  const [base64Image, setBase64Image] = useState<string>("");
  const [base64Images, setBase64Images] = useState<string[]>([]);

  interface Product {
    category: number;
    created_at: string;
    created_by_id: number;
    description: string;
    image: string;
    name_product: string;
    id: number;
    sku: string;
    unit_price: number;
    updated_at: string;
    updated_by_id: number;
  }

  useEffect(() => {
    setDataChanged(true);
  }, [code, nameProduct, price, author, classify, avatar, gallery]);

  useEffect(() => {
    window.addEventListener("beforeunload", confirmExit);
    window.addEventListener("unload", handleUnload);
    window.addEventListener("popstate", () => {
      console.log(1);
    });
    return () => {
      window.removeEventListener("beforeunload", confirmExit);
      window.removeEventListener("unload", handleUnload);
    };
  }, [dataChanged]);

  function confirmExit(e: BeforeUnloadEvent) {
    if (dataChanged) {
      e.preventDefault();
      e.returnValue = "Bạn có chắc muốn rời khỏi trang này?";
    }
  }

  function handleUnload(e: BeforeUnloadEvent) {
    if (dataChanged) {
      e.preventDefault();
      // handleDelete();
      e.returnValue = "Bạn có chắc muốn rời khỏi trang này?";
    }
  }

  const handleAdd = async () => {
    const formData = new FormData();
    // Thêm các trường dữ liệu sản phẩm vào formData

    formData.append("sku", code);
    formData.append("name_product", nameProduct);
    formData.append("category", classify);
    formData.append("description", author);
    formData.append("unit_price", price.toString());

    // Kiểm tra xem avatar và gallery có giá trị trước khi thêm vào formData
    if (avatar) {
      console.log("avatar", avatar);
      formData.append("avatar", avatar);
    }
    if (gallery) {
      for (let img of gallery) {
        console.log("gallery", img);
        formData.append("gallery", img);
      }
    }

    try {
      // Gửi bodyProduct tới API để thêm sản phẩm
      await productAPI.addProduct(formData);
    } catch (error) {
      setShow(true);
    }
  };

  const getClassify = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setClassify(event.target.value);
  };

  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/,/, ""); // Chuyển chuỗi thành số

    setPrice(parseInt(numericValue)); // Lưu dưới dạng số

    setNumber(new Intl.NumberFormat().format(Number(numericValue) || 0));
  };

  const uploadAvatarImage = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.click();
    fileInput.addEventListener("change", (e) => handleFileSelect(e));
  };

  const handleFileSelect = async (e: Event) => {
    const inputElement = e.target as HTMLInputElement;
    if (inputElement.files) {
      const selectedFile = inputElement.files[0];

      if (selectedFile) {
        setAvatar(selectedFile);
      }
    }
  };

  const uploadDescriptionImage = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true; // Cho phép chọn nhiều tệp
    fileInput.click();
    fileInput.addEventListener("change", (e) => handleFileSelectAll(e));
  };
  const handleFileSelectAll = async (e: Event) => {
    const inputElement = e.target as HTMLInputElement;
    if (inputElement.files) {
      const selectedFiles = Array.from(inputElement.files); // Chuyển NodeList thành mảng
      if (selectedFiles) {
        setGallery(selectedFiles);
      }
    }
  };

  const handleSubmit = () => {
    const validateError = validateName();

    if (validateError.size === 0) {
      setShow(false);
      handleAdd();
      setValidate({ someKey: "" });
    } else {
      setValidate(Object.fromEntries(validateError));

      return;
    }
  };

  const validateName = () => {
    let error = new Map<string, string>();

    if (typeof code !== "string" || code.length === 0) {
      error.set("sku", "Mã sản phẩm không được bỏ trống");
    } else if (typeof nameProduct !== "string" || nameProduct.length === 0) {
      error.set("nameProduct", "Tên sản phẩm không được bỏ trống");
    } else if (typeof price !== "number" || price.toString().length === 0) {
      error.set("price", "Đơn giá không được bỏ trống");
    }

    return error;
  };

  const onDrop = (acceptedFile: File[]) => {
    console.log("acceptedFile--1", acceptedFile[0]);

    if (acceptedFile.length > 0) {
      const file = acceptedFile[0];
      setAvatar(file);
      const reader = new FileReader();

      reader.onload = () => {
        const base64Data: string = reader.result as string;
        setBase64Image(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDrop2 = (acceptedFiles: File[]) => {
    console.log("acceptedFile--2", acceptedFiles);
    // console.log("onDrop2", onDrop2);
    // const file = acceptedFiles[0];
    // setAvatar(file);
    // const reader = new FileReader();

    // reader.onload = () => {
    //   const base64Data: string = reader.result as string;
    //   setBase64Image(base64Data);
    // };
    // reader.readAsDataURL(file);

    setGallery(acceptedFiles);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result as string;
        setBase64Images((prevImages) => [...prevImages, base64Data]);
      };
      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const dropzone = useDropzone({
    onDrop: onDrop2,
  });

  dropzone.getRootProps;
  dropzone.getInputProps;
  dropzone.isDragActive;
  return (
    <div className={clsx(styles.wrapper, "row")}>
      <div className={clsx(styles.wrapper_content_left, "col-6")}>
        <form method="post">
          <Form.Group
            as={Row}
            className={clsx(styles.input, "mb-4")}
            controlId="formPlaintextUserName"
          >
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Mã sản phẩm"
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
            </Col>
            <small className="text-center" style={{ color: "red" }}>
              {validate.sku}
            </small>
          </Form.Group>

          <Form.Group
            as={Row}
            className={clsx(styles.input, "mb-4")}
            controlId="formPlaintextFirstName"
          >
            <Col sm="10">
              <Form.Control
                type="text"
                // as="textarea"
                name="text"
                placeholder="Tên sách"
                value={nameProduct}
                onChange={(event) => setNameProduct(event.target.value)}
              />
            </Col>
            <small className="text-center" style={{ color: "red" }}>
              {validate.nameProduct}
            </small>
          </Form.Group>

          <Form.Group
            as={Row}
            className={clsx(styles.input, "mb-4")}
            controlId="formPlaintextEmail"
          >
            <Col sm="10">
              <Form.Control
                type="email"
                name="text"
                placeholder="Tên Tác giả"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className={clsx(styles.input, "mb-4")}
            controlId="formPlaintextLastName"
          >
            <Col sm="10">
              <Form.Control
                maxLength={9}
                type="text"
                placeholder="Đơn giá"
                value={number}
                onChange={handlePrice}
              />
            </Col>
            <small className="text-center" style={{ color: "red" }}></small>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Col sm="10">
              <Form.Select
                className={clsx(styles.input_select, "mb-4")}
                onChange={(event) => getClassify(event)}
                value={classify}
              >
                <option disabled hidden value="">
                  Thể loại
                </option>
                <option value="1">Sách thiếu nhi</option>
                <option value="2">Sách văn học nghệ thuật</option>
                <option value="3">Sách Truyện, tiểu thuyết</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <div className={clsx(styles.btn_wrapper)}>
            <div className={clsx(styles.btn)}>
              <div>
                <div {...getRootProps()}>
                  {/* <input {...getRootProps({ multiple: false })} /> */}
                  {isDragActive ? (
                    <p>Thả hình ảnh vào đây...</p>
                  ) : (
                    <Button>Tải ảnh đại diện</Button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div {...dropzone.getRootProps()}>
                {/* <input {...dropzone.getInputProps({ multiple: true })} /> */}
                {dropzone.isDragActive ? (
                  <p>Thả hình ảnh vào đây...</p>
                ) : (
                  <Button>Tải ảnh mô tả</Button>
                )}
              </div>
            </div>
          </div>
          <Button className={clsx(styles.btn_save)} onClick={handleSubmit}>
            Hoàn Thành
          </Button>
        </form>
      </div>
      <div
        className={clsx(styles.wrapper_content_right, "col-6")}
        style={{ border: "2px solid" }}
      >
        <div className={clsx(styles.preview_product, "row")}>
          <div className={clsx(styles.content_preview_product_left, "col-6")}>
            <div className={styles.preview}>
              <div className="row">
                {base64Image ? (
                  <img
                    src={base64Image}
                    alt="Uploaded"
                    style={{ maxWidth: "100%" }}
                  />
                ) : (
                  <img
                    src="https://ivcdn.vnecdn.net/giaitri/images/web/2023/08/10/jisoo-blackpink-xuat-hien-sau-khi-cong-khai-nguoi-yeu-1691649923.jpg"
                    alt="avatar"
                  />
                )}
              </div>

              <div
                className={styles.wrapper_preview_content}
                style={{ position: "relative" }}
              >
                {base64Images && base64Images.length > 0 ? (
                  base64Images.slice(0, 6).map((base64Image, index) => (
                    <div
                      key={index}
                      className={clsx(styles.preview_gallery, "col-2")}
                    >
                      <img
                        src={base64Image}
                        alt="Uploaded"
                        style={{
                          opacity: index === 5 ? 0.5 : 1,
                        }}
                        className={index === 5 ? styles.hide_img : ""}
                      />
                    </div>
                  ))
                ) : (
                  <Row xs={1} md={6} className="g-4 mt-3">
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <div
                        key={idx}
                        className={clsx(styles.preview_gallery, "col-2")}
                      >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Kim_Jisoo_on_July_3%2C_2023_07.jpg" />
                      </div>
                    ))}
                  </Row>
                )}

                {}

                {base64Images.length > 6 ? (
                  <div className={styles.wrapper_quantity}>
                    <AiOutlinePlusCircle />
                    {base64Images.length - 6}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className={clsx(styles.content_preview_product_right, "col-6")}>
            <div className={clsx(styles.name, "mb-3")}>
              <h2>{nameProduct ? nameProduct : "Chưa Cập Nhật"}</h2>
            </div>
            <div className={styles.author}>
              <h2 className="mb-3">
                <b>Tác giả: </b>
                {author ? author : "Chưa Cập Nhật"}
              </h2>
            </div>
            <div className={styles.prices}>
              <h2>{number}</h2>
            </div>
            <div className={styles.wrapper_btn}>
              <Button>-</Button>1<Button>+</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAdd;
