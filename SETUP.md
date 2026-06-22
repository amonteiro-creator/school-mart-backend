# SETUP GUIDE

## Install

npm install

---

## Start Server

npm run dev

---

## Migration

npx sequelize-cli db:migrate

---

## Environment Variables

PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=school_mart
DB_USER=postgres
DB_PASSWORD=postgres

JWT_SECRET=your_secret
JWT_EXPIRY=8h

---

## Agent Guide

before writing any code read all these md files in order: 1. SETUP.md, 2. AGENT.md, 3. SKILL.md, 4. ARCHITECTURE.md, 5. ROUTES_AND_BUSINESSLOGIC.md, 6. FEATURE.md.

- refer all the md files before starting any task to understand the project structure and rules
- follow all the rules mentioned in the md files
- strictly follow the layers mentioned in the md files
- strictly follow the folder structure mentioned in the md files
- strictly follow the naming convention mentioned in the md files
- strictly follow the response format mentioned in the md files
- strictly follow the pagination rule mentioned in the md files
- strictly follow the soft delete rule mentioned in the md files
- create and update postman collection each time you make any changes in the code.

follow these rules and everytime create or update the readme file and postman collection json file.
