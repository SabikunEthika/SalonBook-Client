import Link from "next/link";
export default function PaymentCancelPage() { return <main className="payment-page"><p className="eyebrow">Payment cancelled</p><h1>Your appointment is still reserved.</h1><p>No payment was taken. You can return to your dashboard and try again when you are ready.</p><Link className="button" href="/dashboard">Back to dashboard</Link></main>; }
