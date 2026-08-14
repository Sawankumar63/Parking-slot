import React, { useEffect, useState } from "react";
import { createBooking } from "../services/bookingService";
import { getParking } from "../services/parkingService";
import { getProfile } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../css/booking.css";

const Booking = () => {
  const navigate = useNavigate();
  const [parkingList,setParkingList]=useState([]);
  const [form,setForm]=useState({parkingId:"",vehicleNumber:"",bookingDate:"",startTime:"",endTime:""});
  const [message,setMessage]=useState(""); const [error,setError]=useState(""); const [user,setUser]=useState(null); const [loading,setLoading]=useState(false);

  useEffect(()=>{ Promise.all([getParking(),getProfile()]).then(([p,u])=>{setParkingList(p.parking||[]);setUser(u.user); if(p.parking?.[0]) setForm(f=>({...f,parkingId:String(p.parking[0].id)}));}).catch(e=>setError(e.message)); },[]);
  const update=e=>setForm({...form,[e.target.name]:e.target.value});
  const submit=async e=>{
    e.preventDefault(); setError(""); setMessage("");
    if(form.endTime<=form.startTime){setError("End time must be after start time.");return;}
    setLoading(true);
    try{
      const data=await createBooking({parking_id:Number(form.parkingId),vehicle_number:form.vehicleNumber,booking_date:form.bookingDate,start_time:form.startTime,end_time:form.endTime});
      setMessage(`Booking successful! Booking ID: ${data.bookingId}`);
      setTimeout(()=>navigate("/booking-confirmation",{state:{bookingId:data.bookingId,parkingId:form.parkingId}}),600);
    }catch(e){setError(e.message)}finally{setLoading(false)}
  };
  return <section className="booking-page"><div className="booking-container">
    <h1 className="booking-title">Book Your Parking</h1><p className="booking-subtitle">Reserve your parking slot in just a few clicks.</p>
    <div className="form-card booking-card"><h2 className="booking-heading">Booking Details</h2><form onSubmit={submit}>
      {user && <p className="text-muted">Booking for <strong>{user.name}</strong> ({user.email})</p>}
      <div className="form-group"><label className="form-label">Select Parking</label><select className="form-control" name="parkingId" required value={form.parkingId} onChange={update}><option value="">Select parking</option>{parkingList.map(p=><option key={p.id} value={p.id}>{p.title || p.name} - {p.location}</option>)}</select></div>
      <div className="form-group"><label className="form-label">Vehicle Number</label><input className="form-control" name="vehicleNumber" placeholder="Enter vehicle number" required value={form.vehicleNumber} onChange={update}/></div>
      <div className="form-group"><label className="form-label">Booking Date</label><input className="form-control" type="date" name="bookingDate" required value={form.bookingDate} onChange={update}/></div>
      <div className="form-group"><label className="form-label">Start Time</label><input className="form-control" type="time" name="startTime" required value={form.startTime} onChange={update}/></div>
      <div className="form-group"><label className="form-label">End Time</label><input className="form-control" type="time" name="endTime" required value={form.endTime} onChange={update}/></div>
      {message && <p className="success-text">{message}</p>}{error && <p className="error-text">{error}</p>}
      <button className="btn btn-primary" style={{width:"100%"}} disabled={loading}>{loading?"Confirming...":"🚗 Confirm Booking"}</button>
    </form></div>
  </div></section>;
};
export default Booking;
