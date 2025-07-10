import * as z from 'zod'

const stringifiedAccountBaseSchema = z.object({
  labels: z.string().max(50),
  login: z.string().min(1).max(100),
})

const stringifiedLDAPAccountSchema = z.object({
  ...stringifiedAccountBaseSchema.shape,
  type: z.literal('LDAP'),
  password: z.union([z.string().transform(() => null), z.literal(null)]),
})

const stringifiedlocalAccountSchema = z.object({
  ...stringifiedAccountBaseSchema.shape,
  type: z.literal('local'),
  password: z.string().min(1).max(100),
})

export const stringifiedAccountSchema = z.discriminatedUnion('type', [
  stringifiedlocalAccountSchema,
  stringifiedLDAPAccountSchema,
])

const LDAPAccountSchema = stringifiedLDAPAccountSchema
  .omit({ labels: true, password: true })
  .extend({
    labels: z
      .array(
        z.object({
          text: z.string(),
        }),
      )
      .transform((arr) => arr.map((s) => s.text).join('; '))
      .pipe(z.string().max(50)),
    password: z.literal(null),
  })

const localAccountSchema = stringifiedlocalAccountSchema.omit({ labels: true }).extend({
  labels: z
    .array(
      z.object({
        text: z.string(),
      }),
    )
    .transform((arr) => arr.map((s) => s.text).join('; '))
    .pipe(z.string().max(50)),
})

export const accountSchema = z.discriminatedUnion('type', [LDAPAccountSchema, localAccountSchema])
