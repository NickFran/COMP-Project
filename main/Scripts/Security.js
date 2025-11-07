import { User } from './Objects.js';


let user1 = new User(
  "Alice Johnson",
  "alice.johnson@example.com",
  "securePassword123",
  "Admin",
  "2025-10-30T09:00:00"
);

user1.displayInfo();