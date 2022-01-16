class Hotel {
  constructor(hotelRooms, hotelBookings) {
    this.rooms = hotelRooms;
    this.bookings = hotelBookings;
    this.availableRooms = [];
  }
  getRoomInfo(booking) {
    return this.rooms.find(room => room.number === booking.roomNumber);
  }
  checkAvailableRooms() {
    
  }
};


export default Hotel;
