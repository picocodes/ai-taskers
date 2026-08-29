"use client";

import { FormEvent, useState } from "react";

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function sendLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return <main>
    <header className="nav shell">
      <a className="wordmark" href="#top" aria-label="AI Taskers home"><span>AI</span> Taskers</a>
      <p className="nav-note">Managed AI training accounts</p>
      <a className="nav-cta" href="#apply">Check your fit <Arrow /></a>
    </header>

    <section className="hero shell" id="top">
      <div className="hero-copy">
        <p className="kicker">You open the account. We operate it.</p>
        <h1>Your accounts.<br/>Our hands.<br/><strong>50 / 50.</strong></h1>
        <p className="lede">We take on the training, evaluations, and day-to-day tasks your AI training accounts require. You keep ownership and visibility; we split eligible earnings equally.</p>
        <a className="primary" href="#apply">See if we can manage yours <Arrow /></a>
      </div>
      <aside className="ledger" aria-label="Work split overview">
        <div className="ledger-head"><span>Operating agreement</span><span>Status: clear</span></div>
        <div className="ledger-row"><span>Account creation</span><strong>You</strong></div>
        <div className="ledger-row active"><span>Training &amp; tasks</span><strong>Us</strong></div>
        <div className="ledger-row"><span>Account ownership</span><strong>You</strong></div>
        <div className="ledger-split"><span>Eligible earnings</span><strong><b>50</b><i>/</i><b>50</b></strong></div>
        <p>No upfront management fee. Scope and payout terms are confirmed before we begin.</p>
      </aside>
    </section>

    <section className="proof-strip" aria-label="Trust commitments">
      <div className="shell proof-inner">
        <span>Human-managed work</span><span>Clear activity records</span><span>No ownership transfer</span><span>Stop when you choose</span>
      </div>
    </section>

    <section className="handoff shell" id="how-it-works">
      <div className="handoff-intro">
        <p className="kicker">A clean handoff</p>
        <h2>Three steps between “I have an account” and “it’s handled.”</h2>
        <p>You stay in control without spending your week inside queues, guidelines, and task dashboards.</p>
      </div>
      <ol className="process">
        <li><span>01</span><div><h3>Create your accounts</h3><p>You register with approved AI training platforms in your own name and complete any required verification.</p></div></li>
        <li><span>02</span><div><h3>Agree on secure access</h3><p>We confirm platform eligibility, working boundaries, security steps, and the 50/50 arrangement in writing.</p></div></li>
        <li><span>03</span><div><h3>Leave the task work to us</h3><p>We handle eligible training assignments and maintain a clear record so you can see what is being done.</p></div></li>
      </ol>
    </section>

    <section className="trust">
      <div className="shell trust-grid">
        <div className="trust-title"><p className="kicker">Security by boundary</p><h2>Hands-off should never mean out of the loop.</h2></div>
        <div className="trust-copy">
          <p className="big-copy">Your account stays yours. We only request the access needed to perform the agreed work, and we explain the process before you share anything.</p>
          <div className="never-list">
            <p><span>We will never</span> ask you to transfer account ownership.</p>
            <p><span>We will never</span> change payout details without your approval.</p>
            <p><span>We will never</span> hide the work completed on your account.</p>
          </div>
          <p className="fine-print">Important: participation depends on each platform’s rules. We only work with accounts and tasks that permit managed assistance, and we do not guarantee task availability or earnings.</p>
        </div>
      </div>
    </section>

    <section className="proof shell">
      <blockquote>Tens of vetted taskers. One accountable team.</blockquote>
      <div><h2>Experience across major industries.</h2><p>Our vetted taskers bring experience from a broad range of industries, giving us the depth to match each assignment with people who understand the subject matter. We coordinate the work, review quality, and keep you updated from one place.</p></div>
    </section>

    <section className="apply shell" id="apply">
      <div className="apply-copy"><p className="kicker">Put our team to work</p><h2>Tell us what you’ve opened. We’ll tell you what we can handle.</h2><p>No passwords in this form. Just enough information to assess the platform and arrange a private conversation.</p></div>
      <form onSubmit={sendLead} className="lead-form">
        <div className="field-pair"><label>First name<input name="name" required autoComplete="given-name" /></label><label>Email<input name="email" type="email" required autoComplete="email" /></label></div>
        <label>Which platform or account do you have?<input name="platform" required placeholder="e.g. an AI evaluation platform" /></label>
        <label>Anything we should know?<textarea name="message" rows={4} placeholder="Account status, task type, or questions" /></label>
        <input className="honeypot" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button className="primary" disabled={status === "sending"} type="submit">{status === "sending" ? "Sending…" : "Request a fit check"} <Arrow /></button>
        <div className="form-status" aria-live="polite">{status === "success" && <p className="success">Received. We’ll reply by email.</p>}{status === "error" && <p className="error">Couldn’t send. Please try again shortly.</p>}</div>
      </form>
    </section>

    <footer className="footer"><div className="shell footer-inner"><div><a className="wordmark light" href="#top"><span>AI</span> Taskers</a><p>Accounts managed with clear terms and human hands.</p></div><a href="mailto:hello@ai-taskers.nopt.in">hello@ai-taskers.nopt.in <Arrow /></a><small>© {new Date().getFullYear()} AI Taskers · ai-taskers.nopt.in</small></div></footer>
  </main>;
}
