import { useState, useEffect } from "react";
import { useAuth } from "../security/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/YourCart.css";

function PacketCheck() {
  const authContext = useAuth();
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(0);
  const [packets, setPackets] = useState([]);
  const [location, setLocation] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getAllPacket() {
      const response = await axios.get(
        "http://localhost:8080/api/packet/getAll",
        {
          headers: {
            Authorization: `Bearer ${authContext.accessToken}`,
          },
        }
      );

      console.log(response.data);
      setPackets(response.data);
    }
    getAllPacket();
  }, []);

  async function handleDelete(event, id) {
    event.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/packet/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authContext.accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
        const newPackets = packets.filter((packet) => packet.id !== id);
        setPackets(newPackets);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="ftco-section">
      <div className="container">
        {packets.map((packet, id) => {
          return (
            <>
              <div className="row justify-content-center">
                <div className="col-md-6 text-center mb-5">
                  <h2 className="heading-section">{id}</h2>
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
                          <th>owner</th>
                          <th>deliver</th>
                          <th>process</th>
                        </tr>
                      </thead>
                      <tbody>
                        {packet.orders.map((order, index) => {
                          return (
                            <>
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
                                <td>{packet.owner}</td>
                                <td>{packet.deliver}</td>
                                <td>
                                  <btn className="btn btn-warning">
                                    {packet.process}
                                  </btn>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-end mb-5">
                      <btn
                        className="btn btn-danger"
                        onClick={(event) => handleDelete(event, packet.id)}
                      >
                        delete
                      </btn>
                    </div>
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

export default PacketCheck;
