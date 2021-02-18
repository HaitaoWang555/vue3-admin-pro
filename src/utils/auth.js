import Store from 'store'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Store.get(TokenKey)
}

export function setToken(token) {
  return Store.set(TokenKey, token)
}

export function removeToken() {
  return Store.remove(TokenKey)
}
