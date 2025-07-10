<script setup lang="ts">
import { ACCOUNT_TYPES, type Account } from '@/types/Account'
import { Form, Field } from 'vee-validate'
import { computed, useId } from 'vue'

const { account } = defineProps<{ account: Account }>()

const stringifiedAccount = computed(() => ({
  ...account,
  labels: account.labels.map((label) => label.text).join('; '),
}))

const login = useId()
const labels = useId()
const password = useId()
const type = useId()
</script>

<template>
  <Form :initial-values="stringifiedAccount">
    <fieldset>
      <legend>Аккаунт</legend>

      <Field name="labels" v-slot="{ field }">
        <label :for="labels">Метки</label>
        <InputText :id="labels" v-bind="field" aria-describedby="username-help" />
      </Field>
      <Field name="type" v-slot="{ field }">
        <label :for="type">Тип записи</label>
        <Select
          :input-id="type"
          :model-value="field.value"
          @update:model-value="field['onUpdate:modelValue']"
          :options="[...ACCOUNT_TYPES]"
          checkmark
        />
      </Field>
      <Field name="login" v-slot="{ field }">
        <label :for="login">Логин</label>
        <InputText :id="login" v-bind="field" aria-describedby="username-help" />
      </Field>
      <Field name="password" v-slot="{ field }">
        {{ field }}
        <label :for="password">Пароль</label>
        <Password
          :input-id="password"
          :model-value="field.value"
          @update:model-value="field['onUpdate:modelValue']"
          toggleMask
        />
      </Field>
    </fieldset>
    <Button icon="pi pi-trash" variant="text" rounded aria-label="Удалить" />
  </Form>
</template>

<style scoped></style>
