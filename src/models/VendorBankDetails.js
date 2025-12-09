import db from "../config/db.js";


const VendorBankDetails = {

  // Add vendor bank details
  create: (vendor_id, account_holder, account_number, ifsc_code, bank_name, branch_name, callback) => {
    const sql = `
      INSERT INTO vendor_bank_details
      (vendor_id, account_holder, account_number, ifsc_code, bank_name, branch_name)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [vendor_id, account_holder, account_number, ifsc_code, bank_name, branch_name],
      callback
    );
  },

  // Get bank details of a vendor
  getByVendor: (vendor_id, callback) => {
    const sql = `
      SELECT * FROM vendor_bank_details
      WHERE vendor_id = ?
      LIMIT 1
    `;
    db.query(sql, [vendor_id], callback);
  },

  // Update vendor bank details
  update: (id, account_holder, account_number, ifsc_code, bank_name, branch_name, callback) => {
    const sql = `
      UPDATE vendor_bank_details
      SET account_holder = ?, account_number = ?, ifsc_code = ?, bank_name = ?, branch_name = ?
      WHERE id = ?
    `;
    db.query(
      sql,
      [account_holder, account_number, ifsc_code, bank_name, branch_name, id],
      callback
    );
  }
};

export default VendorBankDetails;

