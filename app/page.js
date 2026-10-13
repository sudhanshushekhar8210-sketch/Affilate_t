import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

export const metadata = {
  title: "LearnIND | Learn Then Earn",
  description:
    "Start your LearnIND Affiliate Training journey. Learn then earn.",
};

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="hero" aria-labelledby="home-title">
        <div className="hero-glow hero-glow-gold" aria-hidden="true" />
        <div className="hero-glow hero-glow-blue" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

        <div className="hero-copy page-enter">
          <div className="eyebrow">
            <span className="eyebrow-mark" aria-hidden="true" />
            AFFILIATE TRAINING · LEARNIND
          </div>
          <h1 id="home-title">
            Learn today.
            <br />
            <span className="gold-gradient">Build what&apos;s next.</span>
          </h1>
          <p className="hero-description">
            A focused place to begin learning affiliate marketing, at your own
            pace.
          </p>

          <div className="hero-actions">
            <Link className="button button-primary hero-buy" href="/buy">
              <BookOpen size={18} strokeWidth={1.8} />
              Buy Training <span className="price">₹149</span>
              <ArrowRight className="button-arrow" size={17} />
            </Link>
            <Link className="button button-secondary" href="/login">
              Login
              <ArrowRight className="button-arrow" size={16} />
            </Link>
          </div>

          <div className="hero-note">
            <Sparkles size={15} aria-hidden="true" />
            <span>One-time price. Training access is provided after payment is confirmed.</span>
          </div>
        </div>

        <div className="hero-art page-enter page-enter-delayed" aria-hidden="true">
          <div className="art-orbit orbit-outer" />
          <div className="art-orbit orbit-inner" />
          <div className="art-card">
            <div className="art-card-top">
              <span className="art-monogram">L</span>
              <span className="art-card-caption">YOUR NEXT CHAPTER</span>
              <span className="art-status" />
            </div>
            <div className="art-emblem">
              <div className="art-emblem-ring">
                <BookOpen size={49} strokeWidth={1.15} />
              </div>
              <span className="art-spark art-spark-one">✳</span>
              <span className="art-spark art-spark-two">✦</span>
            </div>
            <div className="art-card-rule" />
            <span className="art-card-label">LEARNIND · AFFILIATE TRAINING</span>
            <strong>Learn Then Earn</strong>
            <span className="art-card-subtitle">A little progress, every day.</span>
          </div>
          <div className="art-footnote">
            <span className="art-footnote-line" />
            <span>LEARN · PRACTICE · GROW</span>
          </div>
        </div>
      </section>
    </main>
  );
}
