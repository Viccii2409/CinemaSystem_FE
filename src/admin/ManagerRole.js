import React, { useState, useEffect } from 'react'; // Thêm useEffect
import './TheaterManagement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { addRole, deleteRole, getAllPermission, getAllRole, updateRole } from '../config/UserConfig';

const ManagerRole = () => {
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        permission: [1, 2]
    });

    useEffect(() => {
        const fetchRole = async () => {
            const response_role = await getAllRole();
            // console.log(response_role);
            setRoles(response_role);
            const response_permission = await getAllPermission();
            // console.log(response_permission);
            setPermissions(response_permission);
        }
        fetchRole();
    }, []);

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const handleCloseModal = () => {
        setFormData({
            id: "",
            name: "",
            permission: [1, 2]
        });
        setShowAddModal(false);
        setShowEditModal(false);
    };

    const handlePermissionChange = (event) => {
        const { value, checked } = event.target;

        setFormData((prevFormData) => {
            const updatedPermissions = checked
                ? [...prevFormData.permission, Number(value)]
                : prevFormData.permission.filter((id) => id !== Number(value));

            return {
                ...prevFormData,
                permission: updatedPermissions,
            };
        });
    };

    const handleAdd = () => {
        setShowAddModal(true);
    }

    const handleEdit = (id) => {
        console.log(id);
        // Tìm dữ liệu quyền từ roles
        const permissionData = roles.find(entry => entry.id === id);
        console.log(permissionData.permissions);
        if (permissionData) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                id: permissionData.id,
                name: permissionData.name,
                permission: permissionData.permissions.map(permission => permission.id)
            }));
        }
        setShowEditModal(true);
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        const response_role = await addRole(formData);
        if (response_role) {
            setRoles((prevList) => [...prevList, response_role]);
            alert("Thêm vai trò thành công!");
        }
        else {
            alert("Thêm vai trò thất bại!");
        }
        handleCloseModal();
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const response_role = await updateRole(formData);
        if (response_role) {
            setRoles((prevList) =>
                prevList.map((role) =>
                    role.id === response_role.id ? response_role : role
                )
            );
            alert("Sửa vai trò thành công!");
        }
        else {
            alert("Sửa vai trò thất bại!");
        }
        handleCloseModal();
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Bạn có chắc muốn xóa vai trò không?");
        if (confirmed) {
            const response_check = await deleteRole(id);
            if(response_check){
                setRoles(prevList => prevList.filter(role => role.id !== parseInt(id)));
                alert("Vai trò đã được xóa thành công.");
            }
            else {
                alert("Lỗi khi xóa vai trò!");
            }
          } 

    }

    return (
        <div className="cinema-management-system">
            <h2>Quản lý vai trò và quyền</h2>
            <button className="add-button button" onClick={handleAdd}>Thêm</button>
            {roles.length > 0 ? (
                <table className="cinema-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên vai trò</th>
                            <th>Quyền</th>
                            <th>Số ND</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role, index) => (
                            <tr key={role.id}>
                                <td>{index + 1}</td>
                                <td>{role.name}</td>
                                <td>
                                    {role.permissions.length > 0 ? (
                                        <div>
                                            {role.permissions.map((permission, index2) => (
                                                <div key={index2}>{index2 + 1} : {permission.name}</div>
                                            ))}
                                        </div>
                                    ) : (
                                        "Không có quyền"
                                    )}
                                </td>
                                <td>{role.quantityUser}</td>
                                <td>

                                    <button className="edit-button"
                                        onClick={() => handleEdit(role.id)}
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    {role.quantityUser === 0 && (
                                        <button className="delete-button"
                                          onClick={() => handleDelete(role.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            ) : (
                <div>Không có vai trò</div>
            )}

            {showAddModal && (
                <>
                    <div className="modal-overlay" onClick={handleCloseModal}></div>
                    <div className="modal">
                        <div className="modal-header">Thêm vai trò mới</div>
                        <form
                            className="modal-info"
                            onSubmit={handleAddSubmit}
                        >
                            <div className="form-group">
                                <label>
                                    <strong>Tên vai trò: </strong>
                                    <input
                                        type="text"
                                        name="role"
                                        className="modal-input"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value.toUpperCase() })}
                                        required
                                    />
                                    <br />
                                </label>
                            </div>
                            <div className="form-group">
                                <label className='permission-label'>
                                    <strong>Quyền: </strong><br /><br />
                                    <div className="permission-group">
                                        {permissions.map((permission, index3) => (
                                            <div key={permission.id} className="permission-item">
                                                <input
                                                    type="checkbox"
                                                    name="permission"
                                                    value={permission.id}  // Thêm giá trị để dễ dàng theo dõi
                                                    className="modal-input"
                                                    checked={formData.permission.includes(permission.id)}
                                                    onChange={handlePermissionChange}
                                                />
                                                <span>{index3 + 1}:{permission.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <br />
                                </label>
                            </div>

                            <div className="modal-buttons">
                                <button type="button" className="close-button" onClick={handleCloseModal}>
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

            {showEditModal && (
                <>
                    <div className="modal-overlay" onClick={handleCloseModal}></div>
                    <div className="modal">
                        <div className="modal-header">Sửa vai trò</div>
                        <form
                            className="modal-info"
                            onSubmit={handleEditSubmit}
                        >
                            <div className="form-group">
                                <label>
                                    <strong>Tên vai trò: </strong>
                                    <input
                                        type="text"
                                        name="role"
                                        className="modal-input"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value.toUpperCase() })}
                                        required
                                    />
                                    <br />
                                </label>
                            </div>
                            <div className="form-group">
                                <label className='permission-label'>
                                    <strong>Quyền: </strong><br /><br />
                                    <div className="permission-group">
                                        {permissions.map((permission, index3) => (
                                            <div key={permission.id} className="permission-item">
                                                <input
                                                    type="checkbox"
                                                    name="permission"
                                                    value={permission.id}  // Thêm giá trị để dễ dàng theo dõi
                                                    className="modal-input"
                                                    onChange={handlePermissionChange}
                                                    checked={formData.permission.includes(permission.id)}
                                                />
                                                <span>{index3 + 1}:{permission.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <br />
                                </label>
                            </div>

                            <div className="modal-buttons">
                                <button type="button" className="close-button" onClick={handleCloseModal}>
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
export default ManagerRole;
