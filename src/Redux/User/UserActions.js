const loginUser = value => (
  {
    type: 'LOGIN_USER',
    value
  }
)

const loadProfile = data => (
  {
    type: 'LOAD_PROFILE',
    data
  }
)

export { loginUser, loadProfile }