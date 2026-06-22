const http = require("http");

let PASS = 0;
let FAIL = 0;

const request = (method, path, body) => {
  return new Promise((resolve, reject) => {
    const bodyStr = body ? JSON.stringify(body) : null;
    const options = {
      hostname: "localhost",
      port: 3000,
      path,
      method,
      headers: {
        "Content-Type": "application/json",
        ...(bodyStr ? { "Content-Length": Buffer.byteLength(bodyStr) } : {}),
      },
    };

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, data });
        }
      });
    });
    req.on("error", reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
};

function log(name, res, expectedStatus) {
  const ok = res.status === expectedStatus;
  const icon = ok ? "✅" : "❌";
  if (ok) PASS++;
  else FAIL++;
  console.log(`${icon} [${res.status}] ${name}`);
  if (!ok) {
    console.log("   Expected:", expectedStatus, "| Got:", res.status);
    console.log("   Body:", JSON.stringify(res.data, null, 2));
  }
}

async function testAll() {
  console.log("\n════════════════════════════════════════");
  console.log("  School Accessories Mart — API Tests");
  console.log("════════════════════════════════════════\n");

  // ── PING ─────────────────────────────────────────────────────────────────
  console.log("📌 Ping");
  let res = await request("GET", "/api/ping");
  log("GET /api/ping", res, 200);

  // ── AUTH ─────────────────────────────────────────────────────────────────
  console.log("\n📌 Auth");

  res = await request("POST", "/api/auth/register", {
    name: "Admin User",
    email: "admin@schoolmart.com",
    password: "Admin@1234",
    role: "ADMIN",
  });
  log("POST /api/auth/register  (new user)", res, 201);
  const userId = res.data?.data?.user_id;

  // duplicate register → should fail
  res = await request("POST", "/api/auth/register", {
    name: "Admin User",
    email: "admin@schoolmart.com",
    password: "Admin@1234",
    role: "ADMIN",
  });
  log("POST /api/auth/register  (duplicate → 400)", res, 400);

  res = await request("POST", "/api/auth/login", {
    email: "admin@schoolmart.com",
    password: "Admin@1234",
  });
  log("POST /api/auth/login     (valid)", res, 200);

  res = await request("POST", "/api/auth/login", {
    email: "admin@schoolmart.com",
    password: "WrongPass!",
  });
  log("POST /api/auth/login     (invalid → 401)", res, 401);

  // ── SCHOOLS ──────────────────────────────────────────────────────────────
  console.log("\n📌 Schools");

  res = await request("POST", "/api/schools", {
    name: "Springfield Elementary",
    address: "742 Evergreen Terrace",
    contact_number: "555-0123",
    email: "info@springfield.edu",
  });
  log("POST /api/schools        (create)", res, 201);
  const schoolId = res.data?.data?.school_id;

  res = await request("GET", "/api/schools");
  log("GET  /api/schools        (list)", res, 200);

  res = await request("GET", `/api/schools/${schoolId}`);
  log(`GET  /api/schools/${schoolId}       (by id)`, res, 200);

  res = await request("PUT", `/api/schools/${schoolId}`, {
    name: "Springfield High School",
    contact_number: "555-0124",
  });
  log(`PUT  /api/schools/${schoolId}       (update)`, res, 200);

  // ── UNIFORMS ─────────────────────────────────────────────────────────────
  console.log("\n📌 Uniforms");

  res = await request("POST", "/api/uniforms", {
    school_id: schoolId,
    name: "Winter Jacket",
    category: "Winter Wear",
    price: "45.50",
    sizes: ["S", "M", "L", "XL"],
  });
  log("POST /api/uniforms       (create)", res, 201);
  const uniformId = res.data?.data?.uniform_id;

  res = await request("GET", `/api/uniforms?school_id=${schoolId}`);
  log("GET  /api/uniforms       (by school)", res, 200);

  res = await request("GET", `/api/uniforms/${uniformId}`);
  log(`GET  /api/uniforms/${uniformId}      (by id)`, res, 200);

  res = await request("PUT", `/api/uniforms/${uniformId}`, {
    price: "49.99",
    sizes: ["M", "L"],
  });
  log(`PUT  /api/uniforms/${uniformId}      (update)`, res, 200);

  // ── ORDERS ───────────────────────────────────────────────────────────────
  console.log("\n📌 Orders");

  res = await request("POST", "/api/orders", {
    school_id: schoolId,
    user_id: userId,
    total_amount: "95.49",
    items: [{ uniform_id: uniformId, quantity: 2, size: "M", price: "45.50" }],
  });
  log("POST /api/orders         (create)", res, 201);
  const orderId = res.data?.data?.order_id;

  res = await request("GET", "/api/orders");
  log("GET  /api/orders         (list)", res, 200);

  res = await request("GET", `/api/orders/${orderId}`);
  log(`GET  /api/orders/${orderId}          (by id)`, res, 200);

  res = await request("PUT", `/api/orders/${orderId}`, {
    status: "CONFIRMED",
  });
  log(`PUT  /api/orders/${orderId}          (update status)`, res, 200);

  // ── DELIVERY ─────────────────────────────────────────────────────────────
  console.log("\n📌 Delivery");

  res = await request("POST", `/api/delivery/${orderId}`, {
    status: "DISPATCHED",
    location: "Main Warehouse",
  });
  log(`POST /api/delivery/${orderId}        (assign tracking)`, res, 201);

  res = await request("PUT", `/api/delivery/${orderId}`, {
    status: "IN_TRANSIT",
    location: "City Distribution Hub",
  });
  log(`PUT  /api/delivery/${orderId}        (update tracking)`, res, 200);

  res = await request("GET", `/api/delivery/${orderId}`);
  log(`GET  /api/delivery/${orderId}        (get tracking)`, res, 200);

  // ── CLEANUP: Delete routes ────────────────────────────────────────────────
  console.log("\n📌 Delete / Cleanup");

  res = await request("DELETE", `/api/uniforms/${uniformId}`);
  log(`DELETE /api/uniforms/${uniformId}    (delete uniform)`, res, 200);

  res = await request("DELETE", `/api/orders/${orderId}`);
  log(`DELETE /api/orders/${orderId}        (cancel order)`, res, 200);

  res = await request("DELETE", `/api/schools/${schoolId}`);
  log(`DELETE /api/schools/${schoolId}      (delete school)`, res, 200);

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log("\n════════════════════════════════════════");
  console.log(`  Results: ${PASS} passed, ${FAIL} failed`);
  console.log("════════════════════════════════════════\n");
}

testAll().catch(console.error);
