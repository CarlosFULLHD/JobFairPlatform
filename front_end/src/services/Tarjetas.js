import Api from './Api'

export default {
    crearTarjeta: () => {
        return Api().get('api/institucionesjoin')
    },
    getImgById:(id) => {
        return Api().get(`api/institucionesimagesv1/${id}`)
    },
    getImgs:(data) => {
        return Api().get(`api/institucionesimagesv1/`,data)
    },
    
    getLinks:(data) => {
        return Api().get(`api/institucioneslinks`, data)
    },
    getImgByIdTwo:(id) => {
        return Api().get(`api/institucionesimages/${id}`)
    },

    getVidById:(id) => {
        return Api().get(`api/institucionesvideos/${id}}`)
    },
    getLinksById: (id) => {
        return Api().get(`api/institucioneslinks/${id}`)
    }
}