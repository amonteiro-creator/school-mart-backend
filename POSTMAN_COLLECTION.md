# POSTMAN COLLECTION RULES

## Requirements

- Every API must exist in collection
- Every protected API must use:
Authorization: Bearer {{authToken}}

---

## Variables

- authToken
- schoolId
- uniformId
- cartId
- orderId

---

## Auto Test Scripts

- Save auth token after login
- Save dynamic IDs
- Validate status codes

---

## Update Rule

Whenever:
- API changes
- Route changes
- Request body changes
- Response changes

The Postman collection must also be updated.
