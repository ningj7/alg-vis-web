import React, { useEffect, useState } from "react";
import styles from "./centerPanel.module.scss";
import { message } from "antd";
import { GetData, AddData, UpdateData, DeleteData } from "../../api/announce";

interface NoticeItem {
    id: number;
    title: string;
    content: string;
    createTime: string;
    updateTime: string;
}

const CenterPanel: React.FC = () => {
    const isAdmin = sessionStorage.getItem("account") === "admin";

    const [notices, setNotices] = useState<NoticeItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showEditor, setShowEditor] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const data = await GetData();
            setNotices(data);
            setCurrentIndex(0);
        } catch {
            message.error("公告获取失败");
        }
    };

    const handlePublish = async () => {
        if (!newTitle.trim() || !newContent.trim()) {
            message.warning("标题和内容不能为空");
            return;
        }
        try {
            if (editingId !== null) {
                await UpdateData({ id: editingId, title: newTitle, content: newContent });
                message.success("公告更新成功");
            } else {
                await AddData({ title: newTitle, content: newContent });
                message.success("公告发布成功");
            }
            setNewTitle("");
            setNewContent("");
            setEditingId(null);
            setShowEditor(false);
            fetchNotices();
        } catch {
            message.error("操作失败");
        }
    };

    const handleEdit = (item: NoticeItem) => {
        setEditingId(item.id);
        setNewTitle(item.title);
        setNewContent(item.content);
        setShowEditor(true);
    };

    const handleDelete = async (id: number) => {
        try {
            await DeleteData(id);
            message.success("公告删除成功");
            // 调整 currentIndex 防止越界
            if (currentIndex >= notices.length - 1 && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
            fetchNotices();
        } catch {
            message.error("删除失败");
        }
    };

    const currentNotice = notices[currentIndex];

    const handlePrev = () => {
        setCurrentIndex((idx) => (idx === 0 ? notices.length - 1 : idx - 1));
    };
    const handleNext = () => {
        setCurrentIndex((idx) => (idx === notices.length - 1 ? 0 : idx + 1));
    };

    return (
        <div className={styles.centerPanel}>
            <div className={styles.noticeBoard}>
                <div className={styles.noticeHeader}>
                    <div>江湖公告栏</div>
                    <button
                        className={`${styles.publishButton} ${!isAdmin ? styles.disabled : ""}`}
                        disabled={!isAdmin}
                        onClick={() => isAdmin && setShowEditor(!showEditor)}
                        title={!isAdmin ? "仅管理员可发布" : ""}
                    >
                        {editingId ? "编辑公告" : "发布公告"}
                    </button>
                </div>

                {showEditor && (
                    <div className={styles.editor}>
                        <input
                            placeholder="公告标题"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <textarea
                            rows={4}
                            placeholder="公告内容"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                        />
                        <button className={styles.submitButton} onClick={handlePublish}>
                            {editingId ? "确认修改" : "确认发布"}
                        </button>
                    </div>
                )}
                {notices.length > 0 ? (
                    <>
                        <div className={styles.noticeContentArea}>
                            <button className={styles.navButton} onClick={handlePrev} title="上一条公告">
                                &lt;
                            </button>

                            <div className={styles.noticeContentBox}>
                                <h3 className={styles.noticeTitle}>{currentNotice.title}</h3>
                                <p className={styles.noticeContent}>{currentNotice.content}</p>
                                <div className={styles.noticeTime}>
                                    发布于: {new Date(currentNotice.createTime).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}
                                </div>
                                <div className={styles.noticeActions}>
                                    <button
                                        disabled={!isAdmin}
                                        className={!isAdmin ? styles.disabled : ""}
                                        title={!isAdmin ? "无权限" : ""}
                                        onClick={() => isAdmin && handleEdit(currentNotice)}
                                    >
                                        编辑
                                    </button>
                                    <button
                                        disabled={!isAdmin}
                                        className={!isAdmin ? styles.disabled : ""}
                                        title={!isAdmin ? "无权限" : ""}
                                        onClick={() => isAdmin && handleDelete(currentNotice.id)}
                                    >
                                        删除
                                    </button>
                                </div>
                            </div>

                            <button className={styles.navButton} onClick={handleNext} title="下一条公告">
                                &gt;
                            </button>
                        </div>

                        {notices.length > 1 && (
                            <div className={styles.dotIndicator}>
                                {notices.map((_, idx) => (
                                    <span
                                        key={idx}
                                        className={`${styles.dot} ${idx === currentIndex ? styles.active : ""}`}
                                        onClick={() => setCurrentIndex(idx)}
                                        title={`第 ${idx + 1} 条公告`}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className={styles.emptyNotice}>暂无公告</div>
                )}


            </div>
        </div >
    );
};

export default CenterPanel;