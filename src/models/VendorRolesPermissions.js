import db from "../config/db.js";


const VendorRolesPermissions = {

  // Create a new role
  createRole: (vendor_id, role_name, permissions, callback) => {
    const sql = `
      INSERT INTO vendor_roles_permissions
      (vendor_id, role_name, permissions)
      VALUES (?, ?, ?)
    `;
    db.query(sql, [vendor_id, role_name, permissions], callback);
  },

  // Get all roles of a vendor
  getRolesByVendor: (vendor_id, callback) => {
    const sql = `
      SELECT * FROM vendor_roles_permissions
      WHERE vendor_id = ?
      ORDER BY id DESC
    `;
    db.query(sql, [vendor_id], callback);
  },

  // Update role permissions
  updatePermissions: (id, permissions, callback) => {
    const sql = `
      UPDATE vendor_roles_permissions
      SET permissions = ?
      WHERE id = ?
    `;
    db.query(sql, [permissions, id], callback);
  },

  // Delete a role
  deleteRole: (id, callback) => {
    const sql = `
      DELETE FROM vendor_roles_permissions
      WHERE id = ?
    `;
    db.query(sql, [id], callback);
  }
};

export default VendorRolesPermissions;

