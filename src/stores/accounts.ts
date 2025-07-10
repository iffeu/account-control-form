import { ref } from 'vue'
import { defineStore } from 'pinia'
import { isAccount, type Account } from '@/types/Account'
import { isJSONString } from '@/utils/isJSONString'

export const useAccountsStore = () => {
  const innerStore = defineStore('accounts', () => {
    const accounts = ref<Account[]>()

    function loadAccounts() {
      const dataString = localStorage.getItem('accounts') ?? 'null'
      if (isJSONString(dataString)) {
        const parsedData = JSON.parse(dataString)
        if (Array.isArray(parsedData) && parsedData.every(isAccount)) {
          accounts.value = parsedData
          return
        }
      }

      localStorage.removeItem('accounts')
    }
    return { accounts, loadAccounts }
  })

  const store = innerStore()

  if (!store.accounts) {
    store.loadAccounts()
  }

  return store
}
