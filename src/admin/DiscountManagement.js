import React, { useEffect, useState } from 'react';
import './TheaterManagement.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { addDiscount, deleteDiscount, editDiscount, getAllDiscount, getTypeDiscount, updateStatusDiscount } from '../config/TicketConfig.js';

const DiscountManagement = () => {
  const [discounts, setDiscounts] = useState([]);
  const [typeDiscounts, setTypeDiscounts] = useState([]);


  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response_typediscount = await getTypeDiscount();
        setTypeDiscounts(response_typediscount);
        const response_discount = await getAllDiscount();
        setDiscounts(response_discount);
      } catch (error) {
        console.error("Error api", error);
      }
    };

    fetchDiscount();
  }, []);



  const [formDataState, setFormDataState] = useState({
    id: "",
    name: "",
    typeDiscountid: "",
    reducedValue: "",
    discountCode: "",
    start: "",
    end: "",
    description: "",
    image: null,
    status: ""
  });


  const handleCloseModal = () => {
    setFormDataState({
      id: "",
      name: "",
      typeDiscountid: "",
      reducedValue: "",
      discountCode: "",
      start: "",
      end: "",
      description: "",
      image: null,
      status: ""
    });
    setShowAddModal(false);
    setShowViewModal(false);
    setShowEditModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataState({
      ...formDataState,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormDataState({
      ...formDataState,
      image: e.target.files[0],
    });
  };

  const validateFormData = (data) => {
    let check = true;

    // Kiểm tra tên rạp (name)
    if (!data.name || data.name.trim() === "") {
      check = false;
    }

    // Kiểm tra số điện thoại (phone)
    if (!data.reducedValue) {
      check = false;
    }

    // Kiểm tra email (email)
    if (!data.discountCode || data.discountCode.trim() === "") {
      check = false;
    }

    // Kiểm tra địa chỉ chi tiết (address)
    if (!data.start || data.start.trim() === "") {
      check = false;
    }

    // Kiểm tra xã (ward)
    if (!data.end || data.end.trim() === "") {
      check = false;
    }

    if (!data.image) {
      check = false;
    }

    if (!check) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return false;
    }
    return true;
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateFormData(formDataState)) {
        return;
      }
      const newDiscount = await addDiscount(formDataState);
      setDiscounts((prevList) => [...prevList, newDiscount]);
      setFormDataState({
        id: "",
        name: "",
        typeDiscountid: "",
        reducedValue: "",
        discountCode: "",
        start: "",
        end: "",
        description: "",
        image: null,
        status: ""
      });

      handleCloseModal();
      alert("Thêm ưu đãi thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm ưu đãi:", error);
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      await updateStatusDiscount(id);
      setDiscounts(
        discounts.map((discount) =>
          discount.id === id ? { ...discount, status: updatedStatus } : discount
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };

  const handleView = (id) => {
    if (!id) {
      console.error("ID không hợp lệ:", id);
      return;
    }
    const discountData = discounts.find(discount => discount.id === id);
    setFormDataState({
      id: discountData.id || "",
      name: discountData.name || "",
      typeDiscountid: discountData.typeDiscount?.id || "",
      reducedValue: discountData.reducedValue || "",
      discountCode: discountData.discountCode || "",
      start: discountData.start || "",
      end: discountData.end || "",
      description: discountData.description || "",
      image: discountData.image || null,
      status: discountData.status || ""
    });
    setShowViewModal(true);
  };

  const handleEdit = (id) => {
    if (!id) {
      console.error("ID không hợp lệ:", id);
      return;
    }
    const discountData = discounts.find(discount => discount.id === id);
    setFormDataState({
      id: discountData.id || "",
      name: discountData.name || "",
      typeDiscountid: discountData.typeDiscount?.id || "",
      reducedValue: discountData.reducedValue || "",
      discountCode: discountData.discountCode || "",
      start: discountData.start || "",
      end: discountData.end || "",
      description: discountData.description || "",
      image: discountData.image || null,
      status: discountData.status || ""
    });
    setShowEditModal(true);

  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateFormData(formDataState)) {
        return;
      }
      const updateDicount = await editDiscount(formDataState);
      setDiscounts((prevList) =>
        prevList.map((discount) =>
          discount.id === updateDicount.id ? updateDicount : discount
        )
      );
      setFormDataState({
        id: "",
        name: "",
        typeDiscountid: "",
        reducedValue: "",
        discountCode: "",
        start: "",
        end: "",
        description: "",
        image: null,
        status: ""
      });

      handleCloseModal();
      alert("Sửa ưu đãi thành công!");
    } catch (error) {
      console.error("Lỗi khi sửa ưu đãi:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa ưu đãi không?");
    if (confirmed) {
      await deleteDiscount(id);
      setDiscounts(prevDiscounts => prevDiscounts.filter(discount => discount.id !== parseInt(id)));
      alert("Ưu đãi đã được xóa thành công.");
    } else {
      alert("Hủy xóa ưu đãi.");
    }

  }

  return (
    <div className="cinema-management-system">
      <h2>Quản lý ưu đãi</h2>
      <button className="add-button button" onClick={handleAdd}>Thêm</button>

      {discounts.length > 0 ? (
        <table className="cinema-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Mã</th>
              <th>Giá trị</th>
              <th>Loại</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount, index) => (
              <tr key={discount.id}>
                <td>{index + 1}</td>
                <td>{discount.name}</td>
                <td>{discount.discountCode}</td>
                <td>{discount.reducedValue}</td>
                <td>{discount.typeDiscount?.name}</td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={discount.status}
                      onChange={() => handleStatusChange(discount.id, discount.status)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td>
                  <button className="view-button" onClick={() => handleView(discount.id)}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="edit-button" onClick={() => handleEdit(discount.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(discount.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>) : (
        <p>Không có ưu đãi</p>
      )}

      {showAddModal && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <div className="modal-header">Thêm ưu đãi mới</div>
            <form
              className="modal-info"
              onSubmit={handleAddSubmit}
              encType="multipart/form-data"
            >
              <div className="form-group">
                <div className="form-group form-row">
                  <div className="form-column">
                    <label>
                      <strong>Tên:</strong>
                      <input
                        type="text"
                        name="name"
                        className="modal-input"
                        value={formDataState.name}
                        onChange={handleChange}
                      />
                      <br />
                    </label>
                  </div>
                  <div className="form-column">
                    <label>
                      <strong>Loại ưu đãi:</strong>
                      <select name="typeDiscountid" className="modal-input" value={formDataState.typeDiscountid || ''} onChange={handleChange}>
                        <option value="" disabled>---Chọn loại ưu đãi---</option>
                        {typeDiscounts.map(type => (
                          <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                      </select>
                      <br />
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group form-row">
                <div className="form-column">
                  <label>
                    <strong>Ngày bắt đầu:</strong>
                    <input
                      type="date"
                      name="start"
                      className="modal-input"
                      value={formDataState.start}
                      onChange={handleChange}
                    />
                    <br />
                  </label>
                </div>
                <div className="form-column">
                  <label>
                    <strong>Ngày kết thúc:</strong>
                    <input
                      type="date"
                      name="end"
                      className="modal-input"
                      value={formDataState.end}
                      onChange={handleChange}
                    />
                    <br />
                  </label>
                </div>
              </div>

              <div className="form-group form-row">
                <div className="form-column">
                  <label>
                    <strong>Giá trị giảm:</strong>
                    <input
                      type="text"
                      name="reducedValue"
                      className="modal-input"
                      value={formDataState.reducedValue}
                      onChange={handleChange}
                    />
                    <br />
                  </label>
                </div>
                <div className="form-column">
                  <label>
                    <strong>Mã giảm giá:</strong>
                    <input
                      type="text"
                      name="discountCode"
                      className="modal-input"
                      value={formDataState.discountCode}
                      onChange={handleChange}
                    />
                    <br />
                  </label>
                </div>
              </div>

              <div className="form-group form-row">
                <div className="form-column">
                  <label>
                    <strong>Hình ảnh:</strong>
                    <input
                      type="file"
                      name="image"
                      className="modal-input"
                      onChange={handleFileChange}
                    />
                    <br />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <strong>Mô tả:</strong>
                  <textarea
                    name="description"
                    className="modal-input"
                    rows="10"
                    value={formDataState.description}
                    onChange={handleChange}
                  ></textarea>
                  <br />
                </label>
              </div>

              <div className="modal-buttons">
                <button className="close-button" onClick={handleCloseModal}>
                  Hủy
                </button>
                <button className="save-button" type="submit">
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {showViewModal && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <div className="modal-header">Xem ưu đãi</div>
            <form
              className="modal-info"
            >
              <div className="form-group">

                <div className="form-group form-row">
                  <div className="form-column">
                    <label>
                      <strong>Hình ảnh:</strong>
                      <img
                        src={formDataState.image}
                        alt="discount"
                        className="modal-image"
                      />
                      <br />
                    </label>
                  </div>
                </div>
                <div className="form-group form-row">
                  <div className="form-column">
                    <label>
                      <strong>Tên:</strong>
                      <input
                        type="text"
                        name="name"
                        className="modal-input"
                        value={formDataState.name}
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                  <div className="form-column">
                    <label>
                      <strong>Loại ưu đãi:</strong>
                      <select name="typeDiscountid"
                        className="modal-input"
                        value={formDataState.typeDiscountid || ''}
                        disabled>
                        <option value="" disabled>---Chọn loại ưu đãi---</option>
                        {typeDiscounts.map(type => (
                          <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                      </select>
                      <br />
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group form-row">
                <div className="form-column">
                  <label>
                    <strong>Ngày bắt đầu:</strong>
                    <input
                      type="date"
                      name="start"
                      className="modal-input"
                      value={formDataState.start}
                      readOnly
                    />
                    <br />
                  </label>
                </div>
                <div className="form-column">
                  <label>
                    <strong>Ngày kết thúc:</strong>
                    <input
                      type="date"
                      name="end"
                      className="modal-input"
                      value={formDataState.end}
                      readOnly
                    />
                    <br />
                  </label>
                </div>
              </div>

              <div className="form-group form-row">
                <div className="form-column">
                  <label>
                    <strong>Giá trị giảm:</strong>
                    <input
                      type="text"
                      name="reducedValue"
                      className="modal-input"
                      value={formDataState.reducedValue}
                      readOnly
                    />
                    <br />
                  </label>
                </div>
                <div className="form-column">
                  <label>
                    <strong>Mã giảm giá:</strong>
                    <input
                      type="text"
                      name="discountCode"
                      className="modal-input"
                      value={formDataState.discountCode}
                      readOnly
                    />
                    <br />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <strong>Mô tả:</strong>
                  <textarea
                    name="description"
                    className="modal-input"
                    rows="10"
                    value={formDataState.description}
                    readOnly
                  ></textarea>
                  <br />
                </label>
              </div>

              <div className="modal-buttons">
                <button className="close-button" onClick={handleCloseModal}>
                  Thoát
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {showEditModal && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <div className="modal-header">Sửa ưu đãi</div>
            <form
              className="modal-info"
              onSubmit={handleEditSubmit}
              encType="multipart/form-data"
            >
              <div className="form-group">
                <div className="form-group form-row">
                  <div className="form-column">
                    <label>
                      <strong>Tên:</strong>
                      <input
                        type="text"
                        name="name"
                        className="modal-input"
                        value={formDataState.name}
                        onChange={handleChange}
                      />
                      <br />
                    </label>
                  </div>
                  <div className="form-column">
                    <label>
                      <strong>Loại ưu đãi:</strong>
                      <select name="typeDiscountid" className="modal-input" value={formDataState.typeDiscountid || ''} onChange={handleChange}>
                        <option value="" disabled>---Chọn loại ưu đãi---</option>
                        {typeDiscounts.map(type => (
                          <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                      </select>
                      <br />
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group form-row">
                <div className="form-column">
                  <label>
                    <strong>Ngày bắt đầu:</strong>
                    <input
                      type="date"
                      name="start"
                      className="modal-input"
                      value={formDataState.start}
                      onChange={handleChange}
                    />
                    <br />
                  </label>
                </div>
                <div className="form-column">
                  <label>
                    <strong>Ngày kết thúc:</strong>
                    <input
                      type="date"
                      name="end"
                      className="modal-input"
                      value={formDataState.end}
                      onChange={handleChange}
                    />
                    <br />
                  </label>
                </div>
              </div>

              <div className="form-group form-row">
                <div className="form-column">
                  <label>
                    <strong>Giá trị giảm:</strong>
                    <input
                      type="text"
                      name="reducedValue"
                      className="modal-input"
                      value={formDataState.reducedValue}
                      onChange={handleChange}
                    />
                    <br />
                  </label>
                </div>
                <div className="form-column">
                  <label>
                    <strong>Mã giảm giá:</strong>
                    <input
                      type="text"
                      name="discountCode"
                      className="modal-input"
                      value={formDataState.discountCode}
                      onChange={handleChange}
                    />
                    <br />
                  </label>
                </div>
              </div>

              <div className="form-group form-row">
              <div className="form-column">
                <img src={formDataState.image} alt="Theater" className="modal-image_2" />

              </div>
                <div className="form-column">
                  <label>
                    <strong>Hình ảnh:</strong>
                    <input
                      type="file"
                      name="image"
                      className="modal-input"
                      onChange={handleFileChange}
                    />
                    <br />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <strong>Mô tả:</strong>
                  <textarea
                    name="description"
                    className="modal-input"
                    rows="10"
                    value={formDataState.description}
                    onChange={handleChange}
                  ></textarea>
                  <br />
                </label>
              </div>

              <div className="modal-buttons">
                <button className="close-button" onClick={handleCloseModal}>
                  Hủy
                </button>
                <button className="save-button" type="submit">
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </>
      )}


    </div>
  );
};

export default DiscountManagement; 
