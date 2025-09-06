
function useLoadUserData() {
  // 始终返回false，不加载用户信息
  return { waitingUserData: false }
}

export default useLoadUserData
