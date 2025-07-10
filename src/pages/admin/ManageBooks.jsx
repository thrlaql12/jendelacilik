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
  Upload,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FilePdfOutlined,
  BookOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

export default function ManageBooks() {
  const [form] = Form.useForm();
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleSubmit = (values) => {
    if (!values.book_pdf || !values.book_thumbnail) {
      return message.error("Thumbnail dan file buku wajib diupload!");
    }

    const filePDF = values.book_pdf[0]?.originFileObj;
    const fileThumb = values.book_thumbnail[0]?.thumbUrl || values.book_thumbnail[0]?.url;

    if (filePDF.size > 10 * 1024 * 1024) {
      return message.error("Ukuran file PDF maksimal 10MB!");
    }

    const newBook = {
      id: editingId || Date.now(),
      book_title: values.book_title,
      book_genre: values.book_genre,
      book_description: values.book_description,
      book_pdf: filePDF.name,
      book_thumbnail: fileThumb,
    };

    if (editingId) {
      setBooks(books.map((b) => (b.id === editingId ? newBook : b)));
      message.success("Buku berhasil diperbarui");
    } else {
      setBooks([...books, newBook]);
      message.success("Buku berhasil ditambahkan");
    }

    form.resetFields();
    setEditingId(null);
  };

  const handleEdit = (book) => {
    form.setFieldsValue({
      book_title: book.book_title,
      book_genre: book.book_genre,
      book_description: book.book_description,
      book_pdf: [{ name: book.book_pdf }],
      book_thumbnail: [{ url: book.book_thumbnail }],
    });
    setEditingId(book.id);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Yakin ingin menghapus buku ini?",
      okText: "Ya",
      okType: "danger",
      cancelText: "Tidak",
      onOk: () => {
        setBooks(books.filter((b) => b.id !== id));
        message.success("Buku berhasil dihapus");
      },
    });
  };

  const handlePreview = (url) => {
    setPreviewImage(url);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>📚 Kelola Buku Cerita</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{
          backgroundColor: "#f4faff",
          padding: "24px",
          borderRadius: "12px",
          marginBottom: "32px",
        }}
      >
        <Title level={4}>{editingId ? "Edit Buku" : "Tambah Buku Baru"}</Title>

        <Form.Item
          label="Judul Buku"
          name="book_title"
          rules={[{ required: true, message: "Judul wajib diisi" }]}
        >
          <Input placeholder="Judul Buku" />
        </Form.Item>

        <Form.Item
          label="Upload File Buku (PDF)"
          name="book_pdf"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "File PDF wajib diupload" }]}
        >
          <Upload
            beforeUpload={() => false}
            accept=".pdf"
            maxCount={1}
            listType="text"
          >
            <Button icon={<UploadOutlined />}>Upload PDF</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Upload Gambar Sampul"
          name="book_thumbnail"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Sampul wajib diupload" }]}
        >
          <Upload
            beforeUpload={() => false}
            listType="picture-card"
            accept="image/*"
            maxCount={1}
            onPreview={(file) =>
              handlePreview(file.thumbUrl || file.url || "")
            }
          >
            Upload Sampul
          </Upload>
        </Form.Item>

        <Form.Item
          label="Genre"
          name="book_genre"
          rules={[{ required: true, message: "Pilih genre buku" }]}
        >
          <Select>
            <Option value="fantasi">Fantasi</Option>
            <Option value="dongeng">Dongeng</Option>
            <Option value="edukasi">Edukasi</Option>
            <Option value="petualangan">Petualangan</Option>
            <Option value="lainnya">Lainnya</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Deskripsi" name="book_description">
          <Input.TextArea rows={3} placeholder="Deskripsi singkat buku" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingId ? "Update Buku" : "Tambah Buku"}
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

      <Title level={4}>📖 Daftar Buku</Title>

      <Row gutter={[16, 16]}>
        {books.length === 0 ? (
          <p>Belum ada buku ditambahkan.</p>
        ) : (
          books.map((book) => (
            <Col key={book.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt={book.book_title}
                    src={book.book_thumbnail}
                    onClick={() => handlePreview(book.book_thumbnail)}
                    style={{
                      height: 240,
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                }
                actions={[
                  <EditOutlined key="edit" onClick={() => handleEdit(book)} />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => handleDelete(book.id)}
                    style={{ color: "red" }}
                  />,
                ]}
              >
                <Card.Meta
                  title={book.book_title}
                  description={
                    <>
                      <p>📗 Genre: {book.book_genre}</p>
                      <p>{book.book_description}</p>
                      <p>
                        <FilePdfOutlined /> {book.book_pdf}
                      </p>
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
        onCancel={() => setPreviewImage(null)}
      >
        <img
          alt="Preview Sampul"
          src={previewImage}
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </Modal>
    </div>
  );
}
