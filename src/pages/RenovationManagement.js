import React, { useState } from 'react';
import '../styles/RenovationManagement.css';

function RenovationManagement() {
  const [timeSlots, setTimeSlots] = useState([
    { day: 'Monday', time: '10 AM - 12 PM', booked: false },
    { day: 'Tuesday', time: '2 PM - 4 PM', booked: false },
    { day: 'Wednesday', time: '1 PM - 3 PM', booked: false },
  ]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [notification, setNotification] = useState(''); 
  const [showRecords, setShowRecords] = useState(false); 
  const [bookingRecords, setBookingRecords] = useState([]);

  const handleBooking = (index) => {
    if (timeSlots[index].booked) {
      setNotification('This slot is already booked.');
      return;
    }

    const updatedSlots = timeSlots.map((slot, i) =>
      i === index ? { ...slot, booked: true } : slot
    );

    const newRecord = {
      day: timeSlots[index].day,
      time: timeSlots[index].time,
      status: 'Booked',
      date: new Date().toLocaleDateString()
    };

    setTimeSlots(updatedSlots);
    setSelectedSlot(timeSlots[index]);
    setBookingRecords([...bookingRecords, newRecord]); 
    setNotification(`You have successfully booked the slot on ${timeSlots[index].day} from ${timeSlots[index].time}.`);
  };

  const handleCancelBooking = () => {
    if (selectedSlot) {
      if (window.confirm('Are you sure you want to cancel this booking?')) {
        const updatedSlots = timeSlots.map(slot =>
          slot === selectedSlot ? { ...slot, booked: false } : slot
        );

        const updatedRecords = bookingRecords.map(record =>
          record.day === selectedSlot.day && record.time === selectedSlot.time
            ? { ...record, status: 'Cancelled' }
            : record
        );

        setTimeSlots(updatedSlots);
        setBookingRecords(updatedRecords);
        setNotification('Your booking has been cancelled.');
        setSelectedSlot(null);
      }
    }
  };

  const handleViewRecords = () => {
    setShowRecords(!showRecords);
  };

  return (
    <div className="renovation-management">
      <div className="headerContainer">
        <h1>Renovation Management</h1>
        <p>Book your renovation slots easily.</p>
      </div>

      <div className="contentContainer">
        <h2>Available Time Slots</h2>
        <ul className="timeSlots">
          {timeSlots.map((slot, index) => (
            <li key={index} className={slot.booked ? 'booked' : ''}>
              {slot.day}: {slot.time}
              {!slot.booked ? (
                <button onClick={() => handleBooking(index)}>Book</button>
              ) : (
                <span style={{ color: 'red' }}> (Booked)</span>
              )}
            </li>
          ))}
        </ul>
        
        {selectedSlot && (
          <div className="bookingInfo">
            <h3>Your Booking</h3>
            <p>
              You have booked a slot on {selectedSlot.day} from {selectedSlot.time}.
            </p>
            <button className="cancel-button" onClick={handleCancelBooking}>Cancel Booking</button>
          </div>
        )}
        <button onClick={handleViewRecords}>
          {showRecords ? 'Hide Booking Records' : 'View Booking Records'}
        </button>
      </div>

      {notification && (
        <div className="notificationContainer">
          <p>{notification}</p>
        </div>
      )}

      {showRecords && (
        <div className="recordsContainer">
          <h3>Booking Records</h3>
          <ul>
            {bookingRecords.map((record, index) => (
              <li key={index}>
                Day: {record.day}, Time: {record.time}, Date: {record.date}, Status: {record.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RenovationManagement;
