// src/pages/user/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RightOutlined,
  EditOutlined,
  DeleteOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  List,
  Input,
  Button,
  Rate,
  Modal,
  message,
} from "antd";
import Banner from "../../components/banner";
import "../../styles/home.css";

const Home = () => {
  const navigate = useNavigate();
  const previewBooks = Array(4).fill({});
  const previewVideos = Array(4).fill({});
  const username = "user123"; // Simulasi user aktif

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleSubmitComment = () => {
    if (!newComment || rating === 0) {
      message.warning("Isi komentar dan rating terlebih dahulu");
      return;
    }

    const comment = {
      user: username,
      text: newComment,
      rating: rating,
      date: new Date().toLocaleString(),
    };

    setComments([comment, ...comments]);
    setNewComment("");
    setRating(0);
    message.success("Komentar berhasil ditambahkan!");
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingText(comments[index].text);
  };

  const handleSaveEdit = () => {
    const updated = [...comments];
    updated[editingIndex].text = editingText;
    updated[editingIndex].date = new Date().toLocaleString();
    setComments(updated);
    setEditingIndex(null);
    setEditingText("");
    message.success("Komentar berhasil diedit!");
  };

  const handleDelete = (index) => {
    Modal.confirm({
      title: "Hapus Komentar?",
      content: "Apakah kamu yakin ingin menghapus komentar ini?",
      okText: "Hapus",
      okType: "danger",
      cancelText: "Batal",
      onOk: () => {
        const updated = [...comments];
        updated.splice(index, 1);
        setComments(updated);
        message.success("Komentar berhasil dihapus!");
      },
    });
  };

  return (
    <div className="home-container">
      {/* Banner Carousel */}
      <Banner />

      {/* Intro Section */}
      <div className="home-intro">
        <h2>🌟 Selamat Datang!</h2>
        <p>
          Yuk belajar sambil bermain! Temukan cerita seru dan video lagu anak
          yang edukatif dan menyenangkan.
        </p>
      </div>

      {/* Buku Cerita */}
      <div className="section-preview">
        <div className="section-title-row">
          <h3>Buku Cerita</h3>
        </div>
        <div className="preview-wrapper">
          <div className="preview-list">
            {previewBooks.map((_, index) => (
              <div className="preview-card" key={index}></div>
            ))}
          </div>
          <div
            className="arrow-button"
            onClick={() => navigate("/user/books")}
          >
            <RightOutlined />
          </div>
        </div>
      </div>

      {/* Video Anak */}
      <div className="section-preview">
        <div className="section-title-row">
          <h3>Video Anak</h3>
        </div>
        <div className="preview-wrapper">
          <div className="preview-list">
            {previewVideos.map((_, index) => (
              <div className="preview-card" key={index}></div>
            ))}
          </div>
          <div
            className="arrow-button"
            onClick={() => navigate("/user/playlist")}
          >
            <RightOutlined />
          </div>
        </div>
      </div>

      {/* Komentar Pengguna */}
      <div className="comment-section">
        <h2>💬 Komentar Pengguna</h2>

        <Input.TextArea
          rows={3}
          placeholder="Tulis komentar..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <Rate value={rating} onChange={(value) => setRating(value)} />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSubmitComment}
          >
            Kirim
          </Button>
        </div>

        <List
          itemLayout="horizontal"
          dataSource={comments}
          style={{ marginTop: 24 }}
          renderItem={(item, index) => (
            <List.Item
              actions={
                item.user === username
                  ? [
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </Button>,
                      <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleDelete(index)}
                      >
                        Hapus
                      </Button>,
                    ]
                  : []
              }
            >
              <List.Item.Meta
                title={
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{item.user}</span>
                    <span style={{ fontSize: 12, color: "#888" }}>{item.date}</span>
                  </div>
                }
                description={
                  editingIndex === index ? (
                    <div>
                      <Input.TextArea
                        rows={2}
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                      />
                      <div style={{ marginTop: 8 }}>
                        <Button
                          type="primary"
                          size="small"
                          onClick={handleSaveEdit}
                        >
                          Simpan
                        </Button>{" "}
                        <Button
                          size="small"
                          onClick={() => setEditingIndex(null)}
                        >
                          Batal
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p>{item.text}</p>
                      <Rate disabled defaultValue={item.rating} />
                    </>
                  )
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Home;
