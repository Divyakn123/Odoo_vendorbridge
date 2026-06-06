# VendorBridge — Procurement & Vendor Management ERP

A full-featured Procurement ERP built for the Odoo Hackathon 2026.

## Features
- 📋 RFQ Creation & Management
- 🏢 Vendor Registration & Tracking
- 💬 Vendor Quotation Submission
- ⚖️ Side-by-Side Quotation Comparison
- ✅ Multi-stage Approval Workflow
- 📄 Auto-generated Purchase Orders & Invoices
- 🖨 PDF Download / Print / Email Invoice
- 🕐 Full Activity Log & Audit Trail
- 📊 Reports & Vendor Performance Analytics
- 🔐 4 Role-based Views (Officer, Vendor, Manager, Admin)

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Tech Stack
- React 18
- Vite
- Pure CSS (no UI library — custom design system)

## Workflow Demo
1. Dashboard → overview of procurement health
2. Vendors → register and manage vendors
3. RFQ → create RFQ and assign vendors
4. Quotations → vendor submits pricing
5. Compare → side-by-side comparison with recommendation
6. Approvals → manager approves with full audit trail
7. PO & Invoice → auto-generated invoice, email/print/PDF
8. Activity Logs → complete procurement audit trail
9. Reports → vendor scorecard and spending analytics
