import { FC, useState, useEffect } from 'react';
import { Table, Tag, Image, Popconfirm, Input, Select, Button, Modal, Form, Checkbox, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { GetUsers, User, UpdateUser, UpdateRequest } from '../../api/usertable';
import styles from './UserTable.module.scss';

const { Option } = Select;

interface TableParams {
    pagination: {
        current: number;
        pageSize: number;
        total?: number;
    };
}



const UserTable: FC = () => {
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState({
        nickName: '',
        account: '',
        status: ''
    });
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 3,
            total: 0
        },
    });
    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            if (editingUser) {
                const updateData: UpdateRequest = {
                    ...editingUser,
                    ...values,
                    resetPassword: false, // 默认不重置密码
                };
                await UpdateUser(updateData);
                message.success('易容成功');
                setIsModalVisible(false);
                setEditingUser(null);
                fetchData(); // 刷新表格
            }
        } catch (err) {
            message.error('易容失败，请检查输入');
        }
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [form] = Form.useForm();

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await GetUsers({
                pageNo: tableParams.pagination.current,
                pageSize: tableParams.pagination.pageSize,
                ...searchParams
            });

            setData(res.data.list || []);
            setTableParams(prev => ({
                pagination: {
                    ...prev.pagination,
                    total: res.data.total || 0,
                },
            }));
        } catch (err) {
            message.error('获取用户列表失败');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [tableParams.pagination.current]);

    const handleTableChange = (pagination: any) => {
        setTableParams({ pagination });
    };

    const getStatusColor = (status: number) => status === 0 ? '#52c41a' : '#cf1322';
    const getRoleColor = (role: number) => role === 0 ? '#d48806' : '#2f54eb';
    const getGenderColor = (gender: number) => gender === 0 ? '#1890ff' : '#eb2f96';

    const columns: ColumnsType<User> = [
        {
            title: '江湖画像',
            dataIndex: 'avatarUrl',
            key: 'avatarUrl',
            width: 100,
            render: (url: string) => (
                <Image
                    src={url}
                    width={60}
                    height={60}
                    className={styles.avatar}
                    preview={{ maskClassName: styles.previewMask }}
                />
            ),
        },
        {
            title: '武林称号',
            dataIndex: 'nickName',
            key: 'nickName',
            width: 100,
            render: (text: string) => <span className={styles.nickname}>「{text}」</span>,
        },
        {
            title: '性别',
            key: 'gender',
            width: 100,
            render: (_, record) => (
                <Tag color={getGenderColor(record.gender)} className={styles.statusTag}>
                    {record.gender === 0 ? '男' : '女'}
                </Tag>
            ),
        },
        {
            title: '门派令牌',
            dataIndex: 'account',
            key: 'account',
            width: 100,
            render: (text: string) => <span className={styles.account}>{text}</span>,
        },
        {
            title: '角色',
            key: 'role',
            width: 100,
            render: (_, record) => (
                <Tag color={getRoleColor(record.role)} className={styles.statusTag}>
                    {record.role === 0 ? '宗主' : '弟子'}
                </Tag>
            ),
        },
        {
            title: '状态',
            key: 'status',
            width: 100,
            render: (_, record) => (
                <Tag color={getStatusColor(record.status)} className={styles.statusTag}>
                    {record.status === 0 ? '正常' : '异常'}
                </Tag>
            ),
        },
        {
            title: '操作',
            key: 'action',
            width: 100,
            render: (_, record) => (
                <Popconfirm
                    title={`确定要对${record.nickName}施展易容术？`}
                    onConfirm={() => {
                        setEditingUser(record);
                        setIsModalVisible(true);
                        form.setFieldsValue({
                            ...record,
                            resetPassword: false, // 默认不重置密码
                        });
                    }}
                    okText="确认"
                    cancelText="取消"
                    overlayClassName={styles.popconfirmOverlay}
                >
                    <button className={styles.actionBtn}>易容术</button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.searchHeader}>
                <div className={styles.searchFields}>
                    <Input
                        placeholder="输入侠客名"
                        value={searchParams.nickName}
                        onChange={e =>
                            setSearchParams({ ...searchParams, nickName: e.target.value })
                        }
                        className={styles.searchField}
                    />
                    <Input
                        placeholder="输入门派令牌"
                        value={searchParams.account}
                        onChange={e =>
                            setSearchParams({ ...searchParams, account: e.target.value })
                        }
                        className={styles.searchField}
                    />
                    <Select
                        value={searchParams.status}
                        onChange={value => setSearchParams({ ...searchParams, status: value })}
                        className={styles.searchField}
                    >
                        <Option value="">所有状态</Option>
                        <Option value={0}>正常</Option>
                        <Option value={1}>异常</Option>
                    </Select>
                </div>
                <Button
                    className={styles.searchButton}
                    onClick={() => {
                        setTableParams(prev => ({
                            ...prev,
                            pagination: {
                                ...prev.pagination,
                                current: 1,
                            },
                        }));
                        fetchData();
                    }}
                >
                    搜索侠客
                </Button>
            </div>

            <Table<User>
                columns={columns}
                rowKey="id"
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                className={styles.wuxiaTable}
                bordered
            />

            <Modal
                title="施展易容术"
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditingUser(null);
                }}
                onOk={handleUpdate}
                okText="确认"
                cancelText="取消"
                className={styles.modal}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="武林称号" name="nickName" rules={[{ required: true, message: '请输入称号' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="性别" name="gender" rules={[{ required: true }]}>
                        <Select>
                            <Option value={0}>男</Option>
                            <Option value={1}>女</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="角色" name="role" rules={[{ required: true }]}>
                        <Select>
                            <Option value={0}>宗主</Option>
                            <Option value={1}>弟子</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="状态" name="status" rules={[{ required: true }]}>
                        <Select>
                            <Option value={0}>正常</Option>
                            <Option value={1}>异常</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="resetPassword" valuePropName="checked" style={{ marginTop: 12 }}>
                        <Checkbox>重置密码为默认</Checkbox>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserTable;