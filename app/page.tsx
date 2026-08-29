"use client";

import { FormEvent, useState } from "react";

const Arrow = () => <span aria-hidden="true">↗</span>;

const platforms = [
  { name: "Mercor", rate: "$50–$150+/hr", note: "Common expert listings", href: "https://work.mercor.com/login", source: "https://www.mercor.com/experts/business-operations/", fit: "Professional and domain experts" },
  { name: "Handshake AI", rate: "$30–$125/hr", note: "Published fellowship range", href: "https://app.joinhandshake.com/login", source: "https://support.joinhandshake.com/hc/en-us/articles/32264709473303-Handshake-AI-Fellowship-Overview-FAQs-for-EDU-Partners", fit: "Students, graduates and researchers" },
  { name: "micro1", rate: "$20–$50/hr", note: "Current trade-task listings", href: "https://jobs.micro1.ai/", source: "https://www.micro1.ai/get-paid-to-record-tasks", fit: "Skilled trades and specialist roles" },
  { name: "Alignerr", rate: "$80/hr", note: "Published average pay", href: "https://app.alignerr.com/", source: "https://www.alignerr.com/", fit: "Generalists and subject experts" },
  { name: "Outlier", rate: "Up to $150/hr", note: "Top specialist listings", href: "https://app.outlier.ai/en/expert/signup", source: "https://outlier.ai/experts/electrical-engineering", fit: "Writers, coders and domain experts" },
  { name: "DataAnnotation", rate: "$20–$100+/hr", note: "By role and specialty", href: "https://app.dataannotation.tech/worker_signup", source: "https://www.dataannotation.tech/", fit: "Generalists, coders and specialists" },
];

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
      <a className="wordmark" href="#top" aria-label="AI Taskers home"><img src="/ai-taskers-mark.png" alt="" width="40" height="40" />AI Taskers</a>
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

    <section className="platforms" id="platforms">
      <div className="shell platforms-head">
        <div><p className="kicker">Choose where to begin</p><h2>Open the account. Then hand us the workload.</h2></div>
        <p>These platforms recruit people to evaluate, improve, and train AI systems. Open an account in your own name, complete the platform’s checks, and talk to us once you are approved.</p>
      </div>
      <div className="shell platform-grid">
        {platforms.map((platform, index) => <article className="platform-card" key={platform.name}>
          <div className="platform-index">{String(index + 1).padStart(2, "0")}</div>
          <div className="platform-main"><h3>{platform.name}</h3><p>{platform.fit}</p></div>
          <div className="platform-rate"><span>{platform.note}</span><strong>{platform.rate}</strong></div>
          <div className="platform-actions"><a className="platform-apply" href={platform.href} target="_blank" rel="noreferrer">Open an account <Arrow /></a><a className="rate-source" href={platform.source} target="_blank" rel="noreferrer">Rate source</a></div>
        </article>)}
      </div>
      <p className="shell rate-disclaimer">Rates shown are current advertised figures, not guaranteed earnings or platform-wide averages unless stated. Actual rates, eligibility, location access, and task availability vary by role and can change. Always confirm the offer shown in your own account.</p>
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
          <p className="fine-print">Important: participation depends on each platform’s rules. We do not guarantee task availability or earnings.</p>
        </div>
      </div>
    </section>

    <section className="proof shell">
      <blockquote>Dozens of vetted taskers. One accountable team.</blockquote>
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

    <footer className="footer"><div className="shell footer-inner"><div><a className="wordmark light" href="#top"><img src="/ai-taskers-mark.png" alt="" width="40" height="40" />AI Taskers</a><p>Accounts managed with clear terms and human hands.</p></div><small>© {new Date().getFullYear()} ai-taskers.nopt.in</small></div></footer>
  </main>;
}
