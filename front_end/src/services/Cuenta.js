import Api from './Api'

export default {

    crearCuenta: (data) => {
        return Api().post('api/cuenta',data)
    },
    loginCuenta : (cuenta,pwd) => {
        return Api().get(`api/cuenta/${cuenta}/${pwd}`)
    }
}
