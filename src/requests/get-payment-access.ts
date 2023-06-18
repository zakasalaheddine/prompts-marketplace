import axios from "axios"

export const getPaymentAccess = async () => {
  return await axios.get('/api/payments')
}