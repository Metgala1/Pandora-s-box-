import Signup from "./components/Signup"
import App from "./App"
import Login from "./components/Login"
import FileManager from "./components/File"
import FileUpload from "./components/FileUpload"
import Images from "./components/Image"
import Videos from "./components/Videos"
import Audios from "./components/Audio"
import Documents from "./components/Document"
import ComingSoon from "./components/ComingSoon"

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
    },
    {
        path: "videos",
        element: <Videos />
    },
    {
        path: "audios",
        element: <Audios />
    },
    {
        path: "documents",
        element: <Documents />
    },
    {
        path: "profile",
        element: <ComingSoon />
    }
    
]

export default routes