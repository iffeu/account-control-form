<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AccountForm from './components/AccountForm.vue'
import { useAccountsStore } from './stores/accounts'

const { addAccount, updateAccount, deleteAccount } = useAccountsStore()
const { accounts } = storeToRefs(useAccountsStore())
</script>

<template>
  <h2>Учетные записи</h2>
  <Button @click="addAccount" icon="pi pi-plus" variant="outlined" aria-label="Добавить аккаунт" />
  <Message severity="info"
    >Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</Message
  >

  <ul>
    <li v-for="(account, index) of accounts" :key="account.login">
      <AccountForm :account @update="updateAccount(index, $event)" @delete="deleteAccount(index)" />
    </li>
  </ul>
</template>

<style scoped></style>
