import { useState } from "react";

const VENDORS = [
  { id: "V001", name: "TechPro Solutions", initials: "TP", category: "IT Hardware", gst: "29ABCDE1234F1Z5", email: "vendor@techpro.in", phone: "+91 98400 12345", rating: 5, status: "Active", pos: 12, city: "Bengaluru" },
  { id: "V002", name: "CloudNest Pvt Ltd", initials: "CN", category: "Cloud Services", gst: "27XYZAB5678G2H6", email: "ops@cloudnest.io", phone: "+91 98765 43210", rating: 4, status: "Active", pos: 8, city: "Pune" },
  { id: "V003", name: "PrintMart Office", initials: "PM", category: "Office Supplies", gst: "33LMNOP9012K3L7", email: "sales@printmart.co", phone: "+91 94400 55566", rating: 3, status: "Under Review", pos: 5, city: "Chennai" },
  { id: "V004", name: "FurnEx Commercial", initials: "FX", category: "Furniture", gst: "09QRSTU3456M4N8", email: "b2b@furnex.com", phone: "+91 97700 88899", rating: 4, status: "Active", pos: 9, city: "Hyderabad" },
  { id: "V005", name: "SwiftLog India", initials: "SL", category: "Logistics", gst: "07ABCXY7890P5Q2", email: "freight@swiftlog.in", phone: "+91 99100 33344", rating: 4, status: "Active", pos: 6, city: "Delhi" },
  { id: "V006", name: "DataVault Systems", initials: "DV", category: "IT Software", gst: "29DVXYZ1111A2B3", email: "sales@datavault.io", phone: "+91 98303 77711", rating: 5, status: "Active", pos: 3, city: "Bengaluru" },
];

export default function Vendors() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [form, setForm] = useState({ name: "", category: "IT Hardware", gst: "", email: "", phone: "", city: "" });
  const [vendors, setVendors] = useState(VENDORS);
  const [toast, setToast] = useState("");

  const cats = ["All", ...new Set(vendors.map((v) => v.category))];
  const filtered = vendors.filter((v) =>
    (catFilter === "All" || v.category === catFilter) &&
    (v.name.toLowerCase().includes(search.toLowerCase()) || v.email.toLowerCase().includes(search.toLowerCase()))
  );

  function addVendor() {
    if (!form.name || !form.gst || !form.email) { alert("Please fill required fields."); return; }
    const newV = { ...form, id: `V00${vendors.length + 1}`, initials: form.name.slice(0, 2).toUpperCase(), rating: 0, status: "Active", pos: 0 };
    setVendors([newV, ...vendors]);
    setShowModal(false);
    setForm({ name: "", category: "IT Hardware", gst: "", email: "", phone: "", city: "" });
    setToast("Vendor added successfully!");
    setTimeout(() => setToast(""), 3000);
  }

  const statusClass = { Active: "badge-green", "Under Review": "badge-amber", Inactive: "badge-red" };

  return (
    <div>
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, background: "var(--green)", color: "#fff", padding: "12px 20px", borderRadius: 8, zIndex: 999, fontWeight: 500, fontSize: 13 }}>
          ✓ {toast}
        </div>
      )}
      <div className="page-header">
        <div>
          <div className="page-title">Vendor Management</div>
          <div className="page-subtitle">{vendors.length} registered vendors · {vendors.filter(v => v.status === "Active").length} active</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Vendor</button>
      </div>

      <div className="card section-gap">
        <div className="card-header" style={{ paddingBottom: 14 }}>
          <div className="search-bar">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input className="form-input" placeholder="Search vendors..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="form-select" style={{ width: 160 }} value={catFilter} onChange={e => setCatFilter(e.target.value)}>
              {cats.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="btns">
            {["All", "Active", "Under Review"].map(f => (
              <button key={f} className={`btn btn-sm ${catFilter === f ? "btn-primary" : ""}`} onClick={() => setCatFilter(f === "All" ? "All" : f)}>{f}</button>
            ))}
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Vendor</th><th>Category</th><th>GST Number</th><th>Contact</th><th>Location</th><th>Rating</th><th>POs</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 8, background: "var(--brand-light)", color: "var(--brand)", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{v.initials}</div>
                      <div>
                        <div className="td-main">{v.name}</div>
                        <div className="text-sm text-muted">{v.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="pill" style={{ background: "var(--brand-light)", color: "var(--brand)" }}>{v.category}</span></td>
                  <td className="td-mono">{v.gst}</td>
                  <td className="text-sm text-muted">{v.phone}</td>
                  <td className="text-sm text-muted">{v.city}</td>
                  <td><span className="stars">{"★".repeat(v.rating)}{"☆".repeat(5 - v.rating)}</span></td>
                  <td style={{ fontWeight: 600 }}>{v.pos}</td>
                  <td><span className={`badge ${statusClass[v.status] || "badge-gray"}`}>{v.status}</span></td>
                  <td><button className="btn btn-xs">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-title">Register New Vendor</div>
            <div className="form-row cols2">
              <div className="form-group">
                <label className="form-label">Vendor Name *</label>
                <input className="form-input" placeholder="Company name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {["IT Hardware", "IT Software", "Cloud Services", "Office Supplies", "Furniture", "Logistics"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row cols2">
              <div className="form-group">
                <label className="form-label">GST Number *</label>
                <input className="form-input" placeholder="GSTIN" value={form.gst} onChange={e => setForm({ ...form, gst: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">City</label>
                <input className="form-input" placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
              </div>
            </div>
            <div className="form-row cols2">
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input className="form-input" placeholder="vendor@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" placeholder="+91 00000 00000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={addVendor}>Register Vendor</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
