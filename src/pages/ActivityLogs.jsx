const LOGS = [
  { icon: "📄", color: "#7C3AED", title: "Invoice INV-2026-0193 generated", desc: "Auto-generated from PO-2026-0094 · ₹5,85,280", time: "Today, 11:42 AM", user: "System", tag: "Invoice" },
  { icon: "✅", color: "#059669", title: "RFQ-2026-047 approved by Manager", desc: "TechPro Solutions selected · PO-2026-0094 created", time: "Today, 10:15 AM", user: "Priya Sharma", tag: "Approval" },
  { icon: "⚖️", color: "#2563EB", title: "Quotation comparison completed", desc: "4 vendors compared for RFQ-2026-047 · TechPro recommended", time: "Today, 9:30 AM", user: "Divyanshi (Officer)", tag: "Compare" },
  { icon: "💬", color: "#D97706", title: "4 quotations received for RFQ-2026-047", desc: "TechPro, CloudNest, DataVault, PrintMart submitted quotes", time: "Jun 9, 4:30 PM", user: "System", tag: "Quotation" },
  { icon: "📋", color: "#7C3AED", title: "RFQ-2026-047 created and sent", desc: "Server Hardware Procurement · 4 vendors notified", time: "Jun 8, 9:00 AM", user: "Divyanshi (Officer)", tag: "RFQ" },
  { icon: "📦", color: "#059669", title: "PO-2026-0091 fulfilled", desc: "CloudNest Pvt Ltd · Annual Cloud Licenses · ₹2,14,000", time: "Jun 7, 3:00 PM", user: "System", tag: "PO" },
  { icon: "🏢", color: "#059669", title: "Vendor DataVault Systems verified", desc: "GST verified · Status set to Active", time: "Jun 5, 2:10 PM", user: "Admin", tag: "Vendor" },
  { icon: "❌", color: "#DC2626", title: "RFQ-2026-038 quotation rejected", desc: "PrintMart Office · Network Equipment Q1 · Price too high", time: "May 30, 11:00 AM", user: "Priya Sharma", tag: "Approval" },
  { icon: "🏢", color: "#7C3AED", title: "Vendor SwiftLog India registered", desc: "Category: Logistics · GST verified", time: "May 28, 9:45 AM", user: "Admin", tag: "Vendor" },
];

const TAG_COLORS = {
  Invoice: "badge-purple",
  Approval: "badge-green",
  Compare: "badge-blue",
  Quotation: "badge-amber",
  RFQ: "badge-purple",
  PO: "badge-green",
  Vendor: "badge-blue",
};

export default function ActivityLogs() {
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Activity Logs</div>
          <div className="page-subtitle">Complete audit trail of all procurement activities</div>
        </div>
        <button className="btn">Export Logs</button>
      </div>

      <div className="grid2" style={{ marginBottom: 20 }}>
        {[
          { label: "Total Events", val: "247", sub: "This month" },
          { label: "Approvals", val: "18", sub: "Processed" },
          { label: "RFQs Created", val: "12", sub: "This month" },
          { label: "POs Generated", val: "9", sub: "This month" },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{ padding: "14px 18px" }}>
            <div className="stat-val" style={{ fontSize: 20 }}>{s.val}</div>
            <div className="stat-label">{s.label}</div>
            <div className="text-sm" style={{ color: "var(--text3)", marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header" style={{ paddingBottom: 16 }}>
          <div className="card-title">Procurement Timeline</div>
          <div className="btns">
            {["All", "RFQ", "Quotation", "Approval", "PO", "Invoice"].map(f => (
              <button key={f} className="btn btn-xs btn-ghost">{f}</button>
            ))}
          </div>
        </div>
        <div className="card-body">
          <ul className="timeline">
            {LOGS.map((log, i) => (
              <li key={i} className="tl-item">
                <div className="tl-dot" style={{ background: log.color }}>{log.icon}</div>
                <div className="tl-body">
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <div className="tl-title">{log.title}</div>
                    <span className={`badge ${TAG_COLORS[log.tag] || "badge-gray"}`}>{log.tag}</span>
                  </div>
                  <div className="tl-desc">{log.desc}</div>
                  <div className="tl-time">{log.time} · {log.user}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
