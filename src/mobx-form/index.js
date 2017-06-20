import { types } from 'mobx-state-tree'

const Field = types.model('Field', {
  name: types.string,
  value: types.string,
  touched: types.boolean,
  valid: types.boolean,
  normalization,
  validation
}, {
  setValue(value) {
    this.value = this.normalization(value)
    this.valid = this.validation(this.value)
    this.touched = true
  }
})

const Form = types.model('Form', {
  fields: types.array(Field)
}, {

})

const FormStore = types.model('FormStore', {
  forms: types.array(Form)
}, {
  addForm(form) {
    this.forms.push(form)
  }
})

export default FormStore.create({
  forms: []
})