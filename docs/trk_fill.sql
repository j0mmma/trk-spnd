USE spndb;

-- Reference tables
INSERT INTO request_type (name) VALUES 
('New Purchase'), ('Upgrade'), ('Additional licences');

INSERT INTO request_status (name) VALUES 
('New'), ('In Progress'), ('Approved'), ('Calceled'), ('Complete');

INSERT INTO user_role (name) VALUES 
('Member'), ('Admin');

INSERT INTO user_status (name) VALUES 
('Active'), ('Inactive');

INSERT INTO app_status (name) VALUES 
('Active'), ('Calceled'), ('On hold'), ('Not approved'), ('Needs review');

INSERT INTO department (name) VALUES 
('Finance'), ('IT'), ('HR'), ('Procurement');

INSERT INTO app_category (name) VALUES 
('Collaboration'), ('Security'), ('CRM'), ('Dev Tools');

-- Users
INSERT INTO user (email, password, fname, lname, department_id, role_id, status_id) VALUES
('alice@example.com', 'hashed_pw', 'Alice', 'Nguyen', 1, 2, 1),
('bob@example.com', 'hashed_pw', 'Bob', 'Smith', 2, 1, 1),
('carla@example.com', 'hashed_pw', 'Carla', 'Jones', 3, 1, 1),
('dan@example.com', 'hashed_pw', 'Dan', 'Lee', 1, 1, 1),
('eva@example.com', 'hashed_pw', 'Eva', 'Kim', 2, 1, 1),
('fred@example.com', 'hashed_pw', 'Fred', 'Taylor', 4, 1, 1),
('gina@example.com', 'hashed_pw', 'Gina', 'Miller', 3, 1, 1),
('hank@example.com', 'hashed_pw', 'Hank', 'Adams', 4, 1, 1),
('ivy@example.com', 'hashed_pw', 'Ivy', 'Clark', 1, 1, 1),
('jack@example.com', 'hashed_pw', 'Jack', 'Wong', 2, 1, 1);

-- Apps
INSERT INTO app (name, category_id, status_id, renewal_date, owner_id, notes) VALUES
('Slack', 1, 1, '2025-06-01', 1, 'Team communication'),
('Zoom', 1, 1, '2025-07-15', 2, 'Video conferencing'),
('Notion', 1, 1, '2025-05-20', 3, 'Docs and wikis'),
('Okta', 2, 1, '2025-09-01', 4, 'Identity management'),
('1Password', 2, 1, '2025-08-01', 5, 'Password manager'),
('HubSpot', 3, 1, '2025-10-01', 6, 'CRM and marketing'),
('Salesforce', 3, 1, '2025-11-15', 7, 'Advanced CRM'),
('GitHub', 4, 1, '2025-06-10', 8, 'Code repository'),
('Jira', 4, 1, '2025-07-20', 9, 'Project management'),
('Figma', 1, 1, '2025-06-30', 10, 'Design tool'),
('Confluence', 1, 1, '2025-08-15', 1, 'Documentation'),
('Trello', 1, 1, '2025-05-10', 2, 'Task boards'),
('Asana', 1, 1, '2025-06-25', 3, 'Team productivity'),
('LastPass', 2, 1, '2025-09-30', 4, 'Secure password storage'),
('Mailchimp', 3, 1, '2025-07-05', 5, 'Email marketing'),
('Zendesk', 3, 1, '2025-08-20', 6, 'Customer support'),
('Bitbucket', 4, 1, '2025-07-01', 7, 'Git hosting'),
('CircleCI', 4, 1, '2025-09-10', 8, 'CI/CD automation'),
('VS Code', 4, 1, '2025-10-05', 9, 'Code editor'),
('Google Workspace', 1, 1, '2025-12-01', 10, 'Docs, Drive, Meet');

-- Pricing Plans
INSERT INTO pricing_plan (name, num_of_licences, price_per_licence, billing_cycle, app_id) VALUES
('Slack Basic', 10, 7.00, 'Monthly', 1),
('Zoom Pro', 8, 14.99, 'Monthly', 2),
('Notion Team', 5, 10.00, 'Monthly', 3),
('Okta Standard', 6, 20.00, 'Monthly', 4),
('1Password Teams', 4, 7.99, 'Monthly', 5),
('HubSpot Starter', 5, 18.00, 'Monthly', 6),
('Salesforce Pro', 7, 25.00, 'Monthly', 7),
('GitHub Team', 10, 4.00, 'Monthly', 8),
('Jira Cloud', 6, 7.75, 'Monthly', 9),
('Figma Pro', 5, 12.00, 'Monthly', 10),
('Confluence Standard', 4, 5.00, 'Monthly', 11),
('Trello Gold', 3, 4.99, 'Monthly', 12),
('Asana Premium', 6, 11.00, 'Monthly', 13),
('LastPass Teams', 4, 6.00, 'Monthly', 14),
('Mailchimp Essentials', 5, 15.00, 'Monthly', 15),
('Zendesk Suite', 4, 19.00, 'Monthly', 16),
('Bitbucket Standard', 5, 3.00, 'Monthly', 17),
('CircleCI Performance', 3, 30.00, 'Monthly', 18),
('VS Code Pro', 6, 9.00, 'Monthly', 19),
('G Workspace Business', 10, 12.00, 'Monthly', 20);

-- App Users
INSERT INTO app_users (app_id, user_id, app_pricing_plan_id) VALUES
(1, 2, 1), (2, 2, 2),
(3, 3, 3), (4, 3, 4),
(5, 4, 5), (6, 4, 6),
(7, 5, 7), (8, 5, 8),
(9, 6, 9), (10, 6, 10),
(11, 7, 11), (12, 7, 12),
(13, 8, 13), (14, 8, 14),
(15, 9, 15), (16, 9, 16),
(17, 10, 17), (18, 10, 18);

-- Transactions
INSERT INTO transaction (number, description, datetime, status, amount, app_id) VALUES
('TX001', 'Monthly payment for Slack', '2025-03-01 10:00:00', 'Success', 70.00, 1),
('TX002', 'Monthly payment for Zoom', '2025-03-01 10:05:00', 'Success', 119.92, 2),
('TX003', 'Renewal for Notion', '2025-03-05 11:00:00', 'Pending', 50.00, 3),
('TX004', 'Failed payment for Okta', '2025-03-07 14:00:00', 'Failed', 120.00, 4),
('TX005', 'License fee for GitHub', '2025-03-10 09:30:00', 'Success', 40.00, 8);

-- Procurement Requests
INSERT INTO procurement_request (description, app_id, type_id, deadline_datetime, approver_id, created_by_id, status_id) VALUES
('Need Slack licenses for new team', 1, 1, '2025-04-01 00:00:00', 1, 2, 1),
('Upgrade Zoom plan for webinars', 2, 2, '2025-04-10 00:00:00', 1, 3, 2),
('Requesting extra seats for GitHub', 8, 3, '2025-04-05 00:00:00', 1, 5, 1);
