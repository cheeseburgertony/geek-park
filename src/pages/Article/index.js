import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm, message } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useChannel } from '@/hooks/useChannel'
import { useEffect, useState } from 'react'
import { deleteArticlesAPI, getArticlesListAPI } from '@/apis/article'

const { Option } = Select
const { RangePicker } = DatePicker


const Article = () => {
  const navigate = useNavigate()

  // 准备列数据
  // 枚举状态数据
  const state = {
    1: <Tag color="warning">待审核</Tag>,
    2: <Tag color="success">审核通过</Tag>
  }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => state[data]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/publish?id=${data.id}`)} />
            <Popconfirm
              title="删除文章"
              description="是否删除此文章？"
              onConfirm={() => onConfirm(data)}
              okText="确认"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  // 频道列表
  const { channelList } = useChannel()

  // 请求参数
  const [reqData, setReqData] = useState({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 4
  })

  // 获取文章列表
  const [list, setList] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    const getArticlesListData = async () => {
      // 请求参数改变时就会触发
      const res = await getArticlesListAPI(reqData)
      setList(res.data.results)
      setCount(res.data.total_count)
    }
    getArticlesListData()
  }, [reqData])

  // 收集筛选表单数据
  const onFinish = (formData) => {
    setReqData({
      ...reqData,
      status: formData.status,
      channel_id: formData.channel_id,
      begin_pubdate: formData.date[0].format('YYYY-MM-DD'),
      end_pubdate: formData.date[1].format('YYYY-MM-DD')
    })
  }

  // 分页操作
  const onPageChange = (page) => {
    setReqData({
      ...reqData,
      page
    })
  }

  // 删除文章
  const onConfirm = async (data) => {
    await deleteArticlesAPI(data.id)
    // 触发useEffect重新获取数据
    message.success('删除成功')
    setReqData({
      ...reqData
    })
  }

  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '文章列表' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              // defaultValue="lucy"
              style={{ width: 120 }}
            >
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格 */}
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={list} pagination={
          {
            total: count,
            pageSize: reqData.per_page,
            onChange: onPageChange
          }
        } />
      </Card>
    </div>
  )
}

export default Article