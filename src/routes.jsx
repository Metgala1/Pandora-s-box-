import Signup from "./components/Signup"
import App from "./App"
import Login from "./components/Login"

const routes = [
    {
        path: "/",
        element: <App />
    },
    {path: 'signup',
     element: <Signup />
    },
    {
        path: "login",
        element: <Login />
    }
]

export default routes