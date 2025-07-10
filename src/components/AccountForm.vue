<script setup lang="ts">
import { ACCOUNT_TYPES } from '@/types/Account'
import { useId } from 'vue'

const login = useId()
const labels = useId()
const password = useId()
const type = useId()
</script>

<template>
  <form>
    <fieldset>
      <legend>Аккаунт</legend>

      <label :for="labels">Метки</label>
      <InputText :id="labels" aria-describedby="username-help" />

      <label :for="type">Тип записи</label>
      <Select :input-id="type" :options="[...ACCOUNT_TYPES]" checkmark />

      <label :for="login">Логин</label>
      <InputText :id="login" aria-describedby="username-help" />

      <label :for="password">Пароль</label>
      <Password :input-id="password" toggleMask />
    </fieldset>
    <Button icon="pi pi-trash" variant="text" rounded aria-label="Удалить" />
  </form>
</template>

<style scoped></style>
