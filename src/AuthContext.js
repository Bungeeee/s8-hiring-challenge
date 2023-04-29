import { createContext, useEffect, useState } from "react"
import { RecaptchaVerifier, onAuthStateChanged, signInWithPhoneNumber, updateProfile, signOut } from "firebase/auth"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage } from "./Firebase"

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
  const [info, setInfo] = useState(null)
  const [statusChecking, setStatus] = useState(true)

  const setUpRecaptcha = (number) => {
    console.log(number)
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth)
    recaptchaVerifier.render()
    return signInWithPhoneNumber(auth, number, recaptchaVerifier)
  }
  const uploadAvatar = (file, filename) => {
    const storageRef = ref(storage, `avatar/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error)
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          updateProfile(info, {photoURL: downloadURL})
          setInfo({...info, photoURL: downloadURL})
        });
      }
    );
  }
  const changeDisplayName = (newName) => {
    updateProfile(info, {displayName: newName})
    setInfo({...info, displayName: newName})
  }
  const logout = () => {
    signOut(auth).then(() => {
      setInfo(null)
    })
  }


  useEffect(() => {
    const updateContext = onAuthStateChanged(auth, (user) => { setInfo(user);setStatus(false); })
    return () => {
      updateContext()
    }
  }, [])
  return (
    <AuthContext.Provider value={{ info, statusChecking, setUpRecaptcha, uploadAvatar, changeDisplayName, logout }}>
      {children}
    </AuthContext.Provider>
  )
}