import React from 'react'
import useCustomLogin from '../../hooks/useCustomLogin'

const LogoutComponent = () => {
    const { doLogout, moveToPath } = useCustomLogin()

    const handleClickLogout = (e) => {
        doLogout()
        alert("Logout Complete")
        moveToPath('/')
    }

    return (
        <div className='border border-gray-200 rounded-lg shadow-lg p-8 max-w-md mx-auto mt-20 bg-white'>
            <div className='text-center'>
                <h2 className='text-2xl md:text-3xl font-extrabold text-gray-700 mb-6'>
                    Log out now?
                </h2>
                <p className='text-gray-500 mb-8'>
                    If you log out, you will be redirected to the main page.
                </p>
            </div>

            <div className='flex justify-center space-x-4'>
                <button
                    className='bg-gray-500 hover:bg-gray-600 transition duration-300 text-white font-semibold py-3 px-8 rounded-md shadow-md'
                    onClick={handleClickLogout}
                >
                    LOGOUT
                </button>
                <button
                    className='bg-gray-300 hover:bg-gray-400 transition duration-300 text-gray-700 font-semibold py-3 px-8 rounded-md shadow-md'
                    onClick={() => moveToPath('/')}
                >
                    CANCEL
                </button>
            </div>
        </div>
    )
}

export default LogoutComponent
