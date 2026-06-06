export default function Dashboard({ setPage }) {
  const stats = [
    { icon: "📋", iconBg: "#EDE9FE", val: "12", label: "Active RFQs", delta: "+3 this week", up: true },
    { icon: "⏳", iconBg: "#FFFBEB", val: "4", label: "Pending Approvals", delta: "Needs action", up: false, warn: true },
    { icon: "📦", iconBg: "#ECFDF5", val: "₹8.4L", label: "POs This Month", delta: "+12% vs last month", up: true },
    { icon: "🏢", iconBg: "#EFF6FF", val: "18", label: "Active Vendors", delta: "2 under review", up: true },
  ];

  const recentRFQs = [
    { id: "RFQ-2026-047", title: "Server Hardware Procurement", vendors: 4, status: "Comparing", statusClass: "badge-amber", deadline: "Jun 12" },
    { id: "RFQ-2026-046", title: "Office Supplies Q2", vendors: 3, status: "Active", statusClass: "badge-blue", deadline: "Jun 15" },
    { id: "RFQ-2026-044", title: "Annual Cloud Licenses", vendors: 2, status: "PO Generated", statusClass: "badge-green", deadline: "Jun 8" },
    { id: "RFQ-2026-041", title: "Furniture Lot B", vendors: 4, status: "Draft", statusClass: "badge-gray", deadline: "Jun 20" },
  ];

  const recentPOs = [
    { id: "PO-2026-094", vendor: "TechPro Solutions", amount: "₹5,85,280", status: "Approved", statusClass: "badge-green" },
    { id: "PO-2026-091", vendor: "CloudNest Pvt Ltd", amount: "₹2,14,000", status: "Pending", statusClass: "badge-amber" },
    { id: "PO-2026-088", vendor: "PrintMart Office", amount: "₹68,400", status: "Fulfilled", statusClass: "badge-blue" },
  ];

  const months = ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const vals = [42, 55, 68, 50, 82, 70, 84];
  const max = Math.max(...vals);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Good Day! Hope you are doing fine 👋</div>
          <div className="page-subtitle">Here's what's happening with your procurement today.</div>
        </div>
        <div className="btns">
          <button className="btn btn-primary" onClick={() => setPage("rfq")}>+ New RFQ</button>
          <button className="btn" onClick={() => setPage("approvals")}>Review Approvals <span className="badge badge-red" style={{marginLeft:4,padding:"1px 6px",fontSize:10}}>4</span></button>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-icon" style={{ background: s.iconBg }}>{s.icon}</div>
            <div className="stat-val">{s.val}</div>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-delta ${s.warn ? "delta-warn" : "delta-up"}`}>
              {s.up && !s.warn ? "↑ " : s.warn ? "⚠ " : ""}{s.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="grid2 section-gap">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Recent RFQs</div>
              <div className="card-subtitle">Last 30 days</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setPage("rfq")}>View all →</button>
          </div>
          <div className="card-body" style={{ padding: "12px 0 0" }}>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>RFQ ID</th><th>Title</th><th>Vendors</th><th>Status</th><th>Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRFQs.map((r) => (
                    <tr key={r.id} style={{ cursor: "pointer" }} onClick={() => setPage("rfq")}>
                      <td className="td-mono">{r.id}</td>
                      <td className="td-main">{r.title}</td>
                      <td>{r.vendors}</td>
                      <td><span className={`badge ${r.statusClass}`}>{r.status}</span></td>
                      <td className="text-muted text-sm">{r.deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Spending Trend</div>
              <div className="card-subtitle">Monthly (₹ Lakhs)</div>
            </div>
          </div>
          <div className="card-body">
            <div className="bar-chart" style={{ marginBottom: 8 }}>
              {vals.map((v, i) => (
                <div className="bar-col-wrap" key={i}>
                  <div className="bar-col" style={{ height: `${(v / max) * 100}%` }} />
                </div>
              ))}
            </div>
            <div className="bar-chart" style={{ height: "auto", marginBottom: 16 }}>
              {months.map((m) => (
                <div key={m} className="bar-lbl" style={{ flex: 1, textAlign: "center" }}>{m}</div>
              ))}
            </div>
            <hr className="divider" />
            <div className="grid2" style={{ gap: 10 }}>
              <div style={{ background: "var(--green-bg)", borderRadius: 8, padding: "10px 14px" }}>
                <div style={{ fontSize: 11, color: "var(--green)", fontWeight: 600 }}>YTD SPEND</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginTop: 2 }}>₹42.6L</div>
              </div>
              <div style={{ background: "var(--brand-light)", borderRadius: 8, padding: "10px 14px" }}>
                <div style={{ fontSize: 11, color: "var(--brand)", fontWeight: 600 }}>AVG PO VALUE</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginTop: 2 }}>₹1.25L</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Recent Purchase Orders</div>
            <button className="btn btn-ghost btn-sm" onClick={() => setPage("po")}>View all →</button>
          </div>
          <div className="card-body" style={{ padding: "12px 0 0" }}>
            <table>
              <thead><tr><th>PO ID</th><th>Vendor</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>
                {recentPOs.map((p) => (
                  <tr key={p.id} style={{ cursor: "pointer" }} onClick={() => setPage("po")}>
                    <td className="td-mono">{p.id}</td>
                    <td className="td-main">{p.vendor}</td>
                    <td style={{ fontWeight: 600 }}>{p.amount}</td>
                    <td><span className={`badge ${p.statusClass}`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">Procurement Health</div></div>
          <div className="card-body">
            {[
              { label: "Vendor On-time Delivery", val: 97, color: "var(--green)" },
              { label: "RFQ Turnaround Rate", val: 84, color: "var(--brand)" },
              { label: "Invoice Accuracy", val: 99, color: "var(--green)" },
              { label: "PO Cycle Time Efficiency", val: 72, color: "var(--amber)" },
            ].map((m) => (
              <div key={m.label} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                  <span style={{ color: "var(--text2)" }}>{m.label}</span>
                  <span style={{ fontWeight: 600, color: m.color }}>{m.val}%</span>
                </div>
                <div style={{ height: 6, background: "var(--surface2)", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${m.val}%`, background: m.color, borderRadius: 10, transition: "width 1s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
