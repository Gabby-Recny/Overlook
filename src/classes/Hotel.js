class Hotel {
  constructor(hotelRooms, hotelBookings) {
    this.rooms = hotelRooms;
    this.bookings = hotelBookings;
    this.availableRooms = [];
  }
  getRoomInfo(booking) {
    return this.rooms.find(room => room.number === booking.roomNumber);
  }
  // calculateTotalSpent(user) {
  //   console.log(this.getRoomInfo(user.bookings[0]))
  //   this.bookings.reduce((acc, booking) => {
  //     let roomInfo = hotel.getRoomInfo(booking);
  //     console.log(hotel)
  //     return acc;
  //   }, 0);
  // }
};


export default Hotel;
