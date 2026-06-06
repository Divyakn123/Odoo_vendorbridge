import { useState } from "react";

export default function Approvals({ setPage }) {
  const [status, setStatus] = useState("pending"); // pending | approved | rejected
  const [remark, setRemark] = useState("");

  function approve() {
    setStatus("approved");
    setTimeout(() => setPage("po"), 2000);
  }

  function reject() {
    setStatus("rejected");
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Approval Workflow</div>
          <div className="page-subtitle">Review and act on pending procurement approvals</div>
        </div>
        <div className="btns">
          <span className="badge badge-amber">4 Pending</span>
        </div>
      </div>

      {status === "approved" && (
        <div style={{ background: "var(--green-bg)", border: "1px solid var(--green)", borderRadius: 10, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24 }}>✅</span>
          <div>
            <div style={{ fontWeight: 600, color: "var(--green)", fontSize: 15 }}>Approved! PO Generated.</div>
            <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>PO-2026-0094 has been created for TechPro Solutions. Redirecting to PO & Invoice...</div>
          </div>
        </div>
      )}

      {status === "rejected" && (
        <div style={{ background: "var(--red-bg)", border: "1px solid var(--red)", borderRadius: 10, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24 }}>❌</span>
          <div>
            <div style={{ fontWeight: 600, color: "var(--red)", fontSize: 15 }}>Quotation Rejected</div>
            <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>Procurement Officer notified to re-evaluate or re-quote.</div>
          </div>
        </div>
      )}

      {/* Main approval card */}
      {status === "pending" && (
        <div className="card section-gap">
          <div className="card-header">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className="card-title" style={{ fontSize: 15 }}>RFQ-2026-047 — TechPro Solutions Selected</div>
                <span className="badge badge-amber">Awaiting Approval</span>
              </div>
              <div className="card-subtitle" style={{ marginTop: 4 }}>Submitted by Procurement Officer · Jun 10, 2026 · ₹4,96,000</div>
            </div>
          </div>
          <div className="card-body">
            {/* Approval pipeline */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
              {[
                { label: "Officer", sublabel: "Initiated", state: "done", icon: "✓" },
                { label: "Manager", sublabel: "Pending", state: "active", icon: "?" },
                { label: "Finance", sublabel: "Waiting", state: "pending", icon: "3" },
                { label: "Director", sublabel: "Waiting", state: "pending", icon: "4" },
              ].map((step, i, arr) => (
                <div key={step.label} style={{ display: "flex", alignItems: "center", flex: i < arr.length - 1 ? "1" : "0" }}>
                  <div style={{ textAlign: "center", minWidth: 70 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%", margin: "0 auto 6px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: step.state === "done" ? 16 : 14, fontWeight: 600,
                      background: step.state === "done" ? "var(--green)" : step.state === "active" ? "var(--brand)" : "var(--surface2)",
                      border: step.state === "pending" ? "2px solid var(--border2)" : "none",
                      color: step.state === "pending" ? "var(--text3)" : "#fff",
                    }}>{step.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: step.state === "active" ? "var(--brand)" : "var(--text2)" }}>{step.label}</div>
                    <div style={{ fontSize: 10, color: "var(--text3)" }}>{step.sublabel}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ flex: 1, height: 2, background: step.state === "done" ? "var(--green)" : "var(--border2)", margin: "0 4px", marginBottom: 22 }} />
                  )}
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="grid2" style={{ gap: 14, marginBottom: 20 }}>
              <div style={{ background: "var(--surface2)", borderRadius: 8, padding: "14px 16px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: .6, color: "var(--text3)", marginBottom: 10 }}>Procurement Summary</div>
                {[
                  ["RFQ ID", "RFQ-2026-047"],
                  ["Selected Vendor", "TechPro Solutions"],
                  ["Quoted Amount", "₹4,96,000"],
                  ["GST (18%)", "₹89,280"],
                  ["Total Payable", "₹5,85,280"],
                  ["Delivery", "14 days"],
                  ["Warranty", "3 years"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ color: "var(--text2)" }}>{k}</span>
                    <span style={{ fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "var(--surface2)", borderRadius: 8, padding: "14px 16px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: .6, color: "var(--text3)", marginBottom: 10 }}>Why TechPro?</div>
                {[
                  ["💰 Price", "Lowest quote — ₹36K cheaper than avg"],
                  ["🚚 Delivery", "Fastest — 14 days vs avg 18 days"],
                  ["⭐ Rating", "5/5 — Highest vendor rating"],
                  ["🛡 Warranty", "3 years — Best coverage"],
                  ["📋 History", "12 POs, 100% on-time delivery"],
                ].map(([icon, text]) => (
                  <div key={icon} style={{ display: "flex", gap: 8, fontSize: 13, padding: "5px 0", borderBottom: "1px solid var(--border)" }}>
                    <span>{icon}</span>
                    <span style={{ color: "var(--text2)" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Remark + actions */}
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label">Approval Remarks (optional)</label>
              <textarea className="form-textarea" rows={2} placeholder="Add remarks before approving or rejecting..." value={remark} onChange={e => setRemark(e.target.value)} />
            </div>
            <div className="btns">
              <button className="btn btn-success" onClick={approve}>✓ Approve & Generate PO</button>
              <button className="btn btn-danger" onClick={reject}>✗ Reject</button>
              <button className="btn">Request Revision</button>
              <button className="btn btn-ghost">Download Comparison Report</button>
            </div>
          </div>
        </div>
      )}

      {/* Other pending items */}
      <div className="card">
        <div className="card-header"><div className="card-title">Other Pending Approvals</div></div>
        <div className="card-body" style={{ padding: "12px 0 0" }}>
          <table>
            <thead><tr><th>RFQ ID</th><th>Title</th><th>Vendor</th><th>Amount</th><th>Submitted</th><th>Priority</th><th></th></tr></thead>
            <tbody>
              {[
                { id: "RFQ-2026-046", title: "Office Supplies Q2", vendor: "PrintMart Office", amt: "₹68,400", date: "Jun 9", priority: "Normal" },
                { id: "RFQ-2026-041", title: "Furniture Lot B", vendor: "FurnEx Commercial", amt: "₹2,14,000", date: "Jun 8", priority: "High" },
                { id: "RFQ-2026-039", title: "Network Infrastructure", vendor: "TechPro Solutions", amt: "₹3,40,000", date: "Jun 7", priority: "High" },
              ].map(r => (
                <tr key={r.id}>
                  <td className="td-mono">{r.id}</td>
                  <td className="td-main">{r.title}</td>
                  <td className="text-muted">{r.vendor}</td>
                  <td style={{ fontWeight: 600 }}>{r.amt}</td>
                  <td className="text-sm text-muted">{r.date}</td>
                  <td><span className={`badge ${r.priority === "High" ? "badge-red" : "badge-gray"}`}>{r.priority}</span></td>
                  <td><button className="btn btn-xs">Review</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
