import { useState, useEffect } from "react";
import { useAuth } from "../security/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/YourCart.css";

function YourOrder() {
  const authContext = useAuth();
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(0);
  const [packets, setPackets] = useState([]);
  const [location, setLocation] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getPackets() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/packet/get/${authContext.username}`,
          {
            headers: { Authorization: "Bearer " + authContext.accessToken },
          }
        );
        setPackets(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPackets();
  }, [pageNo, authContext.username]);

  return (
    <section className="ftco-section">
      <div className="container">
        {packets.map((packet, index) => {
          return (
            <>
              <div className="row justify-content-center">
                <div className="col-md-6 text-center mb-5">
                  <h2 className="heading-section">{index + 1}</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="table-wrap">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>image</th>
                          <th>name</th>
                          <th>quantity</th>
                          <th>price</th>
                          <th>pruchased price</th>
                          <th>location</th>
                          <th>process</th>
                        </tr>
                      </thead>
                      <tbody>
                        {packet.orders.map((order) => {
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
                                {`${packet.location.number}` +
                                  " " +
                                  `${packet.location.street}` +
                                  " " +
                                  `${packet.location.city}` +
                                  " " +
                                  `${packet.location.country}`}
                              </td>
                              <td>
                                <btn className="btn btn-warning">
                                  {`${packet.process}`}
                                </btn>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
}

export default YourOrder;
