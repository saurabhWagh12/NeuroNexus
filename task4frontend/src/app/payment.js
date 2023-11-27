import { loadStripe } from '@stripe/stripe-js'

export default async function payment({lineItems}) {
    let stripePromise = null;
    const getStripe = async()=>{
        if(!stripePromise){
            stripePromise = loadStripe('pk_test_51OAWiUSHgfpV3VGrawBXmshZKLRa50Qc9DcEZfXj4yXGbfvyGSxmu2aNc9zX7SiVC6EMKXIp1SN0crovqcVR99Yc00wUoC5hpt')
        }
        return stripePromise;
    }
    const stripe = await getStripe()
    await stripe.redirectToCheckout({
            mode:"payment",
            lineItems,
            successUrl:`${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl:window.location.origin,
        })
  return (
    <div>page</div>
  )
}

