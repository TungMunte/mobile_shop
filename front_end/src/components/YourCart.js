import { useState, useEffect } from "react";
import { useAuth } from "../security/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/YourCart.css";

function YourCart() {
  const authContext = useAuth();
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(0);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function getOrders() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/order/get/${authContext.username}/${pageNo}`,
          {
            headers: { Authorization: "Bearer " + authContext.accessToken },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getOrders();
  }, [pageNo, authContext.username]);

  const handleCancel = async (id, index) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/order/delete/${id}/${authContext.username}`,
        {
          headers: { Authorization: "Bearer " + authContext.accessToken },
        }
      );
      const newOrders = orders.filter((orders, i) => i !== index);
      setOrders(newOrders);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModify = (id) => {
    navigate(`/editCart/${id}`);
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-16 text-center mb-5">
            <h2 className="heading-section">Your Cart</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-16">
            <div className="table-wrap">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>image</th>
                    <th>name</th>
                    <th>quantity</th>
                    <th>price</th>
                    <th>pruchased price</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={`http://localhost:8080/api/image/get/${order.smartPhone.imageCode}`}
                            style={{
                              width: "130px",
                              height: "130px",
                            }}
                          />
                        </td>
                        <td>{order.smartPhone.name}</td>
                        <td>{order.quantity}</td>
                        <td>{order.smartPhone.price}</td>
                        <td>{order.smartPhone.price + 40}</td>
                        <td>
                          <btn
                            className="btn btn-success"
                            onClick={() => handleModify(order.id)}
                          >
                            modify
                          </btn>
                        </td>

                        <td>
                          <btn
                            className="btn btn-warning"
                            onClick={() => handleCancel(order.id, index)}
                          >
                            Cancel
                          </btn>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="d-flex justify-content-end">
                <h3>{`total : ${orders.reduce((accumulator, order) => {
                  return accumulator + order.smartPhone.price + 40;
                }, 0)}`}</h3>
              </div>
              <div className="d-flex justify-content-end">
                <btn
                  className="btn btn-success"
                  onClick={() => navigate("/infoOrder")}
                >
                  Checkout
                </btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default YourCart;
