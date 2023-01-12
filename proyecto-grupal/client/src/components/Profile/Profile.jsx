import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from '../../redux/actions/productsActions';
import logo  from '../../img/logo.JPG'
import s from './Profile.module.css';

export default function Profile() {

  const history = useHistory();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const user = useSelector((state) => state.user);
  
  useEffect(()=> {
    dispatch(actions.getUserProfile(user))
  }, [user]);

  useEffect(()=>{
    setUser(prevstate => userProfile)
  }, [userProfile]);

  const initialState = {
    name: '',
    surname: '',
    email: '',
    adress: '',
    sub: '',
    editData: false,
  }
  const [userDb, setUser] = useState(initialState);
  const [errors, setErrors] = useState({});


  const handleOnChange = (e) => {
    e.preventDefault();
    setUser(prevstate => ({ ...prevstate, [e.target.name]: e.target.value }))
    let dataErrors = validateData(userDb)
    setErrors(prevState => (dataErrors))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(userDb.editData) { 
      let dataErrors = validateData(userDb)
      setErrors(prevState => (dataErrors))
      if (Object.keys(dataErrors).length === 0) {
        dispatch(actions.updateUserProfile(userDb))
        history.push('/')
      }
    } else {
      setUser(prevstate => ({...prevstate, editData: true}))
    }

  }

  const handleExit = (e) => {
    history.push('/')
  }

  const validateData = (data) => {
    let errors = {};
    if (data.name === '')  {
      errors.name = 'Must specify a Name'
    }
    if (data.surname === '') {
      errors.surname = 'Must specify a Last Name'
    }
    if (data.email === '') {
      errors.email = 'Must specify an email'
    }
    if (data.adress === '') { 
      errors.adress = 'Must specify an address'
    }
    return errors
  }

  return (
    <div className={s.container}>
      <section className={s.section1}>
        <div className={s.logo}>
          <img src={logo} alt="LOGO" className={s.logo}/>
          <h3>CloudyBuy</h3>
        </div>
        <div> <h1>Welcom to the Store!</h1></div>
        <div><h1>Fulfill your dreams buying the products you want</h1></div>
      </section>

      <section className={s.section2}>
        <div className={s.content}>
          <h1>Client Data</h1>
          <form className={s.formCard} onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="">
              Name:
              <input className={s.inputCard} type="text" value={userDb.name} 
                name='name' onChange={e => handleOnChange(e)} disabled={!userDb.editData}/>
              {errors.name && (<p className={s.danger}>{errors.name}</p>)}
            </label>
            <label htmlFor="">
              LastName:
              <input className={s.inputCard} type="text" value={userDb.surname} 
                name='surname' onChange={e => handleOnChange(e)} disabled={!userDb.editData}/>
              {errors.surname && (<p className={s.danger}>{errors.surname}</p>)}
            </label>
            <label htmlFor="">
              Address:
              <input className={s.inputCard} type="test" value={userDb.adress} 
                name='adress' onChange={e => handleOnChange(e)} disabled={!userDb.editData}/>
              {errors.adress && (<p className={s.danger}>{errors.adress}</p>)}
            </label>  
            <label htmlFor="">
              E-mail:
              <input className={s.inputCard} type="email" value={userDb.email} 
                name='email' onChange={e => handleOnChange(e)} disabled={!userDb.editData}/>
              {errors.email && (<p className={s.danger}>{errors.email}</p>)}
            </label>
            { !userDb.editData ?
              <button className={s.btns} type="submit">Edit Data</button>
              :
              <button className={s.btns} type="submit">Save Changes</button>
            }      
          </form>
          <div className={s.divExit}>
            <button className={s.btns} onClick={e => handleExit(e)}>Go to the Store</button>
          </div>
        </div>
      </section>

    </div>

  )



}
