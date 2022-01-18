import { expect } from 'chai';
import Room from '../src/classes/Room.js';
import sampleRooms from '../src/data/sampleRooms.js';

describe('Room', () => {
  let room1, room2;
  beforeEach(() => {
    room1 = new Room(sampleRooms[0]);
    room2 = new Room(sampleRooms[1]);
  })
  it('Should be a function', () => {
    expect(Room).to.be.a('function');
  });
  it('Should be an instance of Room', () => {
    expect(room1).to.be.an.instanceof(Room);
    expect(room2).to.be.an.instanceof(Room);
  })
  it('Should have a room number', () => {
    expect(room1.number).to.equal(1);
    expect(room2.number).to.equal(2);
  })
  it('Should have a room type', () => {
    expect(room1.roomType).to.equal('residential suite');
    expect(room2.roomType).to.equal('suite');
  })
  it('Should check if there is a bidet', () => {
    expect(room1.bidet).to.equal(true);
    expect(room2.bidet).to.equal(false);
  })
  it('Should tell us the bed size', () => {
    expect(room1.bedSize).to.equal('queen');
    expect(room2.bedSize).to.equal('full');
  })
  it('Should count the number of beds', () => {
    expect(room1.numBeds).to.equal(1);
    expect(room2.numBeds).to.equal(2);
  })
  it('Should have a price per night', () => {
    expect(room1.costPerNight).to.equal(358.4);
    expect(room2.costPerNight).to.equal(477.38);
  })
});
