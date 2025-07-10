<script setup lang="ts"></script>

<template>
  <h2>Учетные записи</h2>
  <Button icon="pi pi-plus" variant="outlined" aria-label="Filter" />
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
