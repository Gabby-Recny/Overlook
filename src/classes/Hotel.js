class Hotel {
  constructor(hotelRooms, hotelBookings) {
    this.rooms = hotelRooms;
    this.bookings = hotelBookings;
    this.availableRooms;
    this.unavailableRooms = [];
    this.typeOfRooms = [];
  }
  getRoomInfo(booking) {
    return this.rooms.find(room => room.number === booking.roomNumber);
  }
  findUnavailableRooms(date, bookings) {
    this.unavailableRooms = this.bookings.filter(booking => booking.date === date);
  }
  findAvailableRooms(date) {
  this.availableRooms = [];
  let bookedRmNums= this.unavailableRooms.map(booking => booking.roomNumber)
    let unBookedRms = this.rooms.reduce((acc, room) => {
      if(!bookedRmNums.includes(room.number)) {
        acc.push(room);
      }
      return acc;
    }, []);
    this.availableRooms = unBookedRms;
  }
  findRoomsByType(type) {
    let filteredRooms = this.availableRooms.filter(room => room.roomType === type);
    this.typeOfRooms = filteredRooms;
  }
};

export default Hotel;
