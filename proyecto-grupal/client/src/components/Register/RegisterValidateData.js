const validateData = (data) => {
    console.log('data', data)
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
    if (data.password === '') {
      errors.password = 'Must specify a password'
    }
    if (data.adress === '') { 
      errors.adress = 'Must specify an address'
    }

    console.log('errors',errors)
    return errors
  }
  
  export default validateData;