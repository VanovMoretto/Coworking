import React from "react";
import '../Styles/RequireLogin.css'

const RequireLogin = () => {
    return (
       <div className="reqLog-page">
        <div className="reqLog-container">
        <h2 className="reqLog-h2">Ops...</h2>
        <h1 className="reqLog-h1">Parece que você ainda não fez o login!</h1>
        <h2 className="reqLog-h2">Faça o login para continuar.</h2>
       </div>
       </div>
    )
}

export default RequireLogin