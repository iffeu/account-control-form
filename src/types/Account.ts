import { accountSchema, stringifiedAccountSchema } from '@/schemas/Account.schema'

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

export function isAccount(data: unknown): data is Account {
  return accountSchema.safeParse(data).success
}

export type StringifiedAccount = Omit<Account, 'labels'> & { labels: string }

export function isStringifiedAccount(data: unknown): data is StringifiedAccount {
  return stringifiedAccountSchema.safeParse(data).success
}

export function toStringifiedAccount(account: Account): StringifiedAccount {
  return {
    ...account,
    labels: account.labels.map((label) => label.text).join('; '),
  }
}

export function fromStringifiedAccount(account: StringifiedAccount): Account {
  // here we change only the labels field, and that keeps
  // account type and password pair, so we can use "as Account"
  return {
    ...account,
    labels:
      account.labels
        .split(';')
        .map((s) => s.trim())
        .filter((s) => s.length)
        .map((s) => ({ text: s })) ?? [],
  } as Account
}

export function fromPartialStringifiedAccount(
  account: Partial<StringifiedAccount>,
): Partial<Account> {
  // here we change only the labels field, and that keeps
  // account type and password pair, so we can use "as Account"
  return {
    ...account,
    labels:
      account.labels
        ?.split(';')
        .map((s) => s.trim())
        .filter((s) => s.length)
        .map((s) => ({ text: s })) ?? [],
  } as Partial<Account>
}
