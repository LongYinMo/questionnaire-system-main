/**
 * @description 移除用户信息加载逻辑 - 始终返回false
 * @returns false：不等待用户信息加载
 * */
function useLoadUserData() {
  // 始终返回false，不加载用户信息
  return { waitingUserData: false }
}

export default useLoadUserData
