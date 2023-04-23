import { MuiTelInput } from "mui-tel-input"
import { useContext, useState } from "react"
import { AuthContext } from "../AuthContext"

const Login = () => {
  const [telnum, setTelNum] = useState('')
  const [confirmation, setConfirmation] = useState(null)
  const [code, setCode] = useState('')
  const authCtx = useContext(AuthContext)
  const handleOnSubmitNumber = () => {
    authCtx.setUpRecaptcha(telnum).then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      console.log('submitted-result-confirmed');
      setConfirmation(confirmationResult)
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
      alert(error)
    });
  }
  const handleOnSubmitOTP = () => {
    confirmation.confirm(code).then((res) => {
      console.log('otp-confirmed')
    }).catch((e) => {alert(e)})
  }

  return (
    <div className="wrapper centered">
      { confirmation===null?
        <div className="login-body">
          <div className="title">Login / Sign up</div>
          <MuiTelInput defaultCountry="TW" forceCallingCode value={telnum} onChange={(num) => { setTelNum(num); }} />
          <div id="recaptcha-container" />
          <div className="button large" onClick={handleOnSubmitNumber} style={{ color: '#fff', backgroundColor: 'blue' }}>Send OTP</div>
        </div> : 
        <div className="login-body">
          <div className="title">OTP Verification</div>
          <input type='number' maxLength="6" className="single-input" value={code} onChange={(evt)=>(setCode(evt.target.value))} />
          <div className="button large" onClick={handleOnSubmitOTP} style={{ color: '#fff', backgroundColor: 'blue' }}>Submit</div>
        </div>
      }
    </div>
  )
}

export default Login