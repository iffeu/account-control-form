import * as z from 'zod'

const accountBaseSchema = z.object({
  labels: z.string().max(50),
  login: z.string().min(1).max(100),
})

const LDAPAccountSchema = z.object({
  ...accountBaseSchema.shape,
  type: z.literal('LDAP'),
  password: z.string().transform(() => null),
})

const localAccountSchema = z.object({
  ...accountBaseSchema.shape,
  type: z.literal('local'),
  password: z.string().min(1).max(100),
})

export const accountSchema = z.discriminatedUnion('type', [localAccountSchema, LDAPAccountSchema])
