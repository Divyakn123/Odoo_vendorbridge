import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Vendors from "./pages/Vendors";
import RFQ from "./pages/RFQ";
import Quotations from "./pages/Quotations";
import Compare from "./pages/Compare";
import Approvals from "./pages/Approvals";
import POInvoice from "./pages/POInvoice";
import ActivityLogs from "./pages/ActivityLogs";
import Reports from "./pages/Reports";
import "./styles.css";

const PAGES = {
  dashboard: { label: "Dashboard", icon: "⬡" },
  vendors: { label: "Vendors", icon: "🏢" },
  rfq: { label: "RFQ", icon: "📋" },
  quotations: { label: "Quotations", icon: "💬" },
  compare: { label: "Compare", icon: "⚖" },
  approvals: { label: "Approvals", icon: "✓" },
  po: { label: "PO & Invoices", icon: "📄" },
  logs: { label: "Activity Logs", icon: "◷" },
  reports: { label: "Reports", icon: "▦" },
};

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [role, setRole] = useState("officer");

  const screenMap = {
    dashboard: <Dashboard setPage={setPage} />,
    vendors: <Vendors />,
    rfq: <RFQ setPage={setPage} />,
    quotations: <Quotations />,
    compare: <Compare setPage={setPage} />,
    approvals: <Approvals setPage={setPage} />,
    po: <POInvoice />,
    logs: <ActivityLogs />,
    reports: <Reports />,
  };

  return (
    <div className="app">
      <Sidebar pages={PAGES} active={page} setPage={setPage} role={role} setRole={setRole} />
      <div className="main">
        <Topbar title={PAGES[page]?.label} role={role} />
        <div className="content">{screenMap[page]}</div>
      </div>
    </div>
  );
}
