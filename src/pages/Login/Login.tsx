import React, { Dispatch, SetStateAction } from "react";

type PropsType = {
    setShowLoginPage: Dispatch<SetStateAction<boolean>>
}

const Login: React.FC<PropsType> = (props) => {

    const {setShowLoginPage} = props;

  return (
    <section className="login-page">
        <h1>Demo Mode</h1>
        <button className="login-close-btn" onClick={() => setShowLoginPage(false)}>OK</button>
    </section>
  )
}

export default Login