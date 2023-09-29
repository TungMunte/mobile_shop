import "../css/Login.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import axios from "axios";
import { v4 } from "uuid";

function ModifySmartphone() {
  const navigate = useNavigate();
  const authContext = useAuth();
  const { id } = useParams();

  const [completed, setCompleted] = useState(false);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageLoad, setImageLoad] = useState(true);
  const [imageCode, setImageCode] = useState("");
  const [process, setProcess] = useState(true);

  useEffect(() => {
    async function getSmartphone() {
      const response = await axios.get(
        `http://localhost:8080/api/smartphone/get/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authContext.accessToken}`,
          },
        }
      );
      setPrice(response.data.price);
      setImageCode(response.data.imageCode);
      setBrand(response.data.brand);
      setInternalMemory(response.data.internalMemory);
      setRam(response.data.ram);
      setScreenDimension(response.data.screenDimension);
      setTechnology(response.data.technology);
      console.log(response.data);
    }
    getSmartphone();
  }, []);

  const screenDimensions = [
    { value: "", text: "--Screen Dimension--" },
    { value: "5", text: "5" },
    { value: "6", text: "6" },
    { value: "7", text: "7" },
  ];
  const [screenDimension, setScreenDimension] = useState(
    screenDimensions[0].value
  );

  const brands = [
    { value: "", text: "--BRANDS--" },
    { value: "Iphone", text: "Iphone" },
    { value: "OPPO", text: "OPPO" },
    { value: "Samsung", text: "Samsung" },
    { value: "Xiaomi", text: "Xiaomi" },
  ];
  const [brand, setBrand] = useState(brands[0].value);

  const technologies = [
    { value: "", text: "--TECHNOLOGY--" },
    { value: "4G", text: "4G" },
    { value: "4G+", text: "4G+" },
    { value: "5G", text: "5G" },
  ];
  const [technology, setTechnology] = useState(technologies[0].value);

  const internalMemories = [
    { value: "", text: "--Internal Memory--" },
    { value: "16", text: "16" },
    { value: "32", text: "32" },
    { value: "64", text: "64" },
    { value: "128", text: "128" },
    { value: "256", text: "256" },
  ];
  const [internalMemory, setInternalMemory] = useState(
    internalMemories[0].value
  );

  const rams = [
    { value: "", text: "--RAM--" },
    { value: "2", text: "2" },
    { value: "4", text: "4" },
    { value: "8", text: "8" },
    { value: "12", text: "12" },
  ];
  const [ram, setRam] = useState(rams[0].value);

  function handlePrice(event) {
    setPrice(Number(event.target.value));
  }

  function handleScreenDimension(event) {
    setScreenDimension(event.target.value);
  }

  function handleBrand(event) {
    setBrand(event.target.value);
  }

  function handleTechnology(event) {
    setTechnology(event.target.value);
  }

  function handleInternalMemory(event) {
    setInternalMemory(event.target.value);
  }

  function handleRam(event) {
    setRam(event.target.value);
  }

  async function handleImage(event) {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      let data = new FormData();
      data.append("file", event.target.files[0]);
      const oldCode = imageCode;
      const code = v4();

      const newCode = code;
      const res = await axios.put(
        `http://localhost:8080/api/image/put/${id}/${oldCode}/${newCode}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authContext.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        setImageCode(code);
      }
    }
  }

  async function handleSubmit(event) {
    try {
      console.log(id);

      const response = await axios.put(
        `http://localhost:8080/api/smartphones/put/${id}`,
        {
          brand,
          technology,
          price,
          internalMemory,
          ram,
          screenDimension,
          imageCode,
        },
        {
          headers: {
            Authorization: `Bearer ${authContext.accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setCompleted(true);
      }
    } catch (e) {
      setImageLoad(false);
      console.log(e);
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
                {completed === false && (
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">
                      Modify product
                    </h2>
                    <p className="text-white-50 mb-5">
                      Please enter product's information
                    </p>

                    <div className="form-outline form-white mb-4">
                      {(price === "" || price === 0) && (
                        <p className="text-white-50 mb-5">add price</p>
                      )}
                      <input
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        value={price}
                        onChange={handlePrice}
                      />
                      <label className="form-label" for="typeEmailX">
                        Price
                      </label>
                    </div>

                    <div className="mb-4">
                      {brand === "" && (
                        <p className="text-white-50 mb-5">select brand</p>
                      )}
                      <select
                        className="form-select form-select-sm "
                        aria-label=".form-select-sm example"
                        value={brand}
                        onChange={handleBrand}
                      >
                        {brands.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                      <label className="form-label" for="typePasswordX">
                        Brand
                      </label>
                    </div>

                    <div className="mb-4">
                      {screenDimension === "" && (
                        <p className="text-white-50 mb-5">
                          select screen dimension
                        </p>
                      )}
                      <select
                        className="form-select form-select-sm "
                        aria-label=".form-select-sm example"
                        value={screenDimension}
                        onChange={handleScreenDimension}
                      >
                        {screenDimensions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                      <label className="form-label" for="typeEmailX">
                        Screen Dimension
                      </label>
                    </div>

                    <div className="mb-4">
                      {technology === "" && (
                        <p className="text-white-50 mb-5">select technology</p>
                      )}
                      <select
                        className="form-select form-select-sm "
                        aria-label=".form-select-sm example"
                        value={technology}
                        onChange={handleTechnology}
                      >
                        {technologies.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                      <label className="form-label" for="typePasswordX">
                        Technology
                      </label>
                    </div>

                    <div className="mb-4">
                      {internalMemory === "" && (
                        <p className="text-white-50 mb-5">
                          select internal memory
                        </p>
                      )}
                      <select
                        className="form-select form-select-sm "
                        aria-label=".form-select-sm example"
                        value={internalMemory}
                        onChange={handleInternalMemory}
                      >
                        {internalMemories.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                      <label className="form-label" for="typePasswordX">
                        Internal Memory
                      </label>
                    </div>

                    <div className="mb-4">
                      {ram === "" && (
                        <p className="text-white-50 mb-5">select ram</p>
                      )}
                      <select
                        className="form-select form-select-sm "
                        aria-label=".form-select-sm example"
                        value={ram}
                        onChange={handleRam}
                      >
                        {rams.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                      <label className="form-label" for="typePasswordX">
                        Ram
                      </label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <img
                        src={`http://localhost:8080/api/image/get/${imageCode}`}
                        style={{
                          width: "130px",
                          height: "130px",
                        }}
                        className="mb-5"
                      />

                      <input
                        type="file"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        onChange={handleImage}
                        name="image"
                        multiple
                      />
                    </div>

                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                      onClick={() => {
                        if (
                          price === "" ||
                          brand === "" ||
                          internalMemory === "" ||
                          ram === "" ||
                          screenDimension === "" ||
                          technology === "" ||
                          image === ""
                        ) {
                          setProcess(false);
                        } else {
                          setProcess(true);
                        }
                        if (process === true) {
                          handleSubmit();
                        }
                      }}
                    >
                      {(process === true && "Add") ||
                        (process === false && "check again")}
                    </button>
                  </div>
                )}
                {completed === true && (
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">
                      Modify success
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModifySmartphone;
