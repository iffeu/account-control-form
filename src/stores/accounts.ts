import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { isAccount, type Account } from '@/types/Account'
import { isJSONString } from '@/utils/isJSONString'

export const useAccountsStore = () => {
  const innerStore = defineStore('accounts', () => {
    const accounts = ref<Account[]>()
    const readonlyAccounts = computed(() => accounts.value)
    const defaultAccount = ref<Account>({
      labels: [],
      login: '',
      type: 'local',
      password: '',
    })

    function loadAccounts() {
      const dataString = localStorage.getItem('accounts') ?? 'null'
      if (isJSONString(dataString)) {
        const parsedData = JSON.parse(dataString)
        if (Array.isArray(parsedData) && parsedData.every(isAccount)) {
          accounts.value = parsedData
          return
        }
      }

      accounts.value = []
      localStorage.removeItem('accounts')
    }

    function addAccount() {
      accounts.value?.push({
        ...defaultAccount.value,
        login: defaultAccount.value.login + `${Math.floor(Math.random() * 99999)}`,
      })
    }

    function deleteAccount(index: number) {
      console.log(index)
      accounts.value = accounts.value?.filter((_, i) => i !== index)
      console.log(accounts.value)
    }

    function updateAccount(index: number, updatedAccount: Partial<Account>) {
      accounts.value = accounts.value?.map((account, i) => {
        if (index === i) {
          const newAccount = { ...account, ...updatedAccount }
          const newAccountFormFormat = { ...newAccount, labels: newAccount.labels.join('; ') }
          if (isAccount(newAccountFormFormat)) {
            return newAccount as Account
          }
        }
        return account
      })
    }

    return {
      accounts: readonlyAccounts,
      defaultAccount,
      loadAccounts,
      addAccount,
      deleteAccount,
      updateAccount,
    }
  })

  const store = innerStore()

  if (!store.accounts) {
    store.loadAccounts()
  }

  return store
}
