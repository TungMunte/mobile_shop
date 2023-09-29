import { useState, useEffect } from "react";
import { useAuth } from "../security/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/YourCart.css";

function YourCart() {
  const authContext = useAuth();
  const navigate = useNavigate();
  const param = useParams();
  const [pageNo, setPageNo] = useState(0);
  const [order, setOrder] = useState({});
  const [smartphone, setSmartphone] = useState({});
  const [number, setNumber] = useState();
  useEffect(() => {
    async function getOrder() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/order/${param.id}`,
          {
            headers: { Authorization: "Bearer " + authContext.accessToken },
          }
        );
        console.log(response.data);
        setOrder({ id: response.data.id, quantity: response.data.quantity });
        setSmartphone(response.data.smartPhone);
      } catch (error) {
        console.log(error);
      }
    }
    getOrder();
  }, [pageNo, authContext.username]);

  const handleNumber = (event) => {
    setNumber(event.target.value);
  };

  const handleModify = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/order/put/${param.id}/${number}`,
        {
          headers: { Authorization: "Bearer " + authContext.accessToken },
        }
      );
      if (response.status === 200) {
        navigate("/yourCart");
      }
    } catch (error) {
      console.log(error);
    }
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
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img
                        src={`http://localhost:8080/api/image/get/${smartphone.imageCode}`}
                        style={{
                          width: "130px",
                          height: "130px",
                        }}
                      />
                    </td>
                    <td>{smartphone.name}</td>
                    <td>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={smartphone.quantity}
                        onChange={handleNumber}
                      />
                    </td>
                    <td>{smartphone.price}</td>
                    <td>{smartphone.price + 40}</td>
                    <td>
                      <btn className="btn btn-success" onClick={handleModify}>
                        update
                      </btn>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default YourCart;
