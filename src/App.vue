<script setup lang="ts">
import AccountForm from './components/AccountForm.vue'
</script>

<template>
  <h2>Учетные записи</h2>
  <Button icon="pi pi-plus" variant="outlined" aria-label="Добавить аккаунт" />
  <Message severity="info"
    >Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</Message
  >

  <ul>
    <li>
      <AccountForm />
    </li>
    <li>
      <AccountForm />
    </li>
  </ul>
</template>

<style scoped></style>
