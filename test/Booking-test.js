import { expect } from 'chai';
import Booking from '../src/classes/Booking.js';
import sampleBookings from '../src/data/sampleBookings.js';

describe('Booking', () => {
  let booking1, booking2, booking3;
  beforeEach(() => {
    booking1 = new Booking(sampleBookings[0]);
    booking2 = new Booking(sampleBookings[1]);
    booking3 = new Booking(sampleBookings[2]);
  })
  it('Should be a function', () => {
    expect(Booking).to.be.a('function');
  })
  it('Should be an instance of Booking', () => {
    expect(booking1).to.be.an.instanceof(Booking);
    expect(booking2).to.be.an.instanceof(Booking);
    expect(booking3).to.be.an.instanceof(Booking);
  })
  it('Should have an id', () => {
    expect(booking1.id).to.equal("5fwrgu4i7k55hl6sz");
    expect(booking2.id).to.equal("5fwrgu4i7k55hl6t5");
    expect(booking3.id).to.equal("5fwrgu4i7k55hl6t6");
  })
  it('Should be associated with a customer', () => {
    expect(booking1.userID).to.equal(9);
    expect(booking2.userID).to.equal(43);
    expect(booking3.userID).to.equal(13);
  })
  it('Should have a check-in date', () => {
    expect(booking1.date).to.equal("2022/04/22");
    expect(booking2.date).to.equal("2022/01/24");
    expect(booking3.date).to.equal("2022/01/10");
  })
  it('Should have a room number', () => {
    expect(booking1.roomNumber).to.equal(15);
    expect(booking2.roomNumber).to.equal(24);
    expect(booking3.roomNumber).to.equal(12);
  })
  it('Should start with no room service charges', () => {
    expect(booking1.roomServiceCharges).to.deep.equal([]);
    expect(booking2.roomServiceCharges).to.deep.equal([]);
  })
});
