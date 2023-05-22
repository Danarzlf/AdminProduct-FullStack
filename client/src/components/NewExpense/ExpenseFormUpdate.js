import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ExpenseFormUpdate.css";
import { Link, useParams } from "react-router-dom";
import { Form, Button, Col, Row, Container } from "react-bootstrap";

const ExpenseFormUpdate = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null); // Menambahkan state imageFile
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null); // Menambahkan state previewImage

  const params = useParams();

  const fetchData = () => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .get(`http://localhost:8000/api/v1/products/${params.id}`, { headers })
      .then(function (response) {
        const { name, price, stock, image } = response.data.data.product;
        setName(name);
        setPrice(price);
        setStock(stock);
        setImage(image);
        setPreviewImage(image); // Mengatur previewImage saat melakukan fetch data
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file)); // Mengatur previewImage saat memilih gambar baru
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const updatedData = {
      name: name,
      price: price,
      stock: stock,
    };

    // Membuat objek FormData dan menambahkan data gambar
    const formData = new FormData();
    formData.append("image", imageFile);

    // Menambahkan data lainnya ke dalam FormData
    Object.keys(updatedData).forEach((key) => {
      formData.append(key, updatedData[key]);
    });

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .put(`http://localhost:8000/api/v1/products/${params.id}`, formData, {
        headers,
      })
      .then(function (response) {
        console.log(response.data.data);
        setIsLoading(false);
        fetchData();
        window.location.href = "/dashboard";
      })
      .catch(function (error) {
        console.log(error.message);
        setIsLoading(false);
      });
  };

  const handleCancel = () => {
    window.location.href = "/dashboard";
  };

  return (
    <Container>
      <h1>Product Update</h1>
      <p className="mb-5">Update your product in here!!!</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPrice">
          <Form.Label column sm={2}>
            Price
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalStock">
          <Form.Label column sm={2}>
            Stock
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              value={stock}
              onChange={(event) => setStock(event.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalImage">
          <Form.Label column sm={2}>
            Image File
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="file" onChange={handleImageChange} />
          </Col>
        </Form.Group>
        <div>
          {previewImage && (
            <img src={previewImage} alt="Product" style={{ width: "200px" }} />
          )}
        </div>
        <br />
        <Form.Group>
          <button
            className="btn btn-primary lg sign-up fw-bold me-3"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Please Wait..." : "Update"}
          </button>

          <Link to={"http://localhost:3000/dashboard"}>
            <button className="btn btn-primary lg sign-up fw-bold">
              Cancel
            </button>
          </Link>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ExpenseFormUpdate;
