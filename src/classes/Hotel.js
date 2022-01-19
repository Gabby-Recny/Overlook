import selectedDate from '../domUpdates.js';

class Hotel {
  constructor(hotelRooms, hotelBookings) {
    this.rooms = hotelRooms;
    this.bookings = hotelBookings;
    this.availableRooms;
    this.unavailableRooms;
    this.typeOfRooms = [];
  }
  getRoomInfo(booking) {
    return this.rooms.find(room =>  {
      if (room.number === booking.roomNumber) {
        return room;
      } else {
        return `Sorry, we were unable to meet your criterea. Please try and different date or room preferance.`;
      }
    })
  }

  findUnavailableRooms(selectedDate, bookings) {
    let newDate = selectedDate.split('-').join('/')
    return this.unavailableRooms = this.bookings.filter(booking => {
      return booking.date === newDate
    });
  }
  findAvailableRooms(date, bookings) {
    this.findUnavailableRooms(date, bookings);
    let bookedRmNums = this.unavailableRooms.map(booking => booking.roomNumber);
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
