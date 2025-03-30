from db import get_db_connection

class UserModel:
    def __init__(self):
        self.conn = get_db_connection()

    def get_all(self):
        cursor = self.conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT 
                u.id, u.email, u.fname, u.lname,
                ur.name AS role, us.name AS status, d.name AS department
            FROM user u
            JOIN user_role ur ON u.role_id = ur.id
            JOIN user_status us ON u.status_id = us.id
            JOIN department d ON u.department_id = d.id
        """)
        users = cursor.fetchall()
        cursor.close()
        return users

    def get_by_id(self, user_id):
        cursor = self.conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT 
                u.id, u.email, u.fname, u.lname,
                ur.name AS role, us.name AS status, d.name AS department
            FROM user u
            JOIN user_role ur ON u.role_id = ur.id
            JOIN user_status us ON u.status_id = us.id
            JOIN department d ON u.department_id = d.id
            WHERE u.id = %s
        """, (user_id,))
        user = cursor.fetchone()
        cursor.close()
        return user

    def update_field(self, user_id, field, value):
        if field not in ['role', 'status']:
            raise ValueError('Invalid field update')

        cursor = self.conn.cursor()

        if field == 'role':
            cursor.execute("SELECT id FROM user_role WHERE name = %s", (value,))
            result = cursor.fetchone()
            if result:
                role_id = result[0]
                cursor.execute("UPDATE user SET role_id = %s WHERE id = %s", (role_id, user_id))
            else:
                raise ValueError(f"Role '{value}' not found in user_role table")

        elif field == 'status':
            cursor.execute("SELECT id FROM user_status WHERE name = %s", (value,))
            result = cursor.fetchone()
            if result:
                status_id = result[0]
                cursor.execute("UPDATE user SET status_id = %s WHERE id = %s", (status_id, user_id))
            else:
                raise ValueError(f"Status '{value}' not found in user_status table")

        self.conn.commit()
        cursor.close()


    def get_by_id(self, user_id):
        cursor = self.conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT 
                u.id, u.email, u.fname, u.lname,
                ur.name AS role, us.name AS status, d.name AS department
            FROM user u
            JOIN user_role ur ON u.role_id = ur.id
            JOIN user_status us ON u.status_id = us.id
            JOIN department d ON u.department_id = d.id
            WHERE u.id = %s
        """, (user_id,))
        user = cursor.fetchone()
        cursor.close()
        return user



    def __del__(self):
        self.conn.close()
