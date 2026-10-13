import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import BuyForm from "@/components/buy-form";

export const metadata = {
  title: "Buy Affiliate Training",
  description: "Share your details to ask LearnIND about Affiliate Training for ₹149.",
};

export default function BuyPage() {
  return (
    <main className="content-page">
      <header className="content-heading">
        <div className="section-kicker">A SIMPLE FIRST STEP</div>
        <h1>Start your learning journey.</h1>
        <p>
          Share your details with LearnIND on WhatsApp to ask about Affiliate Training.
        </p>
      </header>

      <div className="content-layout">
        <BuyForm />

        <aside className="info-card surface-card" aria-labelledby="training-summary">
          <span className="info-card-kicker">LEARNIND · AFFILIATE TRAINING</span>
          <h2 id="training-summary">Training access</h2>
          <div className="price-display">
            <strong>₹149</strong>
            <span>one-time price</span>
          </div>
          <p className="form-intro">
            There is no payment form or payment gateway on this website. LearnIND will share the payment process directly with you.
          </p>
          <div className="info-divider" />
          <ul className="info-list">
            <li>
              <Check size={16} />
              <span>WhatsApp opens with your details filled in. Review the message and press Send yourself.</span>
            </li>
            <li>
              <ShieldCheck size={16} />
              <span>Training access is provided after LearnIND confirms payment and issues your login credentials.</span>
            </li>
            <li>
              <ArrowRight size={16} />
              <span>After receiving your credentials, sign in to access the protected training area.</span>
            </li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
