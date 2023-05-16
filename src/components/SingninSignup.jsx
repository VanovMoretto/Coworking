import React, { useState } from 'react';
import SignUp from '../pages/Signup';
import SignIn from './Signin';
import '../Styles/SigninSignup.css';






const SigninSignup = ({ closeModal }) => {
    const [isChecked, setIsChecked] = useState(false);
  
    const toggleCheck = () => {
      setIsChecked(!isChecked);
    };
  
    return (

        <div className="section">
          <div className="container">
            <div className="row full-height justify-content-center">
              <div className="col-12 text-center align-self-center py-5">
                <div className="section pb-5 pt-5 pt-sm-2 text-center">
                  <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" onChange={toggleCheck} />
                  <label htmlFor="reg-log" className={isChecked ? 'checkedLabel' : 'uncheckedLabel'}>
                    <span className='switch-in' >Entrar</span>
                    <span className='switch-up' >Criar</span>
                  </label>
                  <div className="card-3d-wrap mx-auto">
                    <div className="card-3d-wrapper">
                      <div className="card-front">
                        <div className="center-wrap">
                          <SignIn />
                        </div>
                      </div>
                      <div className="card-back">
                        <div className="center-wrap">
                          <SignUp closeModal={closeModal} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
  
  export default SigninSignup;

