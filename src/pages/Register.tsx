
import { FormInput, SubmitBtn } from '../components'
import { Form, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  const handleRegistration = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (
      registrationData.name === '' &&
      registrationData.email === '' &&
      registrationData.password === ''
    ) {
      toast.error('input fields are empty!')
      return
    }
    if (
      registrationData &&
      registrationData.name &&
      registrationData.email &&
      registrationData.password
    ) {
      localStorage.setItem('userDetails', JSON.stringify(registrationData))

      toast.success('User registered successfully!')
      navigate('/login')
    } else {
      toast.error('Invalid registration data')
      return
    }
  }

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4 capitalize"
      >
        <h4 className="text-center text-3xl font-bold">register</h4>
        <FormInput
          type="text"
          name="name"
          label="name"
          id="name"
          onChange={(e) =>
            setRegistrationData({ ...registrationData, name: e.target.value })
          }
          value={registrationData.name}
        />
        <FormInput
          type="email"
          name="email"
          label="email"
          id="email"
          onChange={(e) =>
            setRegistrationData({ ...registrationData, email: e.target.value })
          }
          value={registrationData.email}
        />
        <FormInput
          type="password"
          name="password"
          label="password"
          id="password"
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              password: e.target.value,
            })
          }
          value={registrationData.password}
        />
        <div className="mt-4">
          <SubmitBtn text="submit" onClick={handleRegistration} />
        </div>

        <p className="text-center">
          already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary font-bold"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  )
}

export default Register
