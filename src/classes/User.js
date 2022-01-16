import dayjs from '../scripts.js';
import currentDate from '../scripts.js';
import isSameOrAfter from '../scripts.js';

class User {
  constructor(user, bookingData, roomData) {
    this.id = user.id;
    this.name = user.name;
    this.bookings = [];
    this.pastBookings = [];
    this.upcomingBookings = [];
    this.totalSpent = 0;
  }
  //SAD PATH FOR USER BOOKINGS
  getUserBookings(bookingData) {
    bookingData.forEach(booking => {
      if(this.id === booking.userID) {
        this.bookings.push(booking)
      }
    })
    return this.bookings;
  }
  calculateTotalSpent(bookingData, roomData) {
    this.getUserBookings(bookingData)
    const totalAmt = this.bookings.reduce((acc, booking) => {
      let findRoom = roomData.filter(room => {
        if(room.number === booking.roomNumber) {
          acc += room.costPerNight
        }
      })
      return acc;
    }, 0);
    // this.totalSpent = Math.round(totalAmt*100)/100;
    return Math.round(totalAmt*100)/100;
  }
  sortBookings(currentDate, bookingData) {
    this.getUserBookings(bookingData)
    this.bookings.forEach(booking => {
      if (currentDate === booking.date || currentDate > booking.date) {
        console.log("SAME SAME")
        this.upcomingBookings.push(booking);
        return this.upcomingBookings;
      }
      else {
        this.pastBookings.push(booking);
        return this.pastBookings;
      }
    })
  }
}


export default User;
