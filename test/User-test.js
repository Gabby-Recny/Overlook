import { expect } from 'chai';
import sampleCustomers from '../src/data/sampleCustomers.js';
import User from '../src/classes/User.js';
import Booking from '../src/classes/Booking.js';
import sampleBookings from '../src/data/sampleBookings.js';
import Hotel from '../src/classes/Hotel.js';
import Room from '../src/classes/Room.js';
import sampleRooms from '../src/data/sampleRooms.js';

describe('User', () => {
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
  });
  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });
  it('Should be an instance of user', () => {
    expect(user1).to.be.an.instanceof(User);
    expect(user2).to.be.an.instanceof(User);
  })
  it('Should have an id', () => {
    expect(user1.id).to.equal(1);
    expect(user2.id).to.equal(2);
  })
  it('Should have a name', () => {
    expect(user1.name).to.equal("Leatha Ullrich");
    expect(user2.name).to.equal("Rocio Schuster");
  })
  it('Should have a way to store bookings', () => {
    expect(user1.bookings).to.deep.equal([]);
    expect(user2.bookings).to.deep.equal([]);

  })
  it('Should be able to have past bookings', () => {
    expect(user1.pastBookings).to.deep.equal([]);
    expect(user2.pastBookings).to.deep.equal([]);
  })
  it('Should be able to book a room for the future', () => {
    expect(user1.upcomingBookings).to.deep.equal([]);
    expect(user2.upcomingBookings).to.deep.equal([]);
  })
  it('Should start off without any money spent', () => {
    expect(user1.totalSpent).to.equal(0);
    expect(user2.totalSpent).to.equal(0);
  })
  it('Should access the user bookings', () => {
    user1.getUserBookings(sampleBookings)
    expect(user1.bookings.length).to.equal(2);
  })
  it('Should calculate total amount the user has spent', () => {
    user1.getUserBookings(sampleBookings);
    user1.calculateTotalSpent(sampleBookings, sampleRooms);
    expect(user1.totalSpent).to.equal(920.58);
  })
});
