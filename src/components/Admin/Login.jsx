import { useRef, useState } from "react"
import { useAuth } from "../Firebase/AuthContext"
import { useNavigate } from "react-router-dom"
import { auth } from "../Firebase/firebase"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const { deltAccount } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      if (auth.currentUser.emailVerified !== true) {
        deltAccount();
        setError("Email wasnt verfied Hence delted");
      }else {
        history("/")
      }
    } catch{
      setError("Failed to login")
    }

    setLoading(false)
  }
  return (
    <>
    <section className="flex w-full h-screen bg-logo2">
      <div className="w-full max-w-sm mx-auto my-auto overflow-hidden rounded-lg shadow-md">
          <div className="flex items-center justify-center py-4 text-center bg-logo1">
              <h2 className="text-3xl font-bold text-center text-white">Login</h2>
          </div>
          <div>
            {error && <h4 className="flex items-center justify-center py-3 text-center bg-red-600 w-full">{error}</h4>}
          </div>
          <form className="bg-gray-600" onSubmit={(e) => {handleSubmit(e)}}>
              <div className="py-6 px-4">
                  <div className="w-full mt-4">
                      <input class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring" 
                      type="email" 
                      placeholder="Email Address" 
                      ref={emailRef} required 
                      />
                  </div>

                  <div className="w-full my-4">
                      <input className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring"
                       type="password"
                       placeholder="Password" 
                       ref={passwordRef} required 
                      />
                  </div>
              </div>
              <div className="flex items-center justify-center py-2 text-center bg-logo1">
                <button className="py-2 w-6/12 leading-5 transition-colors duration-200 transform bg-logo3 rounded hover:bg-gray-300 focus:outline-none" 
                  type="submit" 
                  disabled={loading} 
                >
                  Log in
                </button>
              </div>
          </form>
      </div>
    </section>
    <div className="flex w-full bg-logo1"><p className="text-zinc-200 mx-auto py-5 text-xs">Nothing Down here simply here for style</p></div>
    </>
  )
}
