const ROLE_LABELS = {
  officer: "Procurement Officer",
  vendor: "Vendor",
  manager: "Manager / Approver",
  admin: "Admin",
};

export default function Sidebar({ pages, active, setPage, role, setRole }) {
  const navGroups = [
    { label: "Overview", keys: ["dashboard"] },
    { label: "Procurement", keys: ["vendors", "rfq", "quotations", "compare"] },
    { label: "Workflow", keys: ["approvals", "po"] },
    { label: "Analytics", keys: ["logs", "reports"] },
  ];

  const badges = { approvals: 4, rfq: 12 };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-name">VendorBridge</div>
        <div className="sidebar-logo-tag">Procurement ERP</div>
      </div>

      <div className="sidebar-section">
        {navGroups.map((group) => (
          <div key={group.label} style={{ marginBottom: 4 }}>
            <div className="sidebar-section-label">{group.label}</div>
            {group.keys.map((key) => (
              <div
                key={key}
                className={`nav-item ${active === key ? "active" : ""}`}
                onClick={() => setPage(key)}
              >
                <span className="nav-icon">{pages[key].icon}</span>
                {pages[key].label}
                {badges[key] && (
                  <span className="nav-badge">{badges[key]}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="sidebar-bottom">
        <div className="role-label-text">Viewing as</div>
        <select
          className="role-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          {Object.entries(ROLE_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
