import "../css/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const roles = [
    { value: "", text: "--ROLE--" },
    { value: "USER", text: "USER" },
    { value: "DELIVERY_MAN", text: "DELIVERY_MAN" },
  ];
  const [role, setRole] = useState(roles[0].value);
  const navigate = useNavigate();
  const authContext = useAuth();

  function handleUsername(event) {
    setUsername(event.target.value);
  }
  function handleFirstName(event) {
    setFirstName(event.target.value);
  }
  function handleLastName(event) {
    setLastName(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  function handleEmail(event) {
    setEmail(event.target.value);
  }
  const handleRole = (event) => {
    setRole(event.target.value);
  };
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(firstName, lastName, username, email, role, password);
    console.log(firstName, lastName, username, email, role, password);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          firstName,
          lastName,
          username,
          email,
          role,
          password,
        }
      );
      console.log(response);
      if (response.status === 201) {
        navigate("/login");
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
                  <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your information!
                  </p>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      value={firstName}
                      onChange={handleFirstName}
                    />
                    <label className="form-label" for="typeEmailX">
                      First Name
                    </label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      value={lastName}
                      onChange={handleLastName}
                    />
                    <label className="form-label" for="typeEmailX">
                      Last Name
                    </label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      value={username}
                      onChange={handleUsername}
                    />
                    <label className="form-label" for="typeEmailX">
                      Username
                    </label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={handleEmail}
                    />
                    <label className="form-label" for="typeEmailX">
                      Email
                    </label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={handlePassword}
                    />
                    <label className="form-label" for="typePasswordX">
                      Password
                    </label>
                  </div>

                  <div className="mb-4">
                    <select
                      className="form-select form-select-sm "
                      aria-label=".form-select-sm example"
                      value={role}
                      onChange={handleRole}
                    >
                      {roles.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                    <label className="form-label" for="typePasswordX">
                      Role
                    </label>
                  </div>

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
