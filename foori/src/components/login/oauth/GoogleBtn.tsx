


const GoogleBtn = () => {

    const googleLogin = () => {
        window.location.href = "http://localhost:5000/auth/google";
    }

    return (
        <button onClick={googleLogin} className="google-btn">
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="google" />
            <span>Google</span>
        </button>
    )

}

export default GoogleBtn;