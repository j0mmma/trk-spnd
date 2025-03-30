from flask import Blueprint, jsonify, request
from models.user_model import UserModel

user_bp = Blueprint('user_bp', __name__)
user_model = UserModel()

# GET all users
@user_bp.route('/api/users', methods=['GET'])
def get_users():
    users = user_model.get_all()
    return jsonify(users)

# GET a specific user by ID
@user_bp.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = user_model.get_by_id(user_id)
    if user:
        return jsonify(user)
    return jsonify({"error": "User not found"}), 404

# PATCH (update role/status)
@user_bp.route('/api/users/<int:user_id>', methods=['PATCH'])
def update_user_field(user_id):
    data = request.json
    field = data.get('field')
    value = data.get('value')

    try:
        user_model.update_field(user_id, field, value)
        return jsonify({"message": f"{field} updated successfully"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500
