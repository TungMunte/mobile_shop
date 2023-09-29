import { useState } from "react";
import "../css/Login.css";
import axios from "axios";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";

function InfoOrder() {
  const authContext = useAuth();
  const navigate = useNavigate();
  const [number, setNumber] = useState();
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleNumber = (event) => {
    setNumber(Number(event.target.value));
  };

  const handleStreet = (event) => {
    setStreet(event.target.value);
  };

  const handleCity = (event) => {
    setCity(event.target.value);
  };

  const handleCountry = (event) => {
    setCountry(event.target.value);
    console.log(country);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      console.log(number, street, city, country);
      const response = await axios.post(
        `http://localhost:8080/api/packet/add/${authContext.username}`,
        { number, street, city, country },
        {
          headers: { Authorization: "Bearer " + authContext.accessToken },
        }
      );
      console.log(response);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">
                    Information of order
                  </h2>
                  <p className="text-white-50 mb-5">
                    Please enter your location
                  </p>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="number"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      value={number}
                      onChange={handleNumber}
                    />
                    <label className="form-label" for="typeEmailX">
                      number
                    </label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      value={street}
                      onChange={handleStreet}
                    />
                    <label className="form-label" for="typePasswordX">
                      street
                    </label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      value={city}
                      onChange={handleCity}
                    />
                    <label className="form-label" for="typePasswordX">
                      city
                    </label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      value={country}
                      onChange={handleCountry}
                    />
                    <label className="form-label" for="typePasswordX">
                      country
                    </label>
                  </div>

                  <btn
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Complete
                  </btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoOrder;
