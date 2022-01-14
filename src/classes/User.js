class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pastBookings = [];
    this.upcomingBookings = [];
    this.totalSpent = 0;
  }
}

export default User;
