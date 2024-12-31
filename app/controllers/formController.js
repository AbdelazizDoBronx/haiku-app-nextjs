'use server'

export const register = async function (prevState,formData) {
    
    const errors = {};

    const newUser = {
        username : formData.get('username'),
        password : formData.get('password')
    }

    if(newUser.username.length < 3) errors.username = "username must be greater than 3 alphabets!"
    if(newUser.username.length > 30) errors.username = "username cant be greater than 30 alphabets!"
    if(newUser.username.length == "") errors.username = "username cant be empty!"
   
   
    if(newUser.password.length < 12) errors.password = "password must be greater than 12 caractere!"
    if(newUser.password.length > 50) errors.password = "password cant be greater than 50 caractere!"
    if(newUser.password.length == "") errors.password = "password cant be empty!"

    if(errors.username){
        return {
            status : 'error',
            data : {username:errors.username,password:errors.password}
        }
    }

    return {
        status : 'success'
    }
}
