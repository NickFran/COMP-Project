class User {
  constructor(name, email, password, accessLevel, lastPunchIn) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.accessLevel = accessLevel;
    this.lastPunchIn = lastPunchIn;
  }

  displayInfo() {
    console.log(`Name: ${this.name}`);
    console.log(`Email: ${this.email}`);
    console.log(`Access Level: ${this.accessLevel}`);
    console.log(`Last Punch-in: ${this.lastPunchIn}`);
  }
}

// Example usage
//const user1 = new User(
//  "Alice Johnson",
//  "alice.johnson@example.com",
//  "securePassword123",
//  "Admin",
//  "2025-10-30T09:00:00"
//);

//user1.displayInfo();


export const User = User;