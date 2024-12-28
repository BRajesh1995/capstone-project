import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import TheatreFormModal from "./TheatreFormModal";
import DeleteTheatreModal from "./DeleteTheatreModal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllTheatres } from "../../api/theatre";
import { useSelector, useDispatch } from "react-redux";
import { ShowLoading, HideLoading, Spinner } from "../../redux/loaderSlice"; // Added Spinner
import ShowModal from "./ShowModal";

const TheatreList = () => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [formType, setFormType] = useState("add");

  // Theatre Data
  const [theatres, setTheatres] = useState(null);

  const getData = async () => {
    try {
      dispatch(ShowLoading()); // Show spinner when fetching data
      const response = await getAllTheatres(user._id);
      if (response.success) {
        const allTheatres = response.data;
        console.log(allTheatres);
        setTheatres(
          allTheatres.map((item) => ({
            ...item,
            key: `theatre${item._id}`,
          }))
        );
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading()); // Hide spinner after fetching data
    } catch (err) {
      dispatch(HideLoading()); // Ensure spinner is hidden on error
      message.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, data) =>
        data.isActive ? "Approved" : "Pending/Blocked",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => (
        <div className="d-flex align-items-center gap-10">
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setFormType("edit");
              setSelectedTheatre(data);
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            onClick={() => {
              setIsDeleteModalOpen(true);
              setSelectedTheatre(data);
            }}
          >
            <DeleteOutlined />
          </Button>
          {data.isActive && (
            <Button
              onClick={() => {
                setIsShowModalOpen(true);
                setSelectedTheatre(data);
              }}
            >
              + Shows
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Spinner />
      <div className="d-flex justify-content-end">
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            setFormType("add");
          }}
        >
          Add Theatre
        </Button>
      </div>
      <Table dataSource={theatres} columns={columns} />
      {isModalOpen && (
        <TheatreFormModal
          isModalOpen={isModalOpen}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
          setIsModalOpen={setIsModalOpen}
          formType={formType}
          getData={getData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteTheatreModal
          isDeleteModalOpen={isDeleteModalOpen}
          selectedTheatre={selectedTheatre}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setSelectedTheatre={setSelectedTheatre}
          getData={getData}
        />
      )}
      {isShowModalOpen && (
        <ShowModal
          isShowModalOpen={isShowModalOpen}
          setIsShowModalOpen={setIsShowModalOpen}
          selectedTheatre={selectedTheatre}
        />
      )}
    </>
  );
};

export default TheatreList;
