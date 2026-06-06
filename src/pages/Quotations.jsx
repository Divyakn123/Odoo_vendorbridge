import { useState } from "react";

const ITEMS = [
  { name: "Dell PowerEdge R750 Server", qty: 2, unit: "₹1,85,000", total: "₹3,70,000" },
  { name: "48-Port Managed Switch (Cisco)", qty: 4, unit: "₹22,500", total: "₹90,000" },
  { name: "UPS 10KVA (APC)", qty: 2, unit: "₹48,000", total: "₹96,000" },
];

export default function Quotations() {
  const [prices, setPrices] = useState(["1,85,000", "22,500", "48,000"]);
  const [days, setDays] = useState(["14", "7", "10"]);
  const [notes, setNotes] = useState("Prices valid for 30 days. Installation included for servers. GST @ 18% applicable.");
  const [submitted, setSubmitted] = useState(false);

  function submit() {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Quotation Submission</div>
          <div className="page-subtitle">Respond to active RFQs from procurement team</div>
        </div>
      </div>

      {submitted && (
        <div style={{ background: "var(--green-bg)", border: "1px solid var(--green)", borderRadius: 10, padding: "14px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>✅</span>
          <div>
            <div style={{ fontWeight: 600, color: "var(--green)" }}>Quotation submitted successfully!</div>
            <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>Your quotation for RFQ-2026-047 has been sent to the procurement team for review.</div>
          </div>
        </div>
      )}

      <div className="card section-gap">
        <div className="card-header">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="card-title" style={{ fontSize: 15 }}>RFQ-2026-047 — Server Hardware Procurement</div>
              <span className="badge badge-blue">Open for Quotes</span>
            </div>
            <div className="card-subtitle" style={{ marginTop: 4 }}>Deadline: Jun 12, 2026 · Issued by Divyanshi Corp · 3 line items</div>
          </div>
        </div>
        <div className="card-body">
          <div style={{ background: "var(--surface2)", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "var(--text2)", borderLeft: "3px solid var(--brand)" }}>
            <strong style={{ color: "var(--text)" }}>Scope:</strong> Procurement of server infrastructure components for new data centre. All items to be brand new, ISI/CE certified. Delivery to HITEC City, Hyderabad.
          </div>

          <table style={{ marginBottom: 20 }}>
            <thead>
              <tr><th>#</th><th>Item Description</th><th>Required Qty</th><th>Your Unit Price (₹)</th><th>Delivery (days)</th></tr>
            </thead>
            <tbody>
              {ITEMS.map((item, i) => (
                <tr key={i}>
                  <td style={{ color: "var(--text3)", width: 30 }}>{i + 1}</td>
                  <td className="td-main">{item.name}</td>
                  <td>{item.qty}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ color: "var(--text3)", fontSize: 13 }}>₹</span>
                      <input
                        className="form-input"
                        style={{ width: 120 }}
                        value={prices[i]}
                        onChange={e => { const p = [...prices]; p[i] = e.target.value; setPrices(p); }}
                      />
                    </div>
                  </td>
                  <td>
                    <input
                      className="form-input"
                      style={{ width: 80 }}
                      value={days[i]}
                      onChange={e => { const d = [...days]; d[i] = e.target.value; setDays(d); }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="form-group" style={{ marginBottom: 20 }}>
            <label className="form-label">Additional Notes / Terms</label>
            <textarea className="form-textarea" value={notes} onChange={e => setNotes(e.target.value)} />
          </div>

          <div className="btns">
            <button className="btn btn-primary" onClick={submit}>Submit Quotation</button>
            <button className="btn">Save as Draft</button>
            <button className="btn btn-ghost">Download RFQ PDF</button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><div className="card-title">My Past Quotations</div></div>
        <div className="card-body" style={{ padding: "12px 0 0" }}>
          <table>
            <thead><tr><th>RFQ ID</th><th>Title</th><th>Quoted Amount</th><th>Submitted</th><th>Result</th></tr></thead>
            <tbody>
              <tr>
                <td className="td-mono">RFQ-2026-044</td>
                <td className="td-main">Annual Cloud Licenses</td>
                <td style={{ fontWeight: 600 }}>₹2,14,000</td>
                <td className="text-muted text-sm">Jun 5, 2026</td>
                <td><span className="badge badge-green">Selected ✓</span></td>
              </tr>
              <tr>
                <td className="td-mono">RFQ-2026-038</td>
                <td className="td-main">Network Equipment Q1</td>
                <td style={{ fontWeight: 600 }}>₹3,40,000</td>
                <td className="text-muted text-sm">May 12, 2026</td>
                <td><span className="badge badge-red">Not Selected</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
