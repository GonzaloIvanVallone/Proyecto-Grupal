import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import * as actions from '../../redux/actions/productsActions';
import s from './PostLogIn.module.css';
import logo  from '../../img/logo.JPG'
import validateData from "./LoginSocialValidateData";
import Loading from '../Loading/Loading';
import Swal from "sweetalert2"

export default function PostLogIn() {
  let dataAuth0, userExists

  // Auth0
  const { user, isAuthenticated, isLoading } = useAuth0();

  const history = useHistory()
  const dispatch = useDispatch();
  const socialUser = useSelector((state) => state.socialUser);

  useEffect(() => {
    if (isAuthenticated) {
      dataAuth0 = {
        name: user.given_name ? user.given_name : '',
        surname: user.family_name ? user.family_name : '',
        email: user.email ? user.email : '',
        adress: '',
        subId: user.sub ? user.sub :'',
        origin: 'socialUser'
      }
      setUser(prevstate => dataAuth0)
      testIsSocialUser(user);
    }
  }, [user])

useEffect(() => {
  setUser(prevstate => ({
    ...prevstate, name: socialUser.name, surname: socialUser.surname, 
    email: socialUser.email, adress: socialUser.adress
  }))
}, [socialUser])

  const initialState = {
    name: '',
    surname: '',
    email: '',
    adress: '',
    sub: ''
  }
  const [userDb, setUser] = useState(initialState);
  const [errors, setErrors] = useState({});

  if(isLoading) return <Loading/>
  if (!isAuthenticated) history.push('/home')


  const testIsSocialUser = (user) => {
    if (isAuthenticated) {
      dispatch(actions.isSocialUser(user))
      .then( response => {
        userExists = response.payload.subId ? true : false;
        setUser((prevState)=> ({...prevState, userExists: userExists}))
      })
    }
  }

  const handleOnChange = (e) => {
    e.preventDefault();
    setUser(prevstate => ({ ...prevstate, [e.target.name]: e.target.value }))
    let dataErrors = validateData(userDb)
    setErrors(prevState => (dataErrors))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!userDb.userExists) {
      let dataErrors = validateData(userDb)
      setErrors(prevState => (dataErrors))
      if (Object.keys(dataErrors).length === 0) {
        dispatch(actions.signNewUser(userDb))
        .then(reponse => dispatch(actions.loginUser(userDb)))
         Swal.fire({
          title: 'New User created!',
          icon: 'success',
          confirmButtonText: 'Continue'
        })
        setUser(initialState)
      }
    } 
    else {
      dispatch(actions.loginUser(userDb));
    }
    history.push('/')
  }

  return (
    <div className={s.container}>
      <section className={s.section1}>
        <div className={s.logo}>
          <img src={logo} alt="LOGO" className={s.logo}/>
          <h3>CloudyBuy</h3>
        </div>
        <div> <h1>Welcom to the Store!</h1></div>
        { !userDb.userExists && 
          <div><h3>The following data will be stored in our store, in order to interact with you</h3></div>
        }
        { !userDb.userExists &&
          <div><h4>Please complete the missing data and modify what you consider necessary.</h4></div> 
        }
        { userDb.userExists &&
          <div><h1>Fulfill your dreams buying the products you want</h1></div> 
        }
      </section>

      <section className={s.section2}>
        <div className={s.content}>
          <h1>Client Data</h1>
          <form className={s.formCard} onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="">
              Name:
              <input className={s.inputCard} type="text" value={userDb.name} 
                name='name' onChange={e => handleOnChange(e)} disabled={userDb.userExists}/>
              {errors.name && (<p className={s.danger}>{errors.name}</p>)}
            </label>
            <label htmlFor="">
              LastName:
              <input className={s.inputCard} type="text" value={userDb.surname} 
                name='surname' onChange={e => handleOnChange(e)} disabled={userDb.userExists}/>
              {errors.surname && (<p className={s.danger}>{errors.surname}</p>)}
            </label>
            <label htmlFor="">
              Address:
              <input className={s.inputCard} type="test" value={userDb.adress} 
                name='adress' onChange={e => handleOnChange(e)} disabled={userDb.userExists}/>
              {errors.adress && (<p className={s.danger}>{errors.adress}</p>)}
            </label>  
            <label htmlFor="">
              E-mail:
              <input className={s.inputCard} type="email" value={userDb.email} 
                name='email' onChange={e => handleOnChange(e)} disabled={userDb.userExists}/>
              {errors.email && (<p className={s.danger}>{errors.email}</p>)}
            </label>
            { !userDb.userExists ?
              <button className={s.btns} type="submit">Save Data and Log In</button>
              :
              <button className={s.btns} type="submit">Go to the Store</button>
            }       
          </form>
        </div>
      </section>

    </div>

  )

}