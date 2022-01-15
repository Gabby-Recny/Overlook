import { expect } from 'chai';
import sampleCustomers from '../src/data/sampleCustomers.js';
import User from '../src/classes/User.js';
import Booking from '../src/classes/Booking.js';
import sampleBookings from '../src/data/sampleBookings.js';
import Hotel from '../src/classes/Hotel.js';
import Room from '../src/classes/Room.js';
import sampleRooms from '../src/data/sampleRooms.js';

describe('Hotel', () => {
  let booking1, booking2, booking3, room1, room2, user1, user2, hotel;
  beforeEach(() => {
    room1 = new Room(sampleRooms[0]);
    room2 = new Room(sampleRooms[1]);
    booking1 = new Booking(sampleBookings[0]);
    booking2 = new Booking(sampleBookings[1]);
    booking3 = new Booking(sampleBookings[2]);
    user1 = new User(sampleCustomers[0]);
    user2 = new User(sampleCustomers[1]);
    hotel = new Hotel(sampleRooms, sampleBookings);
  })
  it('Should be a function', () => {
    expect(Hotel).to.be.a('function');
  })
  it('Should be an instance of Hotel', () => {
      expect(hotel).to.be.an.instanceof(Hotel);
  })
  it('Should have access to all of the rooms', () => {
    expect(hotel.rooms).to.equal(sampleRooms);
  })
  it('Should have access to booking info', () => {
    expect(hotel.bookings).to.equal(sampleBookings);
  })
  it('Should have a list of available rooms', () => {
    expect(hotel.availableRooms).to.deep.equal([]);
  })
});
