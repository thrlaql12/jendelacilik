import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  Row,
  Col,
  Card,
  Modal,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import '../../styles/managevideos.css'; // Pastikan path ini sesuai dengan struktur folder kamu

const { Title } = Typography;
const { Option } = Select;

export default function ManageVideos() {
  const [form] = Form.useForm();
  const [videos, setVideos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleSubmit = (values) => {
    if (editingId !== null) {
      const updated = videos.map((v) =>
        v.id === editingId ? { ...values, id: editingId } : v
      );
      setVideos(updated);
      message.success("Video berhasil diperbarui");
    } else {
      const newVideo = { ...values, id: Date.now() };
      setVideos([...videos, newVideo]);
      message.success("Video berhasil ditambahkan");
    }
    form.resetFields();
    setEditingId(null);
  };

  const handleEdit = (video) => {
    form.setFieldsValue(video);
    setEditingId(video.id);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Yakin ingin menghapus video ini?",
      okText: "Ya",
      okType: "danger",
      cancelText: "Tidak",
      onOk: () => {
        setVideos(videos.filter((v) => v.id !== id));
        message.success("Video berhasil dihapus");
      },
    });
  };

  const handlePreview = (url) => {
    setPreviewImage(url);
  };

  const handleCancelPreview = () => {
    setPreviewImage(null);
  };

  return (
    <div className="manage-videos-container">
      <Title level={2}>🎬 Kelola Video Anak</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Title level={4}>{editingId ? "Edit Video" : "Tambah Video Baru"}</Title>

        <Form.Item
          label="Judul Video"
          name="play_name"
          rules={[{ required: true, message: "Judul wajib diisi" }]}
        >
          <Input placeholder="Judul Video" />
        </Form.Item>

        <Form.Item
          label="Link YouTube"
          name="play_url"
          rules={[{ required: true, message: "Link video wajib diisi" }]}
        >
          <Input placeholder="https://youtube.com/..." />
        </Form.Item>

        <Form.Item
          label="Thumbnail URL"
          name="play_thumbnail"
          rules={[{ required: true, message: "Link thumbnail wajib diisi" }]}
        >
          <Input placeholder="Link Gambar Thumbnail" />
        </Form.Item>

        <Form.Item
          label="Genre"
          name="play_genre"
          rules={[{ required: true, message: "Pilih genre video" }]}
        >
          <Select>
            <Option value="music">Music</Option>
            <Option value="song">Song</Option>
            <Option value="movie">Movie</Option>
            <Option value="education">Education</Option>
            <Option value="others">Others</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Deskripsi" name="play_description">
          <Input.TextArea rows={3} placeholder="Deskripsi singkat" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={editingId ? <EditOutlined /> : <PlusOutlined />}
          >
            {editingId ? "Update Video" : "Tambah Video"}
          </Button>
          {editingId && (
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => {
                form.resetFields();
                setEditingId(null);
              }}
            >
              Batal
            </Button>
          )}
        </Form.Item>
      </Form>

      <Title level={4}>📋 Daftar Video</Title>

      <Row gutter={[16, 16]}>
        {videos.length === 0 ? (
          <p>Belum ada video ditambahkan.</p>
        ) : (
          videos.map((video) => (
            <Col key={video.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt={video.play_name}
                    src={video.play_thumbnail}
                    onClick={() => handlePreview(video.play_thumbnail)}
                  />
                }
                actions={[
                  <EditOutlined key="edit" onClick={() => handleEdit(video)} />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => handleDelete(video.id)}
                    style={{ color: "red" }}
                  />,
                ]}
              >
                <Card.Meta
                  title={video.play_name}
                  description={
                    <>
                      <p>🎞 Genre: {video.play_genre}</p>
                      <p>{video.play_description}</p>
                      <a href={video.play_url} target="_blank" rel="noreferrer">
                        🔗 Tonton Video
                      </a>
                    </>
                  }
                />
              </Card>
            </Col>
          ))
        )}
      </Row>

      <Modal
        open={!!previewImage}
        footer={null}
        onCancel={handleCancelPreview}
      >
        <img
          alt="Preview Thumbnail"
          src={previewImage}
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </Modal>
    </div>
  );
}
