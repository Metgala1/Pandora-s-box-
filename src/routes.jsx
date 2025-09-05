import Signup from "./components/Signup"
import App from "./App"
import Login from "./components/Login"
import FileManager from "./components/File"
import FileUpload from "./components/FileUpload"
import Images from "./components/Image"

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
    },
    {
     path: 'upload',
     element: <FileUpload />

    },
    {
      path: "images",
      element: <Images />
    }
    
]

export default routes