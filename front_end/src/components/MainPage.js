import "../css/Demo.css";
import Pagination from "react-bootstrap/Pagination";
import { useState, useEffect } from "react";
import SmartPhone from "../cards/Smartphone";
import { useAuth } from "../security/AuthContext";
import axios from "axios";

function MainPage() {
  const authContext = useAuth();
  const [pageNo, setPageNo] = useState(0);
  const [smartphones, setSmartPhones] = useState([]);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [checkedBrandList, setCheckedBrandList] = useState([]);
  const listBrand = [
    { id: "1", value: "Iphone" },
    { id: "2", value: "OPPO" },
    { id: "3", value: "Samsung" },
    { id: "4", value: "Xiaomi" },
  ];
  const [checkedTechnologyList, setCheckedTechnologyList] = useState([]);
  const listTechnology = [
    { id: "1", value: "4G" },
    { id: "2", value: "4G+" },
    { id: "3", value: "5G" },
  ];
  const [checkedInternalMemoryList, setCheckedInternalMemoryList] = useState(
    []
  );
  const listInternalMemory = [
    { id: "1", value: "16" },
    { id: "2", value: "32" },
    { id: "3", value: "64" },
    { id: "4", value: "128" },
    { id: "5", value: "256" },
  ];
  const [checkedRamList, setCheckedRamList] = useState([]);
  const listRam = [
    { id: "1", value: "2" },
    { id: "2", value: "4" },
    { id: "3", value: "8" },
    { id: "4", value: "12" },
  ];
  const [checkedScreenDimensionList, setCheckedScreenDimensionList] = useState(
    []
  );
  const listScreenDimension = [
    { id: "1", value: "5" },
    { id: "2", value: "6" },
    { id: "3", value: "7" },
  ];

  useEffect(() => {
    async function getSmartPhones() {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/smartphones/get/${pageNo}`,
          {
            min: min,
            max: max,
            brand: checkedBrandList,
            ram: checkedRamList,
            technology: checkedTechnologyList,
            internalMemory: checkedInternalMemoryList,
            screenDimension: checkedScreenDimensionList,
          }
        );
        setSmartPhones(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSmartPhones();
  }, [pageNo]);

  async function getSmartPhones() {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/smartphones/get/${pageNo}`,
        {
          min: min,
          max: max,
          brand: checkedBrandList,
          ram: checkedRamList,
          technology: checkedTechnologyList,
          internalMemory: checkedInternalMemoryList,
          screenDimension: checkedScreenDimensionList,
        }
      );
      setSmartPhones(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleBrandSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      //Add checked item into checkList
      setCheckedBrandList([...checkedBrandList, value]);
    } else {
      //Remove unchecked item from checkList
      const filteredList = checkedBrandList.filter((item) => item !== value);
      setCheckedBrandList(filteredList);
    }
  };

  const handleTechnologySelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      //Add checked item into checkList
      setCheckedTechnologyList([...checkedTechnologyList, value]);
    } else {
      //Remove unchecked item from checkList
      const filteredList = checkedTechnologyList.filter(
        (item) => item !== value
      );
      setCheckedTechnologyList(filteredList);
    }
  };

  const handleInternalMemorySelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      //Add checked item into checkList
      setCheckedInternalMemoryList([...checkedInternalMemoryList, value]);
    } else {
      //Remove unchecked item from checkList
      const filteredList = checkedInternalMemoryList.filter(
        (item) => item !== value
      );
      setCheckedInternalMemoryList(filteredList);
    }
  };

  const handleRamSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      //Add checked item into checkList
      setCheckedRamList([...checkedRamList, value]);
    } else {
      //Remove unchecked item from checkList
      const filteredList = checkedRamList.filter((item) => item !== value);
      setCheckedRamList(filteredList);
    }
  };

  const handleScreenDimensionSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      //Add checked item into checkList
      setCheckedScreenDimensionList([...checkedScreenDimensionList, value]);
    } else {
      //Remove unchecked item from checkList
      const filteredList = checkedScreenDimensionList.filter(
        (item) => item !== value
      );
      setCheckedScreenDimensionList(filteredList);
    }
  };

  const handleMin = (event) => {
    setMin(Number(event.target.value));
  };
  const handleMax = (event) => {
    setMax(Number(event.target.value));
  };
  const handlerCurrentPage = (value) => {
    setPageNo(value);
  };
  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-8 order-md-2 col-lg-9">
          <div className="container-fluid">
            <div className="row">
              {smartphones.map((smartphone) => (
                <SmartPhone
                  name={smartphone.name}
                  price={smartphone.price}
                  imageCode={smartphone.imageCode}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-4 order-md-1 col-lg-3 sidebar-filter">
          <h6 className="text-uppercase mt-3 mb-3 font-weight-bold">Brand</h6>
          {listBrand.map((item, index) => {
            return (
              <div key={item.id} className="mt-2 mb-2 pl-2">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="filter-size-1"
                    value={item.value}
                    onChange={handleBrandSelect}
                  />
                  <label
                    className="custom-control-label"
                    for="filter-size-1"
                    style={{ marginLeft: "5px" }}
                  >
                    {item.value}
                  </label>
                </div>
              </div>
            );
          })}

          <div className="divider mt-3 mb-3 border-bottom border-secondary"></div>
          <h6 className="text-uppercase mt-3 mb-3 font-weight-bold">
            Technology
          </h6>
          {listTechnology.map((item, index) => {
            return (
              <div key={item.id} className="mt-2 mb-2 pl-2">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="filter-size-1"
                    value={item.value}
                    onChange={handleTechnologySelect}
                  />
                  <label
                    className="custom-control-label"
                    for="filter-size-1"
                    style={{ marginLeft: "5px" }}
                  >
                    {item.value}
                  </label>
                </div>
              </div>
            );
          })}

          <div className="divider mt-3 mb-3 border-bottom border-secondary"></div>
          <h6 className="text-uppercase mt-3 mb-3 font-weight-bold">
            Internal Memory
          </h6>
          {listInternalMemory.map((item, index) => {
            return (
              <div key={item.id} className="mt-2 mb-2 pl-2">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="filter-size-1"
                    value={item.value}
                    onChange={handleInternalMemorySelect}
                  />
                  <label
                    className="custom-control-label"
                    for="filter-size-1"
                    style={{ marginLeft: "5px" }}
                  >
                    {item.value}
                  </label>
                </div>
              </div>
            );
          })}

          <div className="divider mt-3 mb-3 border-bottom border-secondary"></div>
          <h6 className="text-uppercase mt-3 mb-3 font-weight-bold">Ram</h6>
          {listRam.map((item, index) => {
            return (
              <div key={item.id} className="mt-2 mb-2 pl-2">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="filter-size-1"
                    value={item.value}
                    onChange={handleRamSelect}
                  />
                  <label
                    className="custom-control-label"
                    for="filter-size-1"
                    style={{ marginLeft: "5px" }}
                  >
                    {item.value}
                  </label>
                </div>
              </div>
            );
          })}

          <div className="divider mt-3 mb-3 border-bottom border-secondary"></div>
          <h6 className="text-uppercase mt-3 mb-3 font-weight-bold">
            Screen Dimension
          </h6>
          {listScreenDimension.map((item, index) => {
            return (
              <div key={item.id} className="mt-2 mb-2 pl-2">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="filter-size-1"
                    value={item.value}
                    onChange={handleScreenDimensionSelect}
                  />
                  <label
                    className="custom-control-label"
                    for="filter-size-1"
                    style={{ marginLeft: "5px" }}
                  >
                    {item.value}
                  </label>
                </div>
              </div>
            );
          })}

          <div className="divider mt-3 mb-3 border-bottom border-secondary"></div>
          <h6 className="text-uppercase mt-3 mb-3 font-weight-bold">Price</h6>
          <div className="price-filter-control">
            <input
              type="number"
              className="form-control w-50 pull-left mb-2"
              value={min}
              onChange={handleMin}
              id="price-min-control"
            />
            <input
              type="number"
              className="form-control w-50 pull-right"
              value={max}
              onChange={handleMax}
              id="price-max-control"
            />
          </div>
          <div className="divider mt-3 mb-3 border-bottom border-secondary"></div>
          <btn
            className="btn btn-lg btn-block btn-primary mt-5"
            onClick={getSmartPhones}
          >
            Update Results
          </btn>
        </div>
      </div>
      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={() => handlerCurrentPage(pageNo - 1)} />
        <Pagination.Item onClick={() => handlerCurrentPage(pageNo)}>
          {pageNo}
        </Pagination.Item>
        <Pagination.Next onClick={() => handlerCurrentPage(pageNo + 1)} />
      </Pagination>
    </div>
  );
}

export default MainPage;
