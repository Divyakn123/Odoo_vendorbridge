import { useState } from "react";

const RFQS = [
  { id: "RFQ-2026-047", title: "Server Hardware Procurement", items: 3, vendors: "TechPro, CloudNest +2", deadline: "Jun 12, 2026", status: "Comparing", statusClass: "badge-amber", action: "compare" },
  { id: "RFQ-2026-046", title: "Office Supplies Q2", items: 8, vendors: "PrintMart, FurnEx", deadline: "Jun 15, 2026", status: "Active", statusClass: "badge-blue", action: null },
  { id: "RFQ-2026-044", title: "Annual Cloud Licenses", items: 2, vendors: "CloudNest", deadline: "Jun 8, 2026", status: "PO Generated", statusClass: "badge-green", action: "po" },
  { id: "RFQ-2026-041", title: "Furniture Lot B", items: 6, vendors: "FurnEx, PrintMart +2", deadline: "Jun 20, 2026", status: "Draft", statusClass: "badge-gray", action: null },
  { id: "RFQ-2026-039", title: "Network Infrastructure", items: 5, vendors: "TechPro, DataVault", deadline: "Jun 25, 2026", status: "Active", statusClass: "badge-blue", action: null },
];

export default function RFQ({ setPage }) {
  const [showModal, setShowModal] = useState(false);
  const [rfqs, setRfqs] = useState(RFQS);
  const [form, setForm] = useState({ title: "", deadline: "", vendors: [], items: "", notes: "" });
  const [toast, setToast] = useState("");
  const [tab, setTab] = useState("all");

  const vendorOptions = ["TechPro Solutions", "CloudNest Pvt Ltd", "PrintMart Office", "FurnEx Commercial", "SwiftLog India", "DataVault Systems"];

  function createRFQ() {
    if (!form.title || !form.deadline) { alert("Please fill required fields."); return; }
    const newR = {
      id: `RFQ-2026-0${48 + rfqs.length}`,
      title: form.title,
      items: parseInt(form.items) || 1,
      vendors: form.vendors.slice(0, 2).join(", ") + (form.vendors.length > 2 ? ` +${form.vendors.length - 2}` : ""),
      deadline: new Date(form.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      status: "Active",
      statusClass: "badge-blue",
      action: null,
    };
    setRfqs([newR, ...rfqs]);
    setShowModal(false);
    setForm({ title: "", deadline: "", vendors: [], items: "", notes: "" });
    setToast("RFQ created and vendors notified!");
    setTimeout(() => setToast(""), 3000);
  }

  const tabs = ["all", "active", "comparing", "completed"];
  const filtered = rfqs.filter(r => {
    if (tab === "all") return true;
    if (tab === "active") return r.status === "Active" || r.status === "Draft";
    if (tab === "comparing") return r.status === "Comparing";
    if (tab === "completed") return r.status === "PO Generated";
    return true;
  });

  return (
    <div>
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, background: "var(--green)", color: "#fff", padding: "12px 20px", borderRadius: 8, zIndex: 999, fontWeight: 500, fontSize: 13 }}>
          ✓ {toast}
        </div>
      )}
      <div className="page-header">
        <div>
          <div className="page-title">Request for Quotation</div>
          <div className="page-subtitle">Manage procurement requests and vendor assignments</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Create RFQ</button>
      </div>

      <div className="btns" style={{ marginBottom: 16 }}>
        {tabs.map(t => (
          <button key={t} className={`btn btn-sm ${tab === t ? "btn-primary" : ""}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>RFQ ID</th><th>Title</th><th>Line Items</th><th>Assigned Vendors</th><th>Deadline</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td className="td-mono">{r.id}</td>
                  <td className="td-main">{r.title}</td>
                  <td style={{ color: "var(--text2)" }}>{r.items} items</td>
                  <td className="text-sm text-muted">{r.vendors}</td>
                  <td className="text-sm text-muted">{r.deadline}</td>
                  <td><span className={`badge ${r.statusClass}`}>{r.status}</span></td>
                  <td>
                    {r.action === "compare" && (
                      <button className="btn btn-xs btn-primary" onClick={() => setPage("compare")}>Compare →</button>
                    )}
                    {r.action === "po" && (
                      <button className="btn btn-xs" onClick={() => setPage("po")}>View PO →</button>
                    )}
                    {!r.action && <button className="btn btn-xs">View</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal" style={{ width: 560 }}>
            <div className="modal-title">Create New RFQ</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">RFQ Title *</label>
                <input className="form-input" placeholder="e.g. Office Supplies Q3 2026" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>
            </div>
            <div className="form-row cols2">
              <div className="form-group">
                <label className="form-label">Submission Deadline *</label>
                <input type="date" className="form-input" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Number of Line Items</label>
                <input className="form-input" type="number" placeholder="e.g. 5" value={form.items} onChange={e => setForm({ ...form, items: e.target.value })} />
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: 14 }}>
              <label className="form-label">Assign Vendors (select multiple)</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "10px", border: "1px solid var(--border2)", borderRadius: 6, background: "var(--surface)" }}>
                {vendorOptions.map(v => (
                  <label key={v} style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer", fontSize: 12, padding: "4px 10px", borderRadius: 20, background: form.vendors.includes(v) ? "var(--brand-light)" : "var(--surface2)", color: form.vendors.includes(v) ? "var(--brand)" : "var(--text2)", border: `1px solid ${form.vendors.includes(v) ? "var(--brand-mid)" : "transparent"}`, transition: "all .15s" }}>
                    <input type="checkbox" style={{ display: "none" }} checked={form.vendors.includes(v)} onChange={e => {
                      if (e.target.checked) setForm({ ...form, vendors: [...form.vendors, v] });
                      else setForm({ ...form, vendors: form.vendors.filter(x => x !== v) });
                    }} />
                    {form.vendors.includes(v) ? "✓ " : ""}{v}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: 14 }}>
              <label className="form-label">Requirements & Notes</label>
              <textarea className="form-textarea" placeholder="Specify items, quantities, technical specifications..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>
            <div className="modal-footer">
              <button className="btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={createRFQ}>Create & Notify Vendors</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
