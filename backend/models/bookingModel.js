const db = require("../config/db");

const createBooking = (
  userId,
  parkingId,
  vehicleNumber,
  bookingDate,
  startTime,
  endTime,
  callback
) => {
  const sql = `
    INSERT INTO bookings
    (user_id, parking_id, vehicle_number, booking_date, start_time, end_time)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [userId, parkingId, vehicleNumber, bookingDate, startTime, endTime],
    callback
  );
};

module.exports = {
  createBooking,
};
