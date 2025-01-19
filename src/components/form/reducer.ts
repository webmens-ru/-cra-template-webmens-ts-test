import { IFormReducerAction, IFormReducerProps, IFormReducerState } from "./types";

export const reducer = function (state: IFormReducerState, action: IFormReducerAction): IFormReducerState {
  switch (action.type) {
    case 'set_mode':
      return { ...state, mode: action.mode }
    case 'toggle_mode':
      const mode = state.mode === "edit" ? "view" : "edit";
      return { ...state, mode }
    case 'set_field':
      const setFieldValues = { ...state.tempValues }
      setFieldValues[action.field.name] = action.field.value
      return { ...state, tempValues: setFieldValues }
    case 'set_errors':
      return { ...state, errors: action.errors.concat(state.errors) }
    case 'set_form':
      const setFormValues = { ...state.tempValues }
      setFormValues[action.form.field.name] = action.form.field.value
      state.onFieldChange(action.form.field, setFormValues, action.form.errors)
      return { ...state, tempValues: setFormValues, errors: action.form.errors }
    case 'submit_form':
      return { ...state, values: state.tempValues, mode: "view", errors: [] }
    case 'undo_changes':
      return { ...state, tempValues: state.values, mode: "view", errors: [] }
    default: return state
  }
}

export const init = function ({ fields, values: defaultValues, mode, validationRules, onFieldChange }: IFormReducerProps): IFormReducerState {
  const values: { [key: string]: any } = { ...defaultValues } || {}

  fields.forEach(field => {
    switch (field.type) {
      case 'input':
        values[field.name] = (values[field.name] === undefined || values[field.name] === null) ? '' : values[field.name]
        break;
      case 'select':
      case 'multifield':
        values[field.name] = values[field.name] || []
        break;
      case 'date':
        values[field.name] = values[field.name] || new Date().toISOString()
        break;
      default:
        return
    }
  })

  const rules = validationRules.map(item => {
    const rule = { ...item }
    if (typeof rule.fields === 'string') {
      rule.fields = [rule.fields]
    }
    return rule;
  })

  return {
    fields,
    values,
    tempValues: values,
    validationRules: rules,
    errors: [],
    mode,
    inited: true,
    onFieldChange
  }
}
