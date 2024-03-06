import { ChangeEvent, } from 'react'

interface UserDetails {
  label: string
  type: string
  name: string
  defaultValue?: string
  size?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
  id: string
}

const FormInput = ({label, type, name, defaultValue, size,id,value, onChange}: UserDetails) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>

      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        value={value}
        id={id}
        required
        className={`input input-bordered  ${size}`}
      />
    </div>
  )
}

export default FormInput