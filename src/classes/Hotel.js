class Hotel {
  constructor(hotelRooms, hotelBookings) {
    this.rooms = hotelRooms;
    this.bookings = hotelBookings;
    this.availableRooms = [];
  }
  getUserBookings(user) {
    return this.bookings.filter(booking => user.id === booking.userID);
  }
  getRoomInfo(booking) {
    return this.rooms.find(room => room.number === booking.roomNumber);
  }
};


export default Hotel;



//getRoomInfo for bookings;
//match booking.roomNumber to room.numer;
//
