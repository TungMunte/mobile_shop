import { useState, useEffect } from "react";
import { useAuth } from "../security/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/YourCart.css";

function PacketSelect() {
  const authContext = useAuth();
  const [packets, setPackets] = useState([]);

  useEffect(() => {
    async function getAllPacket() {
      try {
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
      } catch (error) {
        console.log(error);
      }
    }
    getAllPacket();
  }, []);

  async function handleClick(event, id) {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/packet/selectBy/${authContext.username}/${id}`,
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
                        </tr>
                      </thead>
                      <tbody>
                        {packet.orders.map((order) => {
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
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-end mb-5">
                      <btn
                        className="btn btn-success"
                        onClick={(event) => handleClick(event, packet.id)}
                      >
                        select
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

export default PacketSelect;
