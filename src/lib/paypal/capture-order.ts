import { paypalAxiosWithAccessToken } from "./axios-instance";

export async function captureOrder({ orderId, accessToken }: { orderId: string, accessToken: string }) {
  return await paypalAxiosWithAccessToken(accessToken).post(`/v2/checkout/orders/${orderId}/capture`)
}