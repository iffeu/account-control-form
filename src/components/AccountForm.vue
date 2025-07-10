<script setup lang="ts">
import { ACCOUNT_TYPES } from '@/types/Account'
import { ref } from 'vue'

const login = ref('')
const labels = ref('')
const password = ref('')
const type = ref('local')
</script>

<template>
  <form>
    <fieldset>
      <legend>Аккаунт</legend>
      <label for="labels">Метки</label>
      Тип записи
      <InputText id="labels" v-model="labels" aria-describedby="username-help" />
      <Select v-model="type" :options="[...ACCOUNT_TYPES]" checkmark />
      <label for="login">Логин</label>
      <InputText id="login" v-model="login" aria-describedby="username-help" />
      <label for="password">Пароль</label>
      <Password id="password" v-model="password" toggleMask />
    </fieldset>
    <Button icon="pi pi-trash" variant="text" rounded aria-label="Удалить" />
  </form>
</template>

<style scoped></style>
