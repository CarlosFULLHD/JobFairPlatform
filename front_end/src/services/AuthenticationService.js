import Api from './Api'

// WILL ALLOW US TO CALL THE REGISTER OBJECT

export default {
    ping : (parameters) => {
        return Api().get('ping',parameters)
    }
}

//AuthenticationService.register({
//    email:'test@gmail.com',
//    password:'123456'
// })