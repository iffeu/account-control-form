<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AccountForm from './components/AccountForm.vue'
import { useAccountsStore } from './stores/accounts'

const { addAccount, updateAccount, deleteAccount } = useAccountsStore()
const { accounts } = storeToRefs(useAccountsStore())
</script>

<template>
  <section class="accounts-info">
    <div class="accounts-info__title-wrapper">
      <h2 class="accounts-info__title">Учетные записи</h2>
      <Button
        @click="addAccount"
        icon="pi pi-plus"
        variant="outlined"
        aria-label="Добавить аккаунт"
      />
    </div>

    <Message severity="info" icon="pi pi-question-circle"
      >Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</Message
    >

    <ul class="accounts-info__account-list">
      <li v-for="(account, index) of accounts" :key="account.login">
        <AccountForm
          :account
          @update="updateAccount(index, $event)"
          @delete="deleteAccount(index)"
        />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.accounts-info {
  max-width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 16px;
}

.accounts-info__title-wrapper {
  display: flex;
  gap: 24px;
}

.accounts-info__title {
  margin: 0;
  padding: 0;
}

.accounts-info__account-list {
  list-style: none;
  padding-left: 0;
  display: flex;
  gap: 12px;
  flex-direction: column;
}
</style>
