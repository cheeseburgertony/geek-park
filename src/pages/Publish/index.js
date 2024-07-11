import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { getArticleDetailByIdAPI, postCreateArticlesAPI, putUpdateArticlesAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {
  // 频道列表
  const { channelList } = useChannel()

  // 获取Form实例
  const [form] = Form.useForm()

  // 收集表单(发布文章)
  const navigate = useNavigate()
  const onFinish = async (formData) => {
    // 进行选择的图片类型和图片数量进行校验
    if (imageType !== imageList.length) return message.warning('封面类型和图片数量不匹配')
    const { channel_id, content, title } = formData
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,
        images: imageList.map(item => {
          // 更新和新增的url获取可能不同，这里做适配
          if (item.response) {
            return item.response.data.url
          } else {
            return item.url
          }
        })
      },
      channel_id
    }
    if (articleId) {
      await putUpdateArticlesAPI(articleId, reqData)
    } else {
      await postCreateArticlesAPI(reqData)
    }
    articleId ? message.success('编辑成功') : message.success('发布成功')
    // 发布成功后重置表单
    form.resetFields()
    // 跳转到文章列表
    navigate('/article')
  }

  // 上传图片
  const [imageList, setImageList] = useState([])
  const onChange = (value) => {
    setImageList(value.fileList)
  }

  // 图片类型切换
  const [imageType, setImageType] = useState(0)
  const onTypeChange = (e) => {
    setImageType(e.target.value)
  }

  // 获取地址栏查询参数
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  // 数据回显
  useEffect(() => {
    const getArticleDetailByIdData = async () => {
      const res = await getArticleDetailByIdAPI(articleId)
      const data = res.data
      const { cover } = data
      // 调用表单自己的方法传入数据会自动进行数据回显
      form.setFieldsValue({
        ...data,
        type: cover.type
      })
      setImageType(cover.type)
      // 重新设置imageList数据
      setImageList(cover.images.map(item => ({ url: item })))
    }
    // 有id时再进行调用
    if (articleId) {
      getArticleDetailByIdData()
    }
  }, [articleId, form])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: `${articleId ? '编辑' : '发布'}文章` },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 
              listType:决定选择文件框的外观样式
              showUploadList:控制显示上传
              action:配置封面图片上传接口地址
              name:接口要求的字段名
              onChange:在事件中拿到当前图片数据 上传过程中会一直触发
            */}
            {imageType > 0 && <Upload
              listType="picture-card"
              showUploadList
              action={'http://geek.itheima.net/v1_0/upload'}
              name='image'
              onChange={onChange}
              maxCount={imageType}
              fileList={imageList}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish