import { createForm, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'

configure({
  generateMessage: (context) => context.message,
})

createForm({
  validateOnInput: true,
})

export const loginSchema = {
  email: { required, email },
  password: { required, min: min(6) },
}
