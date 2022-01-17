class Hotel {
  constructor(hotelRooms, hotelBookings) {
    this.rooms = hotelRooms;
    this.bookings = hotelBookings;
    this.availableRooms;
    this.unavailableRooms = [];
  }
  getRoomInfo(booking) {
    return this.rooms.find(room => room.number === booking.roomNumber);
  }
  findUnavailableRooms(date, bookings) {
    this.unavailableRooms = this.bookings.filter(booking => booking.date === date);
  }
  findAvailableRooms(date) {
  // this.availableRooms = null;
  let bookedRmNums= this.unavailableRooms.map(booking => booking.roomNumber)
    let unBookedRms = this.rooms.reduce((acc, room) => {
      if(!bookedRmNums.includes(room.number)) {
        acc.push(room)
      }
      return acc;
    },[])
    this.availableRooms = unBookedRms;
  }
  findRoomsByType(type) {
    let openRooms = this.findAvailableRooms(date);
    return openRooms.filter(room => {
      return room.roomType === type;
    });
  }
}


//Sort out bookedRooms
//Access the date through the calendar/
//Picked date === parameter;
//iterate through bookings.
//if booking.date !== date;
  //return booking.roomNumer;

//findAvailableRooms()
//Loop through findBookedRooms() AND roomData;
//Return the room numbers that are not booked;

//findRoomsByType;
//type== paramater of user.input;
// filter through availableRooms output;
// if room.roomType === input type, return as filter;


export default Hotel;
