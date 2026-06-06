const ROLE_COLORS = {
  officer: "badge-blue",
  vendor: "badge-green",
  manager: "badge-purple",
  admin: "badge-amber",
};

const ROLE_LABELS = {
  officer: "Procurement Officer",
  vendor: "Vendor",
  manager: "Manager",
  admin: "Admin",
};

export default function Topbar({ title, role }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="topbar-title">{title}</div>
      </div>
      <div className="topbar-right">
        <span className="topbar-org text-muted">{dateStr}</span>
        <span className={`badge ${ROLE_COLORS[role]}`}>{ROLE_LABELS[role]}</span>
        <div className="avatar">DC</div>
      </div>
    </div>
  );
}
