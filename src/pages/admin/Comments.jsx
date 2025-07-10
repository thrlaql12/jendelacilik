import React, { useState } from 'react';
import {
  List,
  Card,
  Button,
  Popconfirm,
  Typography,
  notification,
} from 'antd';

import '../../styles/managecomments.css'; // Import CSS

const { Title, Text } = Typography;

const Comments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      username: 'user123',
      content: 'Aplikasinya sangat bagus, anak saya suka!',
      rating: 5,
      createdAt: '2025-07-06',
    },
    {
      id: 2,
      username: 'ibuani',
      content: 'Tampilan menarik dan mudah digunakan.',
      rating: 4,
      createdAt: '2025-07-05',
    },
  ]);

  const openNotification = (desc) => {
    notification.success({
      message: 'Berhasil!',
      description: desc,
      placement: 'topRight',
    });
  };

  const handleDelete = (id) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
    openNotification('Komentar berhasil dihapus');
  };

  return (
    <div className="manage-comments-container">
      <Title level={2}>💬 Kelola Komentar Pengguna</Title>

      {comments.length === 0 ? (
        <Text type="secondary">Belum ada komentar dari pengguna.</Text>
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={comments}
          renderItem={(comment) => (
            <List.Item>
              <Card
                title={`👤 ${comment.username}`}
                extra={
                  <Popconfirm
                    title="Hapus komentar ini?"
                    onConfirm={() => handleDelete(comment.id)}
                    okText="Ya"
                    cancelText="Batal"
                  >
                    <Button danger size="small">
                      Hapus
                    </Button>
                  </Popconfirm>
                }
              >
                <p>{comment.content}</p>
                <p>
                  <Text type="secondary">Rating: {comment.rating} ⭐</Text>
                </p>
                <p>
                  <Text type="secondary">Tanggal: {comment.createdAt}</Text>
                </p>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Comments;
