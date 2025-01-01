import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getAllDiscount } from "../config/TicketConfig.js";
import { TheaterContext } from "../context/TheaterContext.js";
import "./Discount.css";
const Discount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, theaterid } = location.state || {};
  const [discounts, setDiscounts] = useState([]);
  const { selectedTheater, setSelectedTheater } = useContext(TheaterContext);
  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await getAllDiscount();
        setDiscounts(response); // Lưu dữ liệu vào state cinemas
      } catch (error) {
        console.error("Lỗi khi lấy danh sách Ưu đãi:", error);
      }
    };

    fetchDiscount(); // Gọi hàm fetchTheater khi component được render lần đầu
  });
  const [showDiscountModal, setDiscountModal] = useState(false);
  const [selectedDiscountId, setSelectedDiscountId] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const handleDiscountModal = (id) => {
    const selected = discounts.find((discount) => discount.id === id);
    setSelectedDiscount(selected);
    setSelectedDiscountId(id);
    setDiscountModal(true);
  };

  const closeDiscountModal = () => {
    setDiscountModal(false);
    setSelectedDiscountId(null);
    setSelectedDiscount(null);
  };
  return (
    <div className="homepage">
      <section id="discount-section" className="promotions-section">
        <div className="category">
          <h2>ƯU ĐÃI</h2>
        </div>
        <div className="promotion-carousel">
          {discounts.map((discount, index) => (
            <div className="discount-item" key={discount.id}>
              <img
                src={discount.image}
                alt="discount"
                className="discount-image"
                onClick={() => handleDiscountModal(discount.id)}
              ></img>

              <div className="dis-title">
                <Link to="/discount" state={{ id: discount.id }}>
                  {" "}
                  <h3 onClick={() => handleDiscountModal(discount.id)}>
                    {discount.name}
                  </h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      {showDiscountModal && selectedDiscount && (
        <div className="showtime-overlay2">
          <div className="showtime-modal2">
            <button className="close-button" onClick={closeDiscountModal}>
              &times;
            </button>
            <img
              src={selectedDiscount.image}
              style={{ width: "250px", height: "150px" }}
            />
            <div className="showtime-des">
              <h2>{selectedDiscount.name}</h2>
              <p>{selectedDiscount.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Discount;
