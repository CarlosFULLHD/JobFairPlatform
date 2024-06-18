import Api from './Api'


export default {
    // SERVICIO PARA LISTAR TODAS LAS INSTITUCIONES
    listarIns : () => {
        return Api().get('api/chats_empresas')
    },
    chatIns: (id) => {
        return Api().get(`api/chats_empresas/${id}`)
    },
    chatDatos: (id) => {
        return Api().get(`api/chats_empresas/datos/${id}`)
    },
    chatCupos: (id) => {
        return Api().get(`api/chats_empresas/cupos/${id}`)
    },
}