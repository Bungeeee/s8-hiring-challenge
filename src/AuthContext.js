import { createContext, useEffect, useState } from "react"
import { RecaptchaVerifier, onAuthStateChanged, signInWithPhoneNumber } from "firebase/auth"
import { auth } from "./Firebase"

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
  const [info, setInfo] = useState(null)
  const setUpRecaptcha = (number) => {
    console.log(number)
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth)
    recaptchaVerifier.render()
    return signInWithPhoneNumber(auth, number, recaptchaVerifier)
  }
  useEffect(() => {
    const updateContext = onAuthStateChanged(auth, (user)=>{setInfo(user)})
    return () => {
      updateContext()
    }
  }, [])
  return (
    <AuthContext.Provider value={{info, setUpRecaptcha}}>
      {children}
    </AuthContext.Provider>
  )
}