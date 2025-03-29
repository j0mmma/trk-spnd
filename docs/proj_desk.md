# Use Cases & roles

1. IT admin/operations manager - admin
    - track who is using what, track down shadow IT, make sure everyone is following company policies
    - create/handle procurement requests
2. Finance - admin
    - track and forcas IT expenses
    - create/handle procurement requests
3. Employee - member
    - see what apps are being used by the organization
    - create requests for new tools/upgrades/additional licences

# High level features

1. SaaS management:
    - Apps
        - CRUD:
            - pricing plans
            - assign licences
            - input transactions
    - Employees
        - CRUD:
            - employee profiles
            - assign licences
2. Procurement
    - leave requests for new tools, updates, additional licences and so on.
    - admin approve requests
3. Analytics:
    - view usage
    - view most used apps
    - view finance data (projected/actual spending, total monthly/yearly spending)

# Views
1. Dashboard/stats
    - num of employees
    - num of apps used
    - Breakdown
        - most used apps (num of licences)
        - most expensive apps (based on pricing plans)
    - upcoming renewals
    - projected spending (from pricing plans)
    - actual spending (from transactions)
    - 
2. Apps
    - App page
        - Overview
        - Pricing Plans
        - Users (with assigned pricing plans for this app)
        - Transactions
3. Employees
    - Employee Page
        - Overview
        - Apps used
4. Procurement
    - Create requests for new apps 
    - Managers can create request workflows ??????

# Entities

vocab: App = applicaiton = service = SaaS = tool -> choose the most sutable name and use universaly

App
- id
- name
- category
- status
- renewal_date
- owner_id FK
- notes

Pricing_plan
- id
- name
- num_of_licences
- price_per_licence
- billing_cycle
- app_id FK not unique (one app can have multiple pricing plans)

Transaction
- id
- number
- App
- description
- datetime
- status
- amount
- app_id FK (one to many)

App_category
- id
- name

App_status (Active, Calceled, On hold, Not approved, Needs review)
- id
- name

App_users (many to many)
- id
- app_id FK
- user_id FK
- app_pricing_plan_id FK

User
- id
- email
- password
- fname
- lname
- department_id FK
- role_id
- status_id

User_role (Member, Admin)
- id
- name

User_status (Active, Inactive)
- id
- name

Department
- id
- name

Procurement_request
- id
- description
- app_name
- type_id FK
- deadline_datetime
- approver_id FK user
- created_by_id FK user
- 

Request_type (New Purchase, Upgrade, Additional licences)
- id
- name

Request_status (New, In Progress, Approved, Calceled, Complete)
- id
- name