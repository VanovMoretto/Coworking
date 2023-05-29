import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <h1 className="404">
                Error 404
            </h1>
            <h1 className="404">
                Page not found!
            </h1>
            <Link to="/">
            <button>Voltar</button>
            </Link>
        </div>
    )
}

export default NotFound