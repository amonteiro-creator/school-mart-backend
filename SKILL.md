# SKILL GUIDE

## Core Rules

- Use JavaScript ES6+
- Use Express.js
- Use PostgreSQL
- Use Sequelize ORM
- Use JWT authentication
- Use bcrypt for hashing

---

## API Rules

Every controller must:

- Validate input
- Handle errors
- Use sendResponse()

---

## Soft Delete

Never hard delete core entities.

Use:
is_archive = true

---

## Pagination

Allowed query params:
?page=1&limit=10

No other query params allowed.

Filters must go in request body.

---

## Constants

- Use constants for all ENUM values
- Use constants for all status values
- Use constants for all role values
- Use constants for all payment status values
- Use constants for all delivery status values

---

## centralized logic

- Use centralized logic for all common operations
- Use centralized error handling
- Use centralized response handling
- Use centralized validation

---
