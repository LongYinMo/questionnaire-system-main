/**
 * @Date        2024/02/25 19:34:20
 * @Author      zono
 * @Description 请求列表数据的hook
 * */
import { useSearchParams,} from 'react-router-dom';
import { startTransition } from 'react'
import {useEffect} from 'react'
import { getQuestionListService } from '../services/question'
import { useRequest } from 'ahooks'
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
} from '../constant/index'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

/**
 * 请求列表数据的hook
 * @param {type}
 * @returns
 * */
function useLoadQuestionListData(options: Partial<OptionType> = {}) {
  const { isStar, isDeleted } = options
  const [searchParams] = useSearchParams()

  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const page = Number(searchParams.get(LIST_PAGE_PARAM_KEY)) || 0
      const pageSize = Number(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY)) || 0
      const data = await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize })
      return data
    },
    {
      manual: true
    }
  )
  // 当searchParams变化时使用startTransition触发请求
  useEffect(() => {
    startTransition(() => {
      refresh();
    });
  }, [searchParams, refresh])

  return { data, loading, error, refresh }
}

export default useLoadQuestionListData
