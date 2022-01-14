import { expect } from 'chai';
import User from '../src/classes/User.js';
import sampleCustomers from '../src/data/sampleCustomers.js';

describe('User', () => {
  let user1, user2;

  beforeEach(() => {
    user1 = new User(customerData[0]);
    user2 = new User(customerData[1]);
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
});
