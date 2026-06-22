
# ROUTES_AND_BUSINESSLOGIC

## Base URL

/api

---

# AUTH APIs

## POST /auth/register
- Register parent

## POST /auth/login
- Login user

---

# SCHOOL APIs

## POST /schools
Access: ADMIN
- Create school

## POST /schools/list?page=1&limit=10
Access: AUTH
- List schools
- Filters must be passed in body

## GET /schools/:id
Access: AUTH
- School details

## PUT /schools/:id
Access: ADMIN
- Update school

## DELETE /schools/:id
Access: ADMIN
- Soft delete school

---

# UNIFORM APIs

## POST /uniforms
Access: ADMIN
- Create uniform

## POST /uniforms/list?page=1&limit=10
Access: AUTH
- List uniforms
- Filters in body only

## GET /uniforms/:id
Access: AUTH
- Uniform details

## PUT /uniforms/:id
Access: ADMIN
- Update uniform

## DELETE /uniforms/:id
Access: ADMIN
- Soft delete uniform

---

# CART APIs

## POST /cart
Access: PARENT
- Add item

## GET /cart
Access: PARENT
- Get active cart

## PUT /cart/:id
Access: PARENT
- Update quantity/size

## DELETE /cart/:id
Access: PARENT
- Remove item

---

# ORDER APIs

## POST /orders
Access: PARENT
- Create order from cart

## POST /orders/list?page=1&limit=10
Access: AUTH
- List orders
- Filters in request body

## GET /orders/:id
Access: AUTH
- Order details

## PUT /orders/:id/status
Access: ADMIN
- Update status

## DELETE /orders/:id
Access: PARENT/ADMIN
- Cancel order

---

# DELIVERY APIs

## POST /delivery/:orderId
Access: ADMIN
- Generate tracking

## PUT /delivery/:orderId
Access: ADMIN
- Update delivery status

## GET /delivery/:orderId
Access: AUTH
- Track delivery

---

# GLOBAL RULES

## Pagination
Only:
- page
- limit

allowed in query params.

All:
- filters
- search
- sorting
- status
- advanced conditions

must go in request body.

---

## Soft Delete

Never hard delete records.

Use:
is_archive = true

---

## Response Structure

{
  message,
  rid,
  data
}
