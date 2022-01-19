const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");

class User {
  constructor(user, bookingData, roomData) {
    this.id = user.id;
    this.name = user.name;
    this.bookings = [];
    this.pastBookings = [];
    this.upcomingBookings = [];
    this.totalSpent = 0;
  }
  getUserBookings(bookingData) {
    bookingData.forEach(booking => {
      if (this.id === booking.userID) {
        this.bookings.push(booking)
      }
    })
  }
  calculateTotalSpent(bookingData, roomData) {
    this.getUserBookings(bookingData)
    const totalAmt = this.bookings.reduce((acc, booking) => {
      let findRoom = roomData.filter(room => {
        if (room.number === booking.roomNumber) {
          acc += room.costPerNight
        }
      })
      return acc;
    }, 0);
    this.totalSpent = Math.round(totalAmt * 100) / 100;
    return Math.round(totalAmt * 100) / 100;
  }

  getPastBookings(currentDate, bookingData) {
    this.bookings.forEach(booking => {
      if (currentDate > booking.date) {
        this.pastBookings.push(booking);
      }
    })
    return this.pastBookings;
  }

  getUpcomingBookings(currentDate, bookingData) {
    this.bookings.forEach(booking => {
      if ((currentDate === booking.date) || (currentDate < booking.date)) {
        this.upcomingBookings.push(booking);
      }
    })
    return this.upcomingBookings;
  }

  sortDescendingBookings(bookings) {
    return bookings.sort((a, b) => {
      return dayjs(b.date) - dayjs(a.date)
    })
  }

  sortAscendingBookings(bookings) {
    return bookings.sort((a, b) => {
      return dayjs(a.date) - dayjs(b.date)
    })
  }
}


export default User;
