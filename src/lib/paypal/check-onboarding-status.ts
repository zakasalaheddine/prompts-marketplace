import { paypalAxiosWithAccessToken } from "./axios-instance"

export const checkPaypalOnBoardingStatus = async ({ trackingId }: { trackingId: string }) => {
  return await paypalAxiosWithAccessToken('').get(`/v1/customer/partners/partner_id/merchant-integrations?tracking_id=${trackingId}`)
}