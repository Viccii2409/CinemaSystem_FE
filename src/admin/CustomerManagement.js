import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faClock } from '@fortawesome/free-solid-svg-icons';
import './CustomerManagement.css';
import { Link } from 'react-router-dom';

const CustomerManagement = () => {
    const customers = [
        {
            id: 1,
            name: 'Nguyen A',
            email: 'a@gmail.com',
            phone: '0945223553',
            city: 'Hà Nội',
        },
        {
            id: 2,
            name: 'Nguyen A',
            email: 'a@gmail.com',
            phone: '0945223553',
            city: 'Hà Nội',
        },
        {
            id: 3,
            name: 'Nguyen A',
            email: 'a@gmail.com',
            phone: '0945223553',
            city: 'Hà Nội',
        },
    ];

    return (
        <div className="customer-management">
            <h2>Quản lý khách hàng</h2>
            <div className="search-bar">
                <input type="text" placeholder="Tìm kiếm khách hàng" />
            </div>
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên KH</th>
                        <th>Email</th>
                        <th>SDT</th>
                        <th>Tỉnh/Thành phố</th>
                        <th>Thao tác</th>
                        <th>Lịch sử</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) => (
                        <tr key={customer.id}>
                            <td>{index + 1}</td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.city}</td>
                            <td>
                                <button className="action-button">
                                    <Link to="customer-detail">
                                        <FontAwesomeIcon icon={faEye} />
                                    </Link>
                                </button>
                            </td>
                            <td>
                                <button className="action-button">
                                    <FontAwesomeIcon icon={faClock} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerManagement;
