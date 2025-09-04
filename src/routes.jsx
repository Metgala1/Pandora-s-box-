import Signup from "./components/Signup"
import App from "./App"

const routes = [
    {
        path: "/",
        element: <App />
    },
    {path: 'signup',
     element: <Signup />
    }
]

export default routes