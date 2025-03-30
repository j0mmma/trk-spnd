use spndb;


SELECT a.name, ac.name AS category, u.email AS owner_email
FROM app a
JOIN app_category ac ON a.category_id = ac.id
JOIN user u ON a.owner_id = u.id
WHERE a.status_id = (SELECT id FROM app_status WHERE name = 'Active');


SELECT u.email, a.name AS app_name, pp.name AS plan
FROM app_users au
JOIN user u ON au.user_id = u.id
JOIN app a ON au.app_id = a.id
JOIN pricing_plan pp ON au.app_pricing_plan_id = pp.id;

SELECT pr.description, a.name AS app, rt.name AS type, rs.name AS status,
       creator.email AS requested_by, approver.email AS approver
FROM procurement_request pr
JOIN app a ON pr.app_id = a.id
JOIN request_type rt ON pr.type_id = rt.id
JOIN request_status rs ON pr.status_id = rs.id
JOIN user creator ON pr.created_by_id = creator.id
JOIN user approver ON pr.approver_id = approver.id;


-- storred func

DELIMITER //

CREATE FUNCTION GetAppProjectedAnnualCost(appId INT)
RETURNS DECIMAL(12,2)
DETERMINISTIC
BEGIN
  DECLARE total DECIMAL(12,2);
  SELECT SUM(
    CASE billing_cycle
      WHEN 'Monthly' THEN price_per_licence * num_of_licences * 12
      WHEN 'Yearly' THEN price_per_licence * num_of_licences
    END
  )
  INTO total
  FROM pricing_plan
  WHERE app_id = appId;

  RETURN IFNULL(total, 0.00);
END //

DELIMITER ;


-- storred proc

DELIMITER //

CREATE PROCEDURE CreateProcurementRequest (
  IN p_description TEXT,	
  IN p_app_id INT,
  IN p_type_id INT,
  IN p_deadline DATETIME,
  IN p_creator_id INT
)
BEGIN
  DECLARE new_status_id INT;
  SELECT id INTO new_status_id FROM request_status WHERE name = 'New';

  INSERT INTO procurement_request (
    description, app_id, type_id, deadline_datetime, 
    created_by_id, status_id
  )
  VALUES (
    p_description, p_app_id, p_type_id, p_deadline, 
    p_creator_id, new_status_id
  );
END //

DELIMITER ;


-- Business Function: User views apps they’re assigned to
SELECT 
  u.email,
  a.name AS app_name,
  pp.name AS pricing_plan,
  pp.billing_cycle
FROM app_users au
JOIN user u ON au.user_id = u.id
JOIN app a ON au.app_id = a.id
JOIN pricing_plan pp ON au.app_pricing_plan_id = pp.id
WHERE u.id = 2;


-- Business Function: Approver views pending procurement requests

SELECT 
  pr.id,
  pr.description,
  a.name AS app,
  rt.name AS request_type,
  pr.deadline_datetime,
  u.email AS requested_by
FROM procurement_request pr
JOIN app a ON pr.app_id = a.id
JOIN request_type rt ON pr.type_id = rt.id
JOIN user u ON pr.created_by_id = u.id
WHERE pr.status_id = (SELECT id FROM request_status WHERE name = 'New')
  AND pr.approver_id = 1;


-- Business Function: Procurement manager views all pending requests across the company

SELECT 
  pr.id,
  a.name AS app,
  rt.name AS request_type,
  rs.name AS status,
  u.email AS requested_by,
  pr.deadline_datetime
FROM procurement_request pr
JOIN app a ON pr.app_id = a.id
JOIN request_type rt ON pr.type_id = rt.id
JOIN request_status rs ON pr.status_id = rs.id
JOIN user u ON pr.created_by_id = u.id
WHERE rs.name IN ('New', 'In Progress')
ORDER BY pr.deadline_datetime;


-- trigers

-- ✅ 1. Trigger for data integrity
-- 📌 Prevent assigning a user to an inactive app

DELIMITER //

CREATE TRIGGER prevent_assign_to_inactive_app
BEFORE INSERT ON app_users
FOR EACH ROW
BEGIN
  DECLARE app_status_name VARCHAR(50);
  SELECT s.name INTO app_status_name
  FROM app a
  JOIN app_status s ON a.status_id = s.id
  WHERE a.id = NEW.app_id;

  IF app_status_name != 'Active' THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Cannot assign user to an inactive app';
  END IF;
END //

DELIMITER ;

-- biz logic trigger

-- ✅ Trigger: Auto-assign approver based on app existence

DELIMITER //

CREATE TRIGGER assign_approver_on_request
BEFORE INSERT ON procurement_request
FOR EACH ROW
BEGIN
  DECLARE app_owner_id INT DEFAULT NULL;
  DECLARE fallback_admin_id INT DEFAULT NULL;

  -- Try to get app owner
  IF NEW.approver_id IS NULL AND NEW.app_id IS NOT NULL THEN
    SELECT owner_id INTO app_owner_id
    FROM app
    WHERE id = NEW.app_id;

    IF app_owner_id IS NOT NULL THEN
      SET NEW.approver_id = app_owner_id;
    END IF;
  END IF;

  -- If approver_id still not set, assign fallback admin
  IF NEW.approver_id IS NULL THEN
    SELECT id INTO fallback_admin_id
    FROM user
    WHERE role_id = (SELECT id FROM user_role WHERE name = 'Admin')
    LIMIT 1;

    SET NEW.approver_id = fallback_admin_id;
  END IF;
END //

DELIMITER ;


