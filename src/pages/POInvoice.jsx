import { useState } from "react";

const STEPS = [
  { label: "RFQ Created", state: "done" },
  { label: "Quotations Received", state: "done" },
  { label: "Compared", state: "done" },
  { label: "Approved", state: "done" },
  { label: "PO & Invoice", state: "active" },
];

const ITEMS = [
  { desc: "Dell PowerEdge R750 Server", qty: 2, unit: 185000, total: 370000 },
  { desc: "48-Port Managed Switch (Cisco)", qty: 4, unit: 22500, total: 90000 },
  { desc: "UPS 10KVA (APC)", qty: 2, unit: 48000, total: 96000 },
];

const subtotal = 556000;
const discount = 60000;
const taxable = subtotal - discount;
const gst = Math.round(taxable * 0.18);
const total = taxable + gst;

function fmt(n) {
  return "₹" + n.toLocaleString("en-IN");
}

export default function POInvoice() {
  const [emailModal, setEmailModal] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailTo, setEmailTo] = useState("accounts@techpro.in");

  function sendEmail() {
    setEmailModal(false);
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Purchase Order & Invoice</div>
          <div className="page-subtitle">PO-2026-0094 · TechPro Solutions · Auto-generated</div>
        </div>
        <div className="btns">
          <span className="badge badge-green">Approved</span>
        </div>
      </div>

      {emailSent && (
        <div style={{ background: "var(--green-bg)", border: "1px solid var(--green)", borderRadius: 10, padding: "12px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18 }}>✉️</span>
          <span style={{ fontWeight: 500, color: "var(--green)" }}>Invoice emailed to {emailTo} successfully!</span>
        </div>
      )}

      {/* Procurement steps */}
      <div className="card section-gap">
        <div className="card-body">
          <div className="steps-bar">
            {STEPS.map((s, i) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? "1" : "0" }}>
                <div className="step-item">
                  <div className={`step-circle ${s.state}`}>{s.state === "done" ? "✓" : i + 1}</div>
                  <span className={`step-label ${s.state}`}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && <div className="step-line" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="btns section-gap">
        <button className="btn btn-primary" onClick={() => window.print()}>⬇ Download PDF</button>
        <button className="btn" onClick={() => window.print()}>🖨 Print Invoice</button>
        <button className="btn" onClick={() => setEmailModal(true)}>✉ Email Invoice</button>
        <button className="btn btn-ghost">Mark as Fulfilled</button>
      </div>

      {/* Invoice document */}
      <div className="invoice-paper" id="invoice">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <div className="inv-brand">VendorBridge</div>
            <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>Procurement ERP · Divyanshi Corp Pvt Ltd</div>
            <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 8 }}>Plot 12, HITEC City, Hyderabad — 500081</div>
            <div style={{ fontSize: 12, color: "var(--text2)" }}>GST: 36ABCDE1234F1Z5</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--text3)", letterSpacing: -1 }}>INVOICE</div>
            <div style={{ marginTop: 10, fontSize: 13 }}>
              {[
                ["Invoice No", "INV-2026-0193"],
                ["PO Reference", "PO-2026-0094"],
                ["Invoice Date", "June 10, 2026"],
                ["Due Date", "July 10, 2026"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "flex-end", gap: 16, marginBottom: 3 }}>
                  <span style={{ color: "var(--text3)" }}>{k}</span>
                  <span style={{ fontWeight: 500, fontFamily: "var(--mono)", minWidth: 130, textAlign: "right" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="inv-divider" />

        {/* Bill to / Vendor */}
        <div className="grid2" style={{ marginBottom: 24 }}>
          <div>
            <div className="inv-label">Billed To</div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>Divyanshi Corp Pvt Ltd</div>
            <div className="inv-value">Plot 12, HITEC City, Hyderabad</div>
            <div className="inv-value">Telangana — 500081</div>
            <div className="inv-value">GST: 36ABCDE1234F1Z5</div>
            <div className="inv-value">procurement@divyanshicorp.in</div>
          </div>
          <div>
            <div className="inv-label">Vendor / Supplier</div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>TechPro Solutions Pvt Ltd</div>
            <div className="inv-value">Electronic City, Bengaluru</div>
            <div className="inv-value">Karnataka — 560100</div>
            <div className="inv-value">GST: 29ABCDE1234F1Z5</div>
            <div className="inv-value">vendor@techpro.in</div>
          </div>
        </div>

        {/* Items table */}
        <table className="inv-table" style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
          <thead>
            <tr>
              {["#", "Item Description", "Qty", "Unit Price", "Total"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: h === "#" || h === "Qty" ? "center" : h === "Unit Price" || h === "Total" ? "right" : "left", background: "var(--text)", color: "rgba(255,255,255,0.85)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: .5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ITEMS.map((item, i) => (
              <tr key={i}>
                <td style={{ padding: "12px 14px", textAlign: "center", borderBottom: "1px solid var(--border)", color: "var(--text3)", fontSize: 12 }}>{i + 1}</td>
                <td style={{ padding: "12px 14px", borderBottom: "1px solid var(--border)", fontWeight: 500 }}>{item.desc}</td>
                <td style={{ padding: "12px 14px", textAlign: "center", borderBottom: "1px solid var(--border)" }}>{item.qty}</td>
                <td style={{ padding: "12px 14px", textAlign: "right", borderBottom: "1px solid var(--border)", fontFamily: "var(--mono)", fontSize: 13 }}>{fmt(item.unit)}</td>
                <td style={{ padding: "12px 14px", textAlign: "right", borderBottom: "1px solid var(--border)", fontFamily: "var(--mono)", fontWeight: 600, fontSize: 13 }}>{fmt(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ minWidth: 280 }}>
            {[
              { label: "Subtotal", val: fmt(subtotal), highlight: false },
              { label: "Discount (Negotiated)", val: `− ${fmt(discount)}`, highlight: false, green: true },
              { label: "Taxable Amount", val: fmt(taxable), highlight: false },
              { label: "GST @ 18%", val: fmt(gst), highlight: false },
            ].map(r => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13, borderBottom: "1px solid var(--border)" }}>
                <span style={{ color: "var(--text2)" }}>{r.label}</span>
                <span style={{ fontFamily: "var(--mono)", color: r.green ? "var(--green)" : "var(--text)", fontWeight: r.green ? 600 : 400 }}>{r.val}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 4px", borderTop: "2px solid var(--border2)", marginTop: 4 }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Total Amount Due</span>
              <span className="total-amount">{fmt(total)}</span>
            </div>
          </div>
        </div>

        <hr className="inv-divider" />
        <div style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.7 }}>
          <strong style={{ color: "var(--text2)" }}>Terms & Conditions:</strong> Payment due within 30 days of invoice date.
          Goods remain the property of TechPro Solutions until full payment is received.
          All disputes subject to Hyderabad jurisdiction. Generated via VendorBridge ERP.
        </div>
      </div>

      {/* Email modal */}
      {emailModal && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setEmailModal(false)}>
          <div className="modal">
            <div className="modal-title">Send Invoice via Email</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">To</label>
                <input className="form-input" value={emailTo} onChange={e => setEmailTo(e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">CC</label>
                <input className="form-input" placeholder="Optional" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input className="form-input" defaultValue="Invoice INV-2026-0193 — PO-2026-0094 | Divyanshi Corp" />
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Message</label>
              <textarea className="form-textarea" defaultValue={`Dear TechPro Solutions,\n\nPlease find attached Invoice INV-2026-0193 for PO-2026-0094 amounting to ₹${total.toLocaleString("en-IN")}.\n\nKindly arrange payment within 30 days.\n\nRegards,\nDivyanshi Corp — Procurement Team`} />
            </div>
            <div className="modal-footer">
              <button className="btn" onClick={() => setEmailModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={sendEmail}>Send Invoice</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
