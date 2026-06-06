import { useState } from "react";

const QUOTES = [
  { vendor: "TechPro Solutions", total: "₹4,96,000", raw: 496000, delivery: 14, rating: 5, warranty: "3 years", gst: "Inclusive", paymentTerms: "Net 30", support: "24/7", recommended: true },
  { vendor: "CloudNest Pvt Ltd", total: "₹5,32,000", raw: 532000, delivery: 18, rating: 4, warranty: "2 years", gst: "Inclusive", paymentTerms: "Net 45", support: "Business hours", recommended: false },
  { vendor: "DataVault Systems", total: "₹5,18,000", raw: 518000, delivery: 16, rating: 5, warranty: "2 years", gst: "Inclusive", paymentTerms: "Net 30", support: "8x5", recommended: false },
  { vendor: "PrintMart Office", total: "₹5,61,000", raw: 561000, delivery: 21, rating: 3, warranty: "1 year", gst: "Exclusive", paymentTerms: "Advance", support: "Email only", recommended: false },
];

const ROWS = [
  { key: "total", label: "Total Quote (₹)", type: "price" },
  { key: "delivery", label: "Delivery (days)", type: "days" },
  { key: "warranty", label: "Warranty", type: "text" },
  { key: "gst", label: "GST", type: "text" },
  { key: "paymentTerms", label: "Payment Terms", type: "text" },
  { key: "support", label: "Support", type: "text" },
  { key: "rating", label: "Vendor Rating", type: "rating" },
];

export default function Compare({ setPage }) {
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState("");

  const minPrice = Math.min(...QUOTES.map(q => q.raw));
  const minDelivery = Math.min(...QUOTES.map(q => q.delivery));

  function selectVendor(vendor) {
    setSelected(vendor);
    setToast(`${vendor} selected! Approval workflow initiated.`);
    setTimeout(() => { setToast(""); setPage("approvals"); }, 2000);
  }

  return (
    <div>
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, background: "var(--brand)", color: "#fff", padding: "12px 20px", borderRadius: 8, zIndex: 999, fontWeight: 500, fontSize: 13 }}>
          ✓ {toast}
        </div>
      )}
      <div className="page-header">
        <div>
          <div className="page-title">Quotation Comparison</div>
          <div className="page-subtitle">RFQ-2026-047 — Server Hardware Procurement · 4 quotations received</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        {QUOTES.map((q) => (
          <div key={q.vendor} style={{
            background: q.recommended ? "var(--brand-light)" : "var(--surface)",
            border: `1px solid ${q.recommended ? "var(--brand-mid)" : "var(--border)"}`,
            borderRadius: 10, padding: 16, cursor: "pointer",
            boxShadow: q.recommended ? "0 0 0 2px var(--brand)" : "var(--shadow-sm)",
            transition: "box-shadow .15s"
          }}>
            {q.recommended && (
              <div style={{ background: "var(--brand)", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10, display: "inline-block", marginBottom: 8, letterSpacing: .5 }}>⭐ RECOMMENDED</div>
            )}
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{q.vendor}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: q.raw === minPrice ? "var(--green)" : "var(--text)", letterSpacing: -0.5 }}>{q.total}</div>
            {q.raw === minPrice && <div style={{ fontSize: 11, color: "var(--green)", marginTop: 2 }}>Lowest quote ↓</div>}
            <div style={{ marginTop: 8 }}>
              <span className="stars">{"★".repeat(q.rating)}{"☆".repeat(5 - q.rating)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card section-gap">
        <div className="card-header"><div className="card-title">Detailed Comparison</div></div>
        <div className="card-body" style={{ padding: "0" }}>
          <div className="compare-wrap">
            <table className="compare-tbl">
              <thead>
                <tr>
                  <th style={{ width: 140 }}>Criteria</th>
                  {QUOTES.map((q) => (
                    <th key={q.vendor} className={q.recommended ? "winner-col" : ""} style={{ position: "relative" }}>
                      {q.recommended && <span className="winner-banner">⭐ BEST PICK</span>}
                      {q.vendor}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.key}>
                    <td>{row.label}</td>
                    {QUOTES.map((q) => {
                      const val = q[row.key];
                      let isBest = false;
                      if (row.type === "price") isBest = q.raw === minPrice;
                      if (row.type === "days") isBest = q.delivery === minDelivery;
                      return (
                        <td key={q.vendor} className={q.recommended ? "winner-col" : ""}>
                          {row.type === "rating" ? (
                            <span className="stars">{"★".repeat(val)}{"☆".repeat(5 - val)}</span>
                          ) : (
                            <span className={isBest ? "best-val" : ""}>{row.type === "days" ? `${val} days` : val}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <td style={{ borderBottom: "none" }}></td>
                  {QUOTES.map((q) => (
                    <td key={q.vendor} className={q.recommended ? "winner-col" : ""} style={{ borderBottom: "none" }}>
                      <button
                        className={`btn btn-sm ${selected === q.vendor ? "btn-success" : q.recommended ? "btn-primary" : ""}`}
                        onClick={() => selectVendor(q.vendor)}
                      >
                        {selected === q.vendor ? "✓ Selected" : q.recommended ? "Select & Proceed ↗" : "Select"}
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
