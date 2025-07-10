import type { Nullable } from './Nullable'

export interface Account {
  labels: { text: string }[]
  type: 'local' | 'LDAP'
  login: string
  password: Nullable<string>
}
