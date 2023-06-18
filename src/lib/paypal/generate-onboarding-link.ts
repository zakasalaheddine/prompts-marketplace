import { paypalAxiosWithAccessToken } from "./axios-instance"

interface GenerateLinksParams {
  trackingId: string
  returnUrl: string
  accessToken: string
}
interface OnboardingLink {
  href: string
  rel: 'self' | 'action_url'
  method: 'GET'
}
interface GenerateLinksResponse {
  links: OnboardingLink[]
}

export const generateLinks = async ({ trackingId, returnUrl, accessToken }: GenerateLinksParams) => {
  try {
    const { data: { links } } = await paypalAxiosWithAccessToken(accessToken).post<GenerateLinksResponse>('/v2/customer/partner-referrals', {
      tracking_id: trackingId,
      operations: [
        {
          operation: 'API_INTEGRATION',
          api_integration_preference: {
            rest_api_integration: {
              integration_method: 'PAYPAL',
              integration_type: 'THIRD_PARTY',
              third_party_details: {
                features: ['PAYMENT', 'REFUND']
              }
            }
          }
        }
      ],
      "partner_config_override": {
        "partner_logo_url": "https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg",
        "return_url": returnUrl,
        "return_url_description": "the url to return the merchant after the paypal onboarding process.",
        "show_add_credit_card": true
      },
      products: ['EXPRESS_CHECKOUT'],
      legal_consents: [
        {
          type: 'SHARE_DATA_CONSENT',
          granted: true
        }
      ]
    })
    return links
  } catch (error) {
    throw error
  }
}