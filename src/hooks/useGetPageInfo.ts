import { useSelector } from 'react-redux'
import { PageInfoType } from '../store/pageInfoReducer'
import { StateType } from '../store'

export default function useGetPageInfo() {
  return useSelector<StateType, PageInfoType>(state => state.pageInfo)
}
