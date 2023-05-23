import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ExpenseDetail.css";

const ExpenseDetail = () => {
  const [data, setData] = useState({});
  let params = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .get(`http://localhost:8000/api/v1/products/${params.id}`, { headers })
      .then(function (response) {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, [setData]);

  const dateTime = new Date(data?.product?.date).toLocaleString("id-ID", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    // hour: "numeric",
    // minute: "numeric",
  });

  const dateTimeUpdate = new Date(data?.product?.updatedAt).toLocaleString(
    "id-ID",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
    }
  );

  return (
    <div className="container">
      <div className="card-detail my-md-5 px-md-4 shadow-lg">
        <h1 className=" text-center pt-4">Product Detail</h1>
        <div className="product-detail row d-flex px-md-4 mt-md-4">
          <div className="img-detail col-md-5 align-items-center">
            {data?.product?.image && (
              <img
                src={data.product.image}
                alt="Product Image"
                style={{ width: "90%" }}
              />
            )}
          </div>
          <div className="col-md-7 mt-3 mt-xl-5">
            <h1>{data?.product?.name}</h1>
            <p className="text-danger fs-4 fw-semibold">
              Rp. {data?.product?.price}
            </p>
            <p className="desc-product mx-4 mx-md-0">
              {data?.product?.description}
            </p>
            <p className="fs-5">Stock {data?.product?.stock} pcs</p>
            {/* <p className="mt-1 mb-2">Created at {dateTime} </p>  ini create dari database */}
            <p className="mt-1">Created {dateTime} </p>
            <p className="mt-1">Last Update {dateTimeUpdate} </p>
          </div>
          <Link
            to="/dashboard"
            className="btn-go-dashboard mb-4 mt-md-1 btn ms-md-4 col-6 col-sm-5 col-md-4 col-xl-2"
          >
            &#8810; Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDetail;
