/**
 * @Date        2024/02/18 17:40:15
 * @Author      zono
 * @Description 常量
 * */

// 环境配置
export const ENV = {
  DEV: 'development',
  PROD: 'production',
}

// 当前环境
export const CURRENT_ENV = process.env.NODE_ENV || ENV.DEV

// API基础URL配置
export const API_BASE_URL = {
  [ENV.DEV]: 'http://localhost:3001',
  [ENV.PROD]: 'https://questionnaire-mock-main-5ztxof8ul-nnpromaxs-projects.vercel.app',
}

// 获取当前环境的API基础URL
export const getApiBaseUrl = () => {
  return API_BASE_URL[CURRENT_ENV] || API_BASE_URL[ENV.DEV]
}

// 其他常量
export const LIST_PAGE_SIZE = 10
export const LIST_SEARCH_PARAM_KEY = 'keyword'
export const LIST_PAGE_PARAM_KEY = 'page'
export const LIST_PAGE_SIZE_PARAM_KEY = 'pageSize'

// 用户相关
export const USER_TOKEN_KEY = 'USER_TOKEN'

// 问卷相关
export const QUESTIONNAIRE_TITLE_MAX_LENGTH = 25
export const QUESTIONNAIRE_DESC_MAX_LENGTH = 100

// 组件相关
export const COMPONENT_TYPE_LIST = [
  {
    type: 'questionInfo',
    name: '问卷信息',
    icon: 'InfoCircleOutlined',
    desc: '问卷的基本信息',
  },
  {
    type: 'questionTitle',
    name: '标题',
    icon: 'FontSizeOutlined',
    desc: '问卷的标题',
  },
  {
    type: 'questionInput',
    name: '输入框',
    icon: 'EditOutlined',
    desc: '文本输入框',
  },
  {
    type: 'questionTextarea',
    name: '多行输入',
    icon: 'FileTextOutlined',
    desc: '多行文本输入框',
  },
  {
    type: 'questionRadio',
    name: '单选框',
    icon: 'CheckCircleOutlined',
    desc: '单选选项',
  },
  {
    type: 'questionCheckbox',
    name: '多选框',
    icon: 'CheckSquareOutlined',
    desc: '多选选项',
  },
  {
    type: 'questionParagraph',
    name: '段落',
    icon: 'AlignLeftOutlined',
    desc: '段落文本',
  },
]

// 组件属性配置
export const COMPONENT_PROP_CONFIG = {
  questionTitle: {
    text: '标题',
    level: 1,
    isCenter: false,
  },
  questionInput: {
    title: '输入框',
    placeholder: '请输入...',
  },
  questionTextarea: {
    title: '多行输入',
    placeholder: '请输入...',
  },
  questionRadio: {
    title: '单选框',
    options: [
      { text: '选项1', value: '1' },
      { text: '选项2', value: '2' },
    ],
    value: '',
  },
  questionCheckbox: {
    title: '多选框',
    list: [
      { text: '选项1', value: '1', checked: false },
      { text: '选项2', value: '2', checked: false },
    ],
  },
  questionParagraph: {
    text: '段落文本',
    isCenter: false,
  },
}

export const STAT_PAGE_SIZE = 10 // 统计列表，默认的 pageSize

export const STAT_COLORS = ['#FF2D2D', '#BE77FF', '#2894FF', '#00EC00', '#EAC100', '#FF9D6F']
