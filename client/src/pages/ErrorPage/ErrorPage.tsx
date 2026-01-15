import { useParams } from "react-router";

import "./errorPage.css"

function ErrorPage() {
    const { statusCode } = useParams();

    return (
        <div>
	    <h1>Error Page</h1>
	    <h3>{statusCode}</h3>
        </div>
    )
}

export default ErrorPage