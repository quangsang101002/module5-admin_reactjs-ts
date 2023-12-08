import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from "./UserAdd.module.scss";
import clsx from "clsx";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDropzone } from "react-dropzone";
import UserApi from "../../../apis/users/users.api";

function UserAdd(): JSX.Element {
  const [userName, setUserName] = useState<string>("");
  const [email, setMail] = useState<string>("");
  const [firstName, setFirtName] = useState<string>("");
  const [lastName, setLName] = useState<string>("");
  const [passWord, setPassWord] = useState<string>("");
  const [repeatPassWord, setRepeatPassWord] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [dataChanged, setDataChanged] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [validate, setValidate] = useState<{ [key: string]: string }>({});
  const [base64Image, setBase64Image] = useState<string>("");

  useEffect(() => {
    setDataChanged(true);
  }, [userName, email, firstName, lastName, avatar, role]);

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

  const addUser = async () => {
    const allUser = {
      username: userName,
      email: email,
      first_name: firstName,
      last_name: lastName,
      role: role,
      password: passWord,
      avatar: avatar,
    };
    if (email && firstName && lastName && passWord) {
      try {
        await UserApi.AddUser(allUser);
      } catch (error) {
        alert(error);
      }
    } else {
      alert("bạn chưa điền đầy đủ thông tin");
    }
  };

  const handleAdd = async () => {
    const formData = new FormData();
    if (avatar) {
      formData.append("avatar", avatar);
    }
    try {
      await UserApi.AddUser(formData);
    } catch (error) {
      alert(error);
    }
  };
  const handleSubmit = () => {
    const validateError = validateName();
    if (validateError.size === 0) {
      setValidate({ someKey: "" });
      addUser();
    } else {
      setValidate(Object.fromEntries(validateError));
      return;
    }
  };

  const validateName = () => {
    let error = new Map<string, string>();

    if (typeof userName !== "string" || userName.length === 0) {
      error.set("sku", "Mã sản phẩm không được bỏ trống");
    } else if (typeof email !== "string" || email.length === 0) {
      error.set("email", "Tên sản phẩm không được bỏ trống");
      error.set("price", "Đơn giá không được bỏ trống");
    }

    return error;
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setAvatar(file);
    const reader = new FileReader();

    reader.onload = () => {
      const base64Data: string = reader.result as string;
      setBase64Image(base64Data);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
                placeholder="userName"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
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
                name="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setMail(event.target.value)}
              />
            </Col>
            <small className="text-center" style={{ color: "red" }}>
              {validate.email}
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
                placeholder="firstName"
                value={firstName}
                onChange={(event) => setFirtName(event.target.value)}
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
                placeholder="lastName"
                value={lastName}
                onChange={(event) => setLName(event.target.value)}
              />
            </Col>
            <small className="text-center" style={{ color: "red" }}></small>
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
                placeholder="passWord"
                value={passWord}
                onChange={(event) => setPassWord(event.target.value)}
              />
            </Col>
            <small className="text-center" style={{ color: "red" }}></small>
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
                placeholder="repeatPassWord"
                value={repeatPassWord}
              />
            </Col>
            <small className="text-center" style={{ color: "red" }}></small>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Col sm="10">
              <Form.Select
                className={clsx(styles.input_select, "mb-4")}
                onChange={(event) => setRole(event.target.value)}
                value={role}
              >
                <option disabled hidden value="">
                  Rode
                </option>
                <option value="1">Admind</option>
                <option value="2">Customer</option>
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
          </div>
          <Button className={clsx(styles.btn_save)} onClick={handleSubmit}>
            Lưu
          </Button>
        </form>
      </div>
      <div
        className={clsx(styles.wrapper_content_right, "col-6")}
        style={{ border: "2px solid" }}
      >
        <div className={clsx(styles.preview_product, "row")}>
          <div className={clsx(styles.content_preview_product_left, "col-12")}>
            <div className="wrapper-conten-info">
              <div className={styles.preview}>
                {base64Image && (
                  <img
                    className="mt-3"
                    src={base64Image}
                    alt="Uploaded"
                    style={{ maxWidth: "100%" }}
                  />
                )}
              </div>
              <div>
                <h2 className="text-center mt-5">
                  <b>{userName}</b>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAdd;
