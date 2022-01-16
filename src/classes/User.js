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
  sortBookings() {
    this.getUserBookings(bookingData);
    this.bookings.forEach(booking => {
      if (booking.date > 2021/31/12) {
        this.upcomingBookings.push(booking)
        return this.upcomingBookings;
      }
      else {
        this.pastBookings.push(booking)
        return this.pastBookings
      }
    })
  }
}


export default User;
