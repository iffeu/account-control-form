<script setup lang="ts">
import AccountForm from './components/AccountForm.vue'
import type { Account } from './types/Account'

const account: Account = {
  labels: [{ text: 'XXX' }, { text: 'YYY' }],
  type: 'local',
  login: 'test',
  password: 'test',
}
</script>

<template>
  <h2>Учетные записи</h2>
  <Button icon="pi pi-plus" variant="outlined" aria-label="Добавить аккаунт" />
  <Message severity="info"
    >Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</Message
  >

  <ul>
    <li>
      <AccountForm :account />
    </li>
    <li>
      <AccountForm :account />
    </li>
  </ul>
</template>

<style scoped></style>
