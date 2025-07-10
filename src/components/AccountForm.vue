<script setup lang="ts">
import { ACCOUNT_TYPES, type Account } from '@/types/Account'
import { Form, Field, type FormValidationResult } from 'vee-validate'
import { computed, useId } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const { account } = defineProps<{ account: Account }>()

const emit = defineEmits(['update', 'delete'])

const stringifiedAccount = computed(() => ({
  ...account,
  labels: account.labels.map((label) => label.text).join('; '),
}))

const login = useId()
const labels = useId()
const password = useId()
const type = useId()

const accountBaseScheme = z.object({
  labels: z.string().max(50),
  login: z.string().min(1).max(100),
})

const LDAPAccountScheme = z.object({
  ...accountBaseScheme.shape,
  type: z.literal('LDAP'),
  password: z.string().transform(() => null),
})

const localAccountScheme = z.object({
  ...accountBaseScheme.shape,
  type: z.literal('local'),
  password: z.string().min(1).max(100),
})

const accountScheme = toTypedSchema(
  z.discriminatedUnion('type', [localAccountScheme, LDAPAccountScheme]),
)

function saveAccount(account: Partial<typeof stringifiedAccount.value>) {
  emit('update', {
    ...account,
    labels:
      account.labels
        ?.split(';')
        .map((s) => s.trim())
        .filter((s) => s.length)
        .map((s) => ({ text: s })) ?? [],
  })
}

function handleSubmit(
  form: FormValidationResult<typeof stringifiedAccount.value, typeof stringifiedAccount.value>,
) {
  if (form.valid && form.values) {
    void saveAccount(form.values)
  }
}
</script>

<template>
  <Form
    :initial-values="stringifiedAccount"
    :validation-schema="accountScheme"
    :validate-on-mount="true"
    v-slot="{ validate }"
  >
    <fieldset>
      <legend>Аккаунт</legend>

      <Field name="labels" v-slot="{ field, errors }">
        <label :for="labels">Метки</label>
        <InputText
          :id="labels"
          v-bind="field"
          @blur="validate().then(handleSubmit)"
          aria-describedby="username-help"
          :invalid="!!errors.length"
        />
      </Field>
      <Field name="type" v-slot="{ field, errors }">
        <label :for="type">Тип записи</label>
        <Select
          :input-id="type"
          :model-value="field.value"
          :invalid="!!errors.length"
          @update:model-value="
            ($event) => {
              field['onUpdate:modelValue']?.($event)
              validate().then(handleSubmit)
            }
          "
          :options="[...ACCOUNT_TYPES]"
          checkmark
        />
      </Field>
      <Field name="login" v-slot="{ field, errors }">
        <label :for="login">Логин</label>
        <InputText
          :id="login"
          v-bind="field"
          @blur="validate().then(handleSubmit)"
          aria-describedby="username-help"
          :invalid="!!errors.length"
        />
      </Field>
      <Field name="password" v-slot="{ field, errors }" mode="agressive">
        <label :for="password">Пароль</label>
        <Password
          :input-id="password"
          @blur="validate().then(handleSubmit)"
          :model-value="field.value"
          :invalid="!!errors.length"
          @update:model-value="field['onUpdate:modelValue']"
          toggleMask
        />
      </Field>
    </fieldset>
    <Button
      icon="pi pi-trash"
      variant="text"
      rounded
      aria-label="Удалить"
      @click="emit('delete')"
    />
  </Form>
</template>

<style scoped></style>
