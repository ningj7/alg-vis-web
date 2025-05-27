import React, { useState } from 'react';
import { Button, Card, Modal, Input, Spin, Empty } from 'antd';
import styles from './suggestion.module.scss';

export interface Suggestion {
  id: number;
  topic: string;
  content: string;
  creatorName: string;
  createTime: string;
}

interface SuggestionCardProps {
  data: Suggestion[];
  loading?: boolean;
  onAdd?: (item: Suggestion) => void;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ data, loading = false, onAdd }) => {
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState<Suggestion | null>(null);
  const [newVisible, setNewVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const showDetail = (item: Suggestion) => {
    setDetail(item);
    setVisible(true);
  };

  const handleAdd = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const newItem: Suggestion = {
      id: Date.now(),
      topic: newTitle,
      content: newContent,
      creatorName: '匿名侠客',
      createTime: new Date().toLocaleString(),
    };
    onAdd?.(newItem);
    setNewVisible(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className={styles.boardWrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>谏言堂</h1>
        <Button className={styles.addBtn} onClick={() => setNewVisible(true)}>
          新增留言
        </Button>
      </div>

      <div className={styles.listContainer}>
        <Spin spinning={loading}>
          {data.length > 0 ? (
            data.map((item) => (
              <Card key={item.id} className={styles.card}>
                <div className={styles.cardTitle}>◉ {item.topic}</div>
                <div className={styles.cardMeta}>
                  留言人：{item.creatorName} ｜ 时间：{new Date(item.createTime).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}
                </div>
                <Button size="small" className={styles.viewBtn} onClick={() => showDetail(item)}>
                  查看详情
                </Button>
              </Card>
            ))
          ) : (
            <Empty description="暂无留言" />
          )}
        </Spin>
      </div>

      <Modal
        open={visible}
        title="留言详情"
        onCancel={() => setVisible(false)}
        footer={null}
        className={styles.modal}
      >
        {detail && (
          <>
            <p><strong>主题：</strong>{detail.topic}</p>
            <p><strong>内容：</strong>{detail.content}</p>
          </>
        )}
      </Modal>

      <Modal
        open={newVisible}
        title="新增留言"
        onCancel={() => setNewVisible(false)}
        onOk={handleAdd}
        okText="添加"
        cancelText="作罢"
        className={styles.modal}
        okButtonProps={{ className: styles.okButton }}
        cancelButtonProps={{ className: styles.cancelButton }}
      >
        <Input
          placeholder="请输入留言主题"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className={styles.input}
        />
        <Input.TextArea
          rows={4}
          placeholder="请输入留言内容"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className={styles.textarea}
        />
      </Modal>
    </div>
  );
};

export default SuggestionCard;