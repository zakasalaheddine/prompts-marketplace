import { z } from "zod";
import { paypalAxiosWithAccessToken } from "./axios-instance";

const CreateOrderParamsSchema = z.object({
  amount: z.number(),
  payeeEmailAddress: z.string().email(),
  platformFee: z.number(),
  accessToken: z.string(),
  bnCode: z.string()
})

export async function createOrder({ amount, payeeEmailAddress, platformFee, accessToken, bnCode }: z.infer<typeof CreateOrderParamsSchema>) {

  return await paypalAxiosWithAccessToken(accessToken).post('/v2/checkout/orders', {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: amount.toFixed(2).toString(),
        },
        payee: {
          email_address: payeeEmailAddress,
        },
        payment_instruction: {
          disbursement_mode: "INSTANT",
          platform_fees: [
            {
              amount: {
                currency_code: "USD",
                value: platformFee.toFixed(2).toString(),
              },
            },
          ],
        },
      },
    ],
  }, {
    headers: {
      "PayPal-Partner-Attribution-Id": bnCode
    }
  })
}