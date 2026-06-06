const VENDORS_PERF = [
  { name: "TechPro Solutions", pos: 12, spend: "₹18.4L", ontime: 100, rating: 5 },
  { name: "CloudNest Pvt Ltd", pos: 8, spend: "₹10.2L", ontime: 97, rating: 4 },
  { name: "FurnEx Commercial", pos: 9, spend: "₹8.6L", ontime: 94, rating: 4 },
  { name: "SwiftLog India", pos: 6, spend: "₹5.4L", ontime: 91, rating: 4 },
  { name: "PrintMart Office", pos: 5, spend: "₹3.8L", ontime: 80, rating: 3 },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const SPENDS = [42, 51, 68, 74, 92, 84];
const MAX = Math.max(...SPENDS);

export default function Reports() {
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Reports & Analytics</div>
          <div className="page-subtitle">Procurement insights and performance metrics · FY 2026</div>
        </div>
        <div className="btns">
          <button className="btn">Export CSV</button>
          <button className="btn btn-primary">Export PDF Report</button>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: 22 }}>
        {[
          { val: "₹42.6L", label: "Total Spend YTD", delta: "↑ 18% vs last year", color: "var(--green-bg)", icon: "💰" },
          { val: "34", label: "Purchase Orders", delta: "↑ 12 vs last year", color: "var(--brand-light)", icon: "📦" },
          { val: "₹1.25L", label: "Avg PO Value", delta: "Stable", color: "var(--blue-bg)", icon: "📊" },
          { val: "6.2 days", label: "Avg Approval Time", delta: "↓ 2 days improved", color: "var(--green-bg)", icon: "⚡" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.color }}>{s.icon}</div>
            <div className="stat-val">{s.val}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-delta delta-up">{s.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid2 section-gap">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Monthly Procurement Spend</div>
            <div className="card-subtitle">₹ Lakhs · 2026</div>
          </div>
          <div className="card-body">
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 120, marginBottom: 8 }}>
              {SPENDS.map((v, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 10, color: "var(--text3)" }}>₹{v}L</span>
                  <div style={{
                    width: "100%", borderRadius: "4px 4px 0 0",
                    background: i === SPENDS.length - 1 ? "var(--brand)" : "var(--brand-light)",
                    height: `${(v / MAX) * 100}%`,
                    border: i === SPENDS.length - 1 ? "none" : "1px solid var(--brand-mid)",
                    transition: "height .4s ease",
                  }} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {MONTHS.map(m => (
                <div key={m} style={{ flex: 1, textAlign: "center", fontSize: 11, color: "var(--text3)" }}>{m}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">Spend by Category</div></div>
          <div className="card-body">
            {[
              { label: "IT Hardware", pct: 43, val: "₹18.4L", color: "var(--brand)" },
              { label: "Cloud Services", pct: 24, val: "₹10.2L", color: "var(--blue)" },
              { label: "Furniture", pct: 20, val: "₹8.6L", color: "var(--amber)" },
              { label: "Office Supplies", pct: 9, val: "₹3.8L", color: "var(--green)" },
              { label: "Logistics", pct: 4, val: "₹1.6L", color: "var(--text3)" },
            ].map(c => (
              <div key={c.label} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                  <span style={{ color: "var(--text2)" }}>{c.label}</span>
                  <span style={{ fontWeight: 600 }}>{c.val} <span style={{ color: "var(--text3)", fontWeight: 400 }}>({c.pct}%)</span></span>
                </div>
                <div style={{ height: 7, background: "var(--surface2)", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${c.pct}%`, background: c.color, borderRadius: 10 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Vendor Performance Scorecard</div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Vendor</th><th>Total POs</th><th>Total Spend</th><th>On-time %</th><th>Rating</th><th>Performance</th></tr>
            </thead>
            <tbody>
              {VENDORS_PERF.map(v => (
                <tr key={v.name}>
                  <td className="td-main">{v.name}</td>
                  <td>{v.pos}</td>
                  <td style={{ fontWeight: 600 }}>{v.spend}</td>
                  <td>
                    <span style={{ color: v.ontime >= 95 ? "var(--green)" : v.ontime >= 85 ? "var(--amber)" : "var(--red)", fontWeight: 600 }}>
                      {v.ontime}%
                    </span>
                  </td>
                  <td><span className="stars">{"★".repeat(v.rating)}{"☆".repeat(5 - v.rating)}</span></td>
                  <td style={{ minWidth: 120 }}>
                    <div style={{ height: 6, background: "var(--surface2)", borderRadius: 10, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${v.ontime}%`, background: v.ontime >= 95 ? "var(--green)" : v.ontime >= 85 ? "var(--amber)" : "var(--red)", borderRadius: 10 }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
