import { ref } from 'vue'
import { defineStore } from 'pinia'
import { isAccount, type Account } from '@/types/Account'
import { isJSONString } from '@/utils/isJSONString'

export const useAccountsStore = () => {
  const innerStore = defineStore('accounts', () => {
    const accounts = ref<Account[]>()

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

      localStorage.removeItem('accounts')
    }

    function addAccount() {
      accounts.value?.push({ ...defaultAccount.value })
    }

    function deleteAccount(login: string) {
      accounts.value = accounts.value?.filter((account) => account.login !== login)
    }

    function updateAccount(index: number, updatedAccount: Partial<Account>) {
      accounts.value = accounts.value?.map((account, i) => {
        if (index === i) {
          const newAccount = { ...account, ...updatedAccount }
          if (isAccount(newAccount)) {
            return newAccount
          }
        }
        return account
      })
    }

    return { accounts, defaultAccount, loadAccounts, addAccount, deleteAccount, updateAccount }
  })

  const store = innerStore()

  if (!store.accounts) {
    store.loadAccounts()
  }

  return store
}
