import Signup from "./components/Signup"
import App from "./App"
import Login from "./components/Login"
import FileManager from "./components/File"

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
    },
    {
     path: "files",
     element: <FileManager />
    }
]

export default routes