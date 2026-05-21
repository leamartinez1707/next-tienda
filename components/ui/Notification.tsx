'use client'
import { ToastContainer } from "react-toastify"

const Notification = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={2800}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
        />
    )
}

export default Notification