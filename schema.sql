-- ============================================================
-- VendorBridge Procurement ERP — Database Schema
-- PostgreSQL Compatible
-- ============================================================

-- ─────────────────────────────────────────
-- 1. USERS & ROLES
-- ─────────────────────────────────────────
CREATE TABLE roles (
    role_id     SERIAL PRIMARY KEY,
    role_name   VARCHAR(50) NOT NULL UNIQUE  -- 'admin', 'officer', 'manager', 'vendor'
);

CREATE TABLE users (
    user_id       SERIAL PRIMARY KEY,
    full_name     VARCHAR(100) NOT NULL,
    email         VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role_id       INT NOT NULL REFERENCES roles(role_id),
    is_active     BOOLEAN DEFAULT TRUE,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────
-- 2. VENDORS
-- ─────────────────────────────────────────
CREATE TABLE vendor_categories (
    category_id   SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE vendors (
    vendor_id     SERIAL PRIMARY KEY,
    vendor_name   VARCHAR(150) NOT NULL,
    gst_number    VARCHAR(20) NOT NULL UNIQUE,
    category_id   INT REFERENCES vendor_categories(category_id),
    contact_email VARCHAR(150) NOT NULL,
    contact_phone VARCHAR(20),
    city          VARCHAR(100),
    address       TEXT,
    rating        NUMERIC(2,1) DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
    status        VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Under Review')),
    created_by    INT REFERENCES users(user_id),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────
-- 3. RFQ (REQUEST FOR QUOTATION)
-- ─────────────────────────────────────────
CREATE TABLE rfqs (
    rfq_id          SERIAL PRIMARY KEY,
    rfq_code        VARCHAR(30) NOT NULL UNIQUE,   -- e.g. RFQ-2026-047
    title           VARCHAR(200) NOT NULL,
    description     TEXT,
    deadline        DATE NOT NULL,
    created_by      INT NOT NULL REFERENCES users(user_id),
    status          VARCHAR(30) DEFAULT 'Draft'
                    CHECK (status IN ('Draft','Active','Comparing','Approved','PO Generated','Cancelled')),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Line items inside an RFQ
CREATE TABLE rfq_items (
    item_id         SERIAL PRIMARY KEY,
    rfq_id          INT NOT NULL REFERENCES rfqs(rfq_id) ON DELETE CASCADE,
    item_name       VARCHAR(200) NOT NULL,
    description     TEXT,
    quantity        INT NOT NULL CHECK (quantity > 0),
    unit            VARCHAR(50) DEFAULT 'units'
);

-- Many-to-many: which vendors are assigned to an RFQ
CREATE TABLE rfq_vendors (
    rfq_id      INT NOT NULL REFERENCES rfqs(rfq_id) ON DELETE CASCADE,
    vendor_id   INT NOT NULL REFERENCES vendors(vendor_id),
    invited_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (rfq_id, vendor_id)
);

-- ─────────────────────────────────────────
-- 4. QUOTATIONS
-- ─────────────────────────────────────────
CREATE TABLE quotations (
    quote_id        SERIAL PRIMARY KEY,
    rfq_id          INT NOT NULL REFERENCES rfqs(rfq_id),
    vendor_id       INT NOT NULL REFERENCES vendors(vendor_id),
    total_amount    NUMERIC(12,2) NOT NULL CHECK (total_amount >= 0),
    delivery_days   INT NOT NULL CHECK (delivery_days > 0),
    validity_days   INT DEFAULT 30,
    notes           TEXT,
    status          VARCHAR(20) DEFAULT 'Submitted'
                    CHECK (status IN ('Draft','Submitted','Selected','Rejected')),
    submitted_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (rfq_id, vendor_id)   -- one quote per vendor per RFQ
);

-- Line-level pricing per quotation item
CREATE TABLE quotation_items (
    quote_item_id   SERIAL PRIMARY KEY,
    quote_id        INT NOT NULL REFERENCES quotations(quote_id) ON DELETE CASCADE,
    rfq_item_id     INT NOT NULL REFERENCES rfq_items(item_id),
    unit_price      NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
    total_price     NUMERIC(12,2) GENERATED ALWAYS AS (
                        unit_price * (SELECT quantity FROM rfq_items WHERE item_id = rfq_item_id)
                    ) STORED
);

-- ─────────────────────────────────────────
-- 5. APPROVAL WORKFLOW
-- ─────────────────────────────────────────
CREATE TABLE approval_stages (
    stage_id    SERIAL PRIMARY KEY,
    stage_name  VARCHAR(50) NOT NULL,   -- 'Officer', 'Manager', 'Finance', 'Director'
    stage_order INT NOT NULL
);

CREATE TABLE approvals (
    approval_id     SERIAL PRIMARY KEY,
    rfq_id          INT NOT NULL REFERENCES rfqs(rfq_id),
    quote_id        INT NOT NULL REFERENCES quotations(quote_id),
    stage_id        INT NOT NULL REFERENCES approval_stages(stage_id),
    approver_id     INT REFERENCES users(user_id),
    status          VARCHAR(20) DEFAULT 'Pending'
                    CHECK (status IN ('Pending','Approved','Rejected','Revision Requested')),
    remarks         TEXT,
    actioned_at     TIMESTAMP,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────
-- 6. PURCHASE ORDERS
-- ─────────────────────────────────────────
CREATE TABLE purchase_orders (
    po_id           SERIAL PRIMARY KEY,
    po_code         VARCHAR(30) NOT NULL UNIQUE,   -- e.g. PO-2026-0094
    rfq_id          INT NOT NULL REFERENCES rfqs(rfq_id),
    quote_id        INT NOT NULL REFERENCES quotations(quote_id),
    vendor_id       INT NOT NULL REFERENCES vendors(vendor_id),
    subtotal        NUMERIC(12,2) NOT NULL,
    discount        NUMERIC(12,2) DEFAULT 0,
    taxable_amount  NUMERIC(12,2) NOT NULL,
    gst_percent     NUMERIC(5,2) DEFAULT 18,
    gst_amount      NUMERIC(12,2) NOT NULL,
    total_amount    NUMERIC(12,2) NOT NULL,
    status          VARCHAR(30) DEFAULT 'Approved'
                    CHECK (status IN ('Approved','Dispatched','Delivered','Fulfilled','Cancelled')),
    created_by      INT REFERENCES users(user_id),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────
-- 7. INVOICES
-- ─────────────────────────────────────────
CREATE TABLE invoices (
    invoice_id      SERIAL PRIMARY KEY,
    invoice_code    VARCHAR(30) NOT NULL UNIQUE,   -- e.g. INV-2026-0193
    po_id           INT NOT NULL REFERENCES purchase_orders(po_id),
    issued_date     DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date        DATE NOT NULL,
    total_amount    NUMERIC(12,2) NOT NULL,
    status          VARCHAR(20) DEFAULT 'Issued'
                    CHECK (status IN ('Issued','Paid','Overdue','Cancelled')),
    emailed_to      VARCHAR(150),
    emailed_at      TIMESTAMP,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────
-- 8. ACTIVITY LOGS (Audit Trail)
-- ─────────────────────────────────────────
CREATE TABLE activity_logs (
    log_id          SERIAL PRIMARY KEY,
    entity_type     VARCHAR(50) NOT NULL,   -- 'RFQ', 'Quotation', 'Approval', 'PO', 'Invoice', 'Vendor'
    entity_id       INT NOT NULL,
    action          VARCHAR(100) NOT NULL,  -- 'Created', 'Submitted', 'Approved', 'Rejected', etc.
    performed_by    INT REFERENCES users(user_id),
    details         TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────
-- 9. PERFORMANCE INDEXES
-- ─────────────────────────────────────────

-- Fast lookup of RFQs by status (used on dashboard)
CREATE INDEX idx_rfqs_status ON rfqs(status);

-- Fast lookup of quotations by RFQ (used on compare screen)
CREATE INDEX idx_quotations_rfq ON quotations(rfq_id);

-- Fast lookup of quotations by vendor
CREATE INDEX idx_quotations_vendor ON quotations(vendor_id);

-- Fast approval lookups by RFQ and status
CREATE INDEX idx_approvals_rfq ON approvals(rfq_id);
CREATE INDEX idx_approvals_status ON approvals(status);

-- Fast PO lookups by vendor (used in reports)
CREATE INDEX idx_po_vendor ON purchase_orders(vendor_id);
CREATE INDEX idx_po_status ON purchase_orders(status);

-- Fast invoice lookup by PO
CREATE INDEX idx_invoices_po ON invoices(po_id);

-- Fast audit trail queries
CREATE INDEX idx_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX idx_logs_user ON activity_logs(performed_by);
CREATE INDEX idx_logs_time ON activity_logs(created_at DESC);

-- ─────────────────────────────────────────
-- 10. SEED DATA
-- ─────────────────────────────────────────
INSERT INTO roles (role_name) VALUES ('admin'), ('officer'), ('manager'), ('vendor');

INSERT INTO vendor_categories (category_name) VALUES
    ('IT Hardware'), ('Cloud Services'), ('Office Supplies'), ('Furniture'), ('Logistics'), ('IT Software');

INSERT INTO approval_stages (stage_name, stage_order) VALUES
    ('Officer', 1), ('Manager', 2), ('Finance', 3), ('Director', 4);

-- ─────────────────────────────────────────
-- 11. USEFUL VIEWS
-- ─────────────────────────────────────────

-- Dashboard: RFQ summary with quote count
CREATE VIEW v_rfq_summary AS
SELECT
    r.rfq_id,
    r.rfq_code,
    r.title,
    r.status,
    r.deadline,
    u.full_name AS created_by,
    COUNT(q.quote_id) AS quote_count,
    MIN(q.total_amount) AS lowest_quote,
    MAX(q.total_amount) AS highest_quote
FROM rfqs r
LEFT JOIN users u ON r.created_by = u.user_id
LEFT JOIN quotations q ON r.rfq_id = q.rfq_id
GROUP BY r.rfq_id, r.rfq_code, r.title, r.status, r.deadline, u.full_name;

-- Reports: Vendor performance scorecard
CREATE VIEW v_vendor_performance AS
SELECT
    v.vendor_id,
    v.vendor_name,
    v.rating,
    COUNT(po.po_id) AS total_pos,
    COALESCE(SUM(po.total_amount), 0) AS total_spend,
    ROUND(
        100.0 * COUNT(CASE WHEN po.status = 'Fulfilled' THEN 1 END) /
        NULLIF(COUNT(po.po_id), 0), 1
    ) AS fulfillment_rate
FROM vendors v
LEFT JOIN purchase_orders po ON v.vendor_id = po.vendor_id
GROUP BY v.vendor_id, v.vendor_name, v.rating;

-- Reports: Monthly spend trend
CREATE VIEW v_monthly_spend AS
SELECT
    DATE_TRUNC('month', created_at) AS month,
    COUNT(*) AS po_count,
    SUM(total_amount) AS total_spend,
    AVG(total_amount) AS avg_po_value
FROM purchase_orders
WHERE status != 'Cancelled'
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;
