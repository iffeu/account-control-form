<script setup lang="ts">
import {
  ACCOUNT_TYPES,
  fromPartialStringifiedAccount,
  toStringifiedAccount,
  type Account,
  type StringifiedAccount,
} from '@/types/Account'
import { Form, Field, type FormValidationResult } from 'vee-validate'
import { computed, useId } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { stringifiedAccountSchema } from '@/schemas/Account.schema'

const { account } = defineProps<{ account: Account }>()

const emit = defineEmits<{
  update: [Partial<Account>]
  delete: []
}>()

const stringifiedAccount = computed(() => toStringifiedAccount(account))

const login = useId()
const labels = useId()
const password = useId()
const type = useId()

const accountScheme = toTypedSchema(stringifiedAccountSchema)

function saveAccount(account: Partial<StringifiedAccount>) {
  emit('update', fromPartialStringifiedAccount(account))
}

function handleSubmit(form: FormValidationResult<StringifiedAccount, StringifiedAccount>) {
  if (form.valid && form.values) {
    void saveAccount(form.values)
  }
}
</script>

<template>
  <Form
    :initial-values="stringifiedAccount"
    :validation-schema="accountScheme"
    :validate-on-mount="true"
    class="form"
    v-slot="{ values, validate }"
  >
    <fieldset class="form__fieldset">
      <legend>Аккаунт</legend>

      <Field name="labels" v-slot="{ field, errors }">
        <IftaLabel class="form__label" variant="on">
          <InputText
            class="form__field"
            :id="labels"
            v-bind="field"
            @blur="validate().then(handleSubmit)"
            aria-describedby="username-help"
            :invalid="!!errors.length"
          />
          <label :for="labels">Метки</label>
        </IftaLabel>
      </Field>
      <Field name="type" v-slot="{ field, errors }">
        <IftaLabel class="form__label" variant="on">
          <Select
            :input-id="type"
            :model-value="field.value"
            :invalid="!!errors.length"
            class="form__account-type"
            @update:model-value="
              ($event) => {
                field['onUpdate:modelValue']?.($event)
                validate().then(handleSubmit)
              }
            "
            :options="[...ACCOUNT_TYPES]"
            checkmark
          />
          <label :for="type">Тип записи</label>
        </IftaLabel>
      </Field>
      <Field name="login" v-slot="{ field, errors }">
        <IftaLabel
          class="form__label"
          :class="{ 'form__label--dobule': values['type'] === 'LDAP' }"
        >
          <InputText
            class="form__field"
            :id="login"
            v-bind="field"
            @blur="validate().then(handleSubmit)"
            aria-describedby="username-help"
            :invalid="!!errors.length"
          />
          <label :for="login">Логин</label>
        </IftaLabel>
      </Field>
      <Field name="password" v-slot="{ field, errors }" mode="agressive">
        <IftaLabel v-if="values['type'] !== 'LDAP'" class="form__label">
          <Password
            class="form__field"
            :input-id="password"
            @blur="validate().then(handleSubmit)"
            :model-value="field.value"
            :invalid="!!errors.length"
            @update:model-value="field['onUpdate:modelValue']"
            toggleMask
          />
          <label :for="password">Пароль</label>
        </IftaLabel>
      </Field>
    </fieldset>
    <Button
      icon="pi pi-trash"
      variant="text"
      rounded
      aria-label="Удалить"
      @click="emit('delete')"
    />
  </Form>
</template>

<style scoped>
.form {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.form__fieldset {
  display: grid;
  flex: 1;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 12px;
  width: 100%;
}

.form__account-type {
  min-width: 150px;
}

.form__label--dobule {
  grid-column: 3 / 5;
}

.form__field,
.form__label,
.form__account-type,
:deep(.p-password),
:deep(.p-password input) {
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 150px;
  min-width: 150px;
}

@media (width <= 735px) {
  .form__fieldset {
    grid-template-columns: 1fr 1fr;
  }

  .form__label--dobule {
    grid-column: 1 / 3;
  }
}

@media (width <= 430px) {
  .form {
    flex-direction: column;
  }
  .form__fieldset {
    grid-template-columns: 1fr;
  }

  .form__label--dobule {
    grid-column: 1 / 2;
  }
}
</style>
