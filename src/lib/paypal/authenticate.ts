import { paypalAxios } from "./axios-instance"

export const getAccessToken = async (clientId: string, clientSecret: string) => {
  try {
    const { data } = await paypalAxios.post('/v1/oauth2/token',
      { grant_type: 'client_credentials' },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
        }
      }
    )
    return data.access_token
  } catch (error) {
    throw error
  }
}