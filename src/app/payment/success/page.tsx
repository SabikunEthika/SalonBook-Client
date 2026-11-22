import Link from "next/link";
export default function PaymentSuccessPage() { return <main className="payment-page"><p className="eyebrow">Payment received</p><h1>Thank you for booking with us.</h1><p>Stripe is confirming your payment securely. Your appointment will show as paid once the verified webhook arrives.</p><Link className="button" href="/dashboard">Back to dashboard</Link></main>; }
