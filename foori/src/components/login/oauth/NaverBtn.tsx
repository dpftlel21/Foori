
const NaverBtn = () => {

    return (

        <div className="naver">
            <a href="https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:3000/oauth/naver&state=STATE_STRING"
                className="naverBtn">
                <img src="https://static.nid.naver.com/oauth/small_g_in.PNG" alt="naver" />
                <span>네이버로 로그인</span>
            </a>
        </div>

    );
}

export default NaverBtn;