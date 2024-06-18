import Api from './Api'


export default {
    // SERVICIO PARA LISTAR TODAS LAS INSTITUCIONES
    listarIns : (parameters) => {
        return Api().get('api/instituciones',parameters)
    },
    // OBTENER INSTITUCION POR ID
    getInstById : (id) => {
        return Api().get(`api/instituciones/${id}`)
    },
    borrarIns: (id) => {
        return Api().delete(`api/instituciones/${id}`)
    },
    updateIns: (id, data) => {
        return Api().patch(`api/instituciones/${id}`,data)
    },
    crearIns: (data) => {
        return Api().post('api/instituciones',data)
    },
    // SERVICIOS PARA MANEJO DE IMAGENES INSTITUCIONES
    crearImg: (data) => {
        return Api().post('api/institucionesimages',data)
    },
       // SERVICIOS PARA MANEJO DE VIDEOS INSTITUCIONES
    crearVid: (data) => {
        return Api().post('api/institucionesvideos',data)
    },
    // SERVICIOS PARA MANEJO DE LINKS INSTITUCIONES
    crearLink: (data) => {
        return Api().post('api/institucioneslinks',data)
    }

}





