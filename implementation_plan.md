# Implementation Plan - School Accessories Mart

## Phase 1: Project Setup

- [x] Initialize project (`npm install`)
- [x] Set up environment variables (`.env`)
- [x] Set up Postgres database
- [x] Configure Sequelize and project structure (Now using UUID for PKs)

## Phase 2: Database Schema & Models

- [x] Create migrations in `src/migration-query/` (UUID based)
- [x] Run migrations
- [x] Create Sequelize models in `src/models/` (UUID based)
- [x] Create constants for roles, statuses, etc. in `src/constants/`

## Phase 3: Core Utilities & Middlewares

- [x] Create centralized response handler in `src/utils/`
- [x] Create centralized error handler in `src/middleware/`
- [x] Create JWT and Bcrypt helpers in `src/helpers/`
- [x] Create Auth & Role validation middleware in `src/middleware/`
- [x] Create Input validation middleware in `src/middleware/` (Updated for isUUID)

## Phase 4: Auth APIs

- [x] POST `/auth/register` (Parent registration)
- [x] POST `/auth/login` (Admin/Parent login)

## Phase 5: School APIs (Complete CRUD)

- [x] Create School (Admin)
- [x] List Schools (Auth with filters in body)
- [x] School Details (Auth)
- [x] Update School (Admin)
- [x] Soft Delete School (Admin)

## Phase 6: Uniform APIs (Complete CRUD)

- [x] Create Uniform (Admin)
- [x] List Uniforms (Auth with filters in body)
- [x] Uniform Details (Auth)
- [x] Update Uniform (Admin)
- [x] Soft Delete Uniform (Admin)

## Phase 7: Cart APIs

- [x] Add Item to Cart (Parent)
- [x] Get Active Cart (Parent)
- [x] Update Cart Item (Parent)
- [x] Remove Cart Item (Parent)

## Phase 8: Order & Delivery APIs

- [x] Create Order from Cart (Parent)
- [x] List Orders (Auth with filters)
- [x] Order Details (Auth)
- [x] Update Order Status (Admin)
- [x] Cancel Order (Parent/Admin)
- [x] Generate Tracking (Admin)
- [x] Update Delivery Status (Admin)
- [x] Track Delivery (Auth)

## Phase 9: Testing & Documentation

- [x] Final end-to-end testing (UUID verified)
- [x] Update Postman Collection (UUID verified)
- [x] Update README
