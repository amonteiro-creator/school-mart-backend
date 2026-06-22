# SCHEMA.md

# School Accessories Mart – Database Schema

> All tables must be created using Sequelize migrations only.
> All migration files must be stored under:
> `src/migration-query/`

---

# Global Rules

- Use PostgreSQL with Sequelize ORM
- Use snake_case for table and column names
- Use soft delete using:
  - `is_archive = false`
- Every list API must support:
  - `?page=1&limit=10`
- No additional query filters allowed.
- All filters/search/sort must come in request body only.
- use UUId for Id generation

---

# User Roles

| Role   | Description            |
| ------ | ---------------------- |
| ADMIN  | Full system access     |
| PARENT | Parent/customer access |

---

# USERS

| Field      | Type      | Constraints      |
| ---------- | --------- | ---------------- |
| user_id    | PK        | PRIMARY KEY      |
| name       | STRING    | NOT NULL         |
| email      | STRING    | UNIQUE, NOT NULL |
| password   | STRING    | NOT NULL         |
| role       | ENUM      | ADMIN, PARENT    |
| is_archive | BOOLEAN   | DEFAULT false    |
| created_at | TIMESTAMP | DEFAULT now()    |
| updated_at | TIMESTAMP | DEFAULT now()    |

---

# USER_TOKENS

| Field      | Type              | Constraints   |
| ---------- | ----------------- | ------------- |
| token_id   | PK                | PRIMARY KEY   |
| user_id    | FK(users.user_id) | NOT NULL      |
| token      | TEXT              | NOT NULL      |
| expires_at | TIMESTAMP         | NOT NULL      |
| created_at | TIMESTAMP         | DEFAULT now() |

---

# SCHOOLS

| Field          | Type      | Constraints   |
| -------------- | --------- | ------------- |
| school_id      | PK        | PRIMARY KEY   |
| name           | STRING    | NOT NULL      |
| address        | TEXT      | NOT NULL      |
| contact_number | STRING    | NOT NULL      |
| email          | STRING    | UNIQUE        |
| is_archive     | BOOLEAN   | DEFAULT false |
| created_at     | TIMESTAMP | DEFAULT now() |
| updated_at     | TIMESTAMP | DEFAULT now() |

---

# UNIFORMS

| Field      | Type                  | Constraints   |
| ---------- | --------------------- | ------------- |
| uniform_id | PK                    | PRIMARY KEY   |
| school_id  | FK(schools.school_id) | NOT NULL      |
| name       | STRING                | NOT NULL      |
| category   | STRING                | NOT NULL      |
| price      | DECIMAL(10,2)         | NOT NULL      |
| sizes      | JSON                  | NOT NULL      |
| is_archive | BOOLEAN               | DEFAULT false |
| created_at | TIMESTAMP             | DEFAULT now() |
| updated_at | TIMESTAMP             | DEFAULT now() |

---

# CARTS

| Field      | Type              | Constraints      |
| ---------- | ----------------- | ---------------- |
| cart_id    | PK                | PRIMARY KEY      |
| user_id    | FK(users.user_id) | UNIQUE, NOT NULL |
| created_at | TIMESTAMP         | DEFAULT now()    |
| updated_at | TIMESTAMP         | DEFAULT now()    |

---

# CART_ITEMS

| Field        | Type                    | Constraints   |
| ------------ | ----------------------- | ------------- |
| cart_item_id | PK                      | PRIMARY KEY   |
| cart_id      | FK(carts.cart_id)       | NOT NULL      |
| uniform_id   | FK(uniforms.uniform_id) | NOT NULL      |
| quantity     | INTEGER                 | NOT NULL      |
| size         | STRING                  | NOT NULL      |
| price        | DECIMAL(10,2)           | NOT NULL      |
| created_at   | TIMESTAMP               | DEFAULT now() |
| updated_at   | TIMESTAMP               | DEFAULT now() |

---

# ORDERS

| Field          | Type                  | Constraints                                       |
| -------------- | --------------------- | ------------------------------------------------- |
| order_id       | PK                    | PRIMARY KEY                                       |
| school_id      | FK(schools.school_id) | NOT NULL                                          |
| user_id        | FK(users.user_id)     | NOT NULL                                          |
| status         | ENUM                  | PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED |
| payment_status | ENUM                  | PENDING, SUCCESS, FAILED                          |
| payment_id     | STRING                | NULL                                              |
| total_amount   | DECIMAL(10,2)         | NOT NULL                                          |
| is_archive     | BOOLEAN               | DEFAULT false                                     |
| created_at     | TIMESTAMP             | DEFAULT now()                                     |
| updated_at     | TIMESTAMP             | DEFAULT now()                                     |

---

# ORDER_ITEMS

| Field         | Type                    | Constraints   |
| ------------- | ----------------------- | ------------- |
| order_item_id | PK                      | PRIMARY KEY   |
| order_id      | FK(orders.order_id)     | NOT NULL      |
| uniform_id    | FK(uniforms.uniform_id) | NOT NULL      |
| quantity      | INTEGER                 | NOT NULL      |
| size          | STRING                  | NOT NULL      |
| price         | DECIMAL(10,2)           | NOT NULL      |
| created_at    | TIMESTAMP               | DEFAULT now() |
| updated_at    | TIMESTAMP               | DEFAULT now() |

---

# DELIVERY_TRACKING

| Field         | Type                | Constraints      |
| ------------- | ------------------- | ---------------- |
| tracking_id   | PK                  | PRIMARY KEY      |
| order_id      | FK(orders.order_id) | UNIQUE, NOT NULL |
| status        | STRING              | NOT NULL         |
| tracking_link | TEXT                | NULL             |
| location      | STRING              | NULL             |
| updated_at    | TIMESTAMP           | DEFAULT now()    |

---

# Required Indexes

## USERS

- UNIQUE(email)

## SCHOOLS

- INDEX(name)

## UNIFORMS

- INDEX(school_id)
- INDEX(category)

## CART_ITEMS

- INDEX(cart_id)
- INDEX(uniform_id)

## ORDERS

- INDEX(user_id)
- INDEX(status)

## DELIVERY_TRACKING

- UNIQUE(order_id)

---

# Soft Delete Rule

Never hard delete core records.

Use:

```sql
UPDATE table_name
SET is_archive = true
WHERE id = ?;
```

All queries must include:

```sql
WHERE is_archive = false
```

unless explicitly required otherwise.
