import React, {useState, useRef, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {

    let navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [phonenum,setPhonenum] = useState('');
    const [passwordCheck,setPasswordCheck] = useState('');
    const [passwordError,setPasswordError] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if(password !== passwordCheck){
            return setPasswordError(true);
        }

        console.log({
            email,
            password,
            name,
            address,
            phonenum
        });

        const user_data = {
            email: email,
            nickname: name,
            password: password,
            address: address,
            phonenumber: phonenum,
        };

        axios.post('http://127.0.0.1:8000/user/signup/',user_data).then(
            navigate(`/Signin`)
        );
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangeName = (e) => {
        setName(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onChangeAddress = (e) => {
        setAddress(e.target.value);
    };
    const onChangePhonenum= (e) => {
        setPhonenum(e.target.value);
    };
    const onChangePasswordChk = (e) => {
        //비밀번호를 입력할때마다 password 를 검증하는 함수
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    };

    return (
    <div className="signup">
            <div>
                <label className="label">이메일</label><br/>
                <input className="user" name="user-id" value={email} required onChange={onChangeEmail} />
            </div><br/>
            <div>
                <label className="label">닉네임</label><br/>
                <input className="user" name="user-nick" value={name} required onChange={onChangeName} />
            </div><br/>
            <div>
                <label className="label">비밀번호</label><br/>
                <input className="user"  name="user-password" type="password" value={password} required onChange={onChangePassword} />
            </div><br/>
            <div>
                <label className="label">주소</label><br/>
                <input className="user"  name="user-address" value={address} required onChange={onChangeAddress} />
            </div><br/>
            <div>
                <label className="label">연락처</label><br/>
                <input className="user"  name="user-phonenum" value={phonenum} required onChange={onChangePhonenum} />
            </div><br/>
            <div>
                <label className="label">password check</label><br/>
                <input className="user"  name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordChk} />
                {passwordError && <div style={{color : 'red'}}>비밀번호가 일치하지 않습니다.</div>}
            </div><br/><br/>
            <div style={{marginTop:10}}>
                <button className = "button" type="primary" onClick={onSubmit}>가입하기</button>
             </div><br/><br/>

        </div>

    
    );
    

}

export default Signup;