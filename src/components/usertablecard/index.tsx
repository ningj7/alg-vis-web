// src/components/UserTable/index.tsx
import { FC, useState, useEffect } from 'react';
import { Table, Tag, Image, Popconfirm, Input, Select, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Info, Action } from '../../api/msg';
import { GetUsers, User, UserStatus } from '../../api/usertable';
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
        nickname: '',
        role: 'all'
    });
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 8,
            total: 0
        },
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await GetUsers({
                page: tableParams.pagination.current,
                pageSize: tableParams.pagination.pageSize,
                ...searchParams
            });

            setData(res.data);
            setTableParams({
                pagination: {
                    ...tableParams.pagination,
                    total: res.total || 0,
                },
            });
        } catch (err) {
            Info(Action.jieyue, '获取用户列表失败');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [tableParams.pagination.current, searchParams]);

    const handleTableChange = (pagination: any) => {
        setTableParams({ pagination });
    };

    const getStatusColor = (status: UserStatus) => {
        return status === UserStatus.Normal ? 'green' : 'volcano';
    };

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
            width: 100,
            key: 'nickName',
            render: (text: string) => <span className={styles.nickname}>「{text}」</span>,
        },
        {
            title: '门派令牌',
            dataIndex: 'studentNumber',
            key: 'studentNumber',
            width: 100,
        },
        {
            title: '角色',
            key: 'role',
            width: 100,
            render: (_, record) => (
                <Tag color={getStatusColor(record.status)} className={styles.statusTag}>
                    {record.status === UserStatus.Normal ? '宗主' : '弟子'}
                </Tag>
            ),
        },
        {
            title: '状态',
            key: 'status',
            width: 100,
            render: (_, record) => (
                <Tag color={getStatusColor(record.status)} className={styles.statusTag}>
                    {record.status === UserStatus.Normal ? '正常' : '异常'}
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
                    onConfirm={() => Info(Action.jieyue, `开始修改 ${record.nickName}`)}
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
            {/* 搜索区域 */}
            <div className={styles.searchHeader}>
                <Input
                    className={styles.searchInput}
                    placeholder="输入侠客名"
                    onChange={e => setSearchParams({ ...searchParams, nickname: e.target.value })}
                />

                <Select
                    className={styles.roleSelect}
                    defaultValue="all"
                    onChange={value => setSearchParams({ ...searchParams, role: value })}
                >
                    <Option value="all">所有角色</Option>
                    <Option value="admin">掌门</Option>
                    <Option value="member">弟子</Option>
                </Select>

                <Button
                    className={styles.searchButton}
                    onClick={fetchData}
                >
                    搜索侠客
                </Button>
            </div>

            {/* 数据表格 */}
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
        </div>
    );
};

export default UserTable;