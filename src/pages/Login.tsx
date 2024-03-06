
import { Form } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FormInput, SubmitBtn } from '../components'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

interface UserDetails {
  email: string
  password: string
}

const Login = () => {
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  })

  const [storedUserDetails, setStoredUserDetails] =
    useState<UserDetails | null>(null) // Using UserDetails | null to represent initial state

  const [isDataAvailable, setIsDataAvailable] = useState(false)

  useEffect(() => {
    if (isDataAvailable) return
    try {
      const storedUserDetails = localStorage.getItem('userDetails')
      if (storedUserDetails) {
        setStoredUserDetails(JSON.parse(storedUserDetails))

        setIsDataAvailable(true)
      }
    } catch (error) {
      console.error('Error parsing stored user details:', error)
    }
  },[])

  const navigate = useNavigate()

  const handleSignIn = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault()
      // setIsLoading(true)

      if (isDataAvailable && storedUserDetails && signInData) {
        if (
          storedUserDetails.password === signInData.password &&
          storedUserDetails.email === signInData.email
        ) {
          navigate('/landing')
          toast.success('user signed-in successfully!')
        } else {
          toast.error('User not found!.please click on sign-up to register')
          return
        }
      } else {
        console.error('Stored user data or sign-in data is undefined')
      }
    } catch (error) {
      console.error('Error in handleSignIn:', error)
    } finally {
      // setIsLoading(false)
    }
  }

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4 capitalize"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="email"
          name="email"
          label="email"
          value={signInData.email}
          onChange={(e) =>
            setSignInData({ ...signInData, email: e.target.value })
          }
          id="email"
        />
        <FormInput
          type="password"
          name="password"
          label="password"
          value={signInData.password}
          onChange={(e) =>
            setSignInData({ ...signInData, password: e.target.value })
          }
          id="password"
        />
        <div className="mt-4">
          <Link to="/landing">
            <SubmitBtn text="login" onClick={handleSignIn} />
          </Link>
        </div>

        <p className="text-center">
          not a member yet?
          <Link
            to="/"
            className="ml-2 link link-hover link-primary font-bold"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  )
}

export default Login
