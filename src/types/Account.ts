interface AccountBase {
  labels: { text: string }[]
  type: (typeof ACCOUNT_TYPES)[number]
  login: string
}

interface AccountLDAP extends AccountBase {
  type: 'LDAP'
  password: null
}

interface AccountLocal extends AccountBase {
  type: 'local'
  password: string
}

export const ACCOUNT_TYPES = ['local', 'LDAP'] as const
export type Account = AccountLDAP | AccountLocal
