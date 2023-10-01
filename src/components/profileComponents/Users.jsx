import { SetLoading } from "@/redux/loadersSlice";
import { Select, Table, message } from "antd";
import axios from "axios";
import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";

function Users() {
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/users");
      setUsers(response.data.data);
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const onUserUpdate = async (id, isActive) => {
    try {
      dispatch(SetLoading(true));
      await axios.put(`/api/users/${id}`, { isActive });
      message.success("User updated successfully");
      getData();
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY hh:mm A"),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (updatedAt) => moment(updatedAt).format("DD/MM/YYYY hh:mm A"),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (isActive, record) => (
        <Select
          value={isActive}
          options={[
            {
              value: true,
              label: "true",
            },
            {
              value: false,
              label: "false",
            },
          ]}
          onChange={(value) => onUserUpdate(record._id, value)}></Select>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={users} columns={columns} rowKey="_id" />
    </div>
  );
}

export default Users;
