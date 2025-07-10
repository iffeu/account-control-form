export interface Account {
  labels: { text: string }[]
  type: 'local' | 'LDAP'
  login: string
  password: string | null
}
