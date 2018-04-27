import Api from '@/services/Api'

export default {

  async getLand (params) {
    console.log('get land');
    const response = await Api().get('lands/getLandByID/' + params.id)
    return response
  },
  async divideLand (params) {
    const response = await Api().post('lands/divide/' + params.id, params.body)
    return response
  },

}
