const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // <-- parse JSON bodies

// Simple request logger to help debug client requests
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  if (req.method !== 'GET') console.log('  body:', req.body);
  next();
});

const db = require('./Database/sq.js'); // uses your exported functions
// server-side password policy checker (use a small server-safe module)
const { checkPasswordStrength } = require('./Scripts/password_policy');

app.post('/api/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Missing email' });
    const id = await db.getUserIdByEmail(email);
    res.json({ exists: !!id, id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

      // Enforce password policy on the server and return detailed reasons when it fails
      const policy = checkPasswordStrength(password);
      if (!policy.valid) {
        return res.status(400).json({ error: 'Password does not meet security policy', reasons: policy.reasons, results: policy.results });
      }

    // Server-side duplication check (always do this server-side too)
    const existing = await db.getUserIdByEmail(email);
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    // IMPORTANT: hash the password before storing (bcrypt). Example commented:
    // const bcrypt = require('bcrypt');
    // const hashed = await bcrypt.hash(password, 10);

    const id = await db.createUser(firstName || '', lastName || '', email, password /*or hashed*/, 1);
    res.json({ success: true, id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });

    // Fetch user by email
    const user = await db.getUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // For now passwords are stored plaintext in the DB (see warnings in server.js).
    // Compare directly; when you add bcrypt, replace this with bcrypt.compare.
    if (user.password !== password) return res.status(401).json({ error: 'Invalid credentials' });

    // Successful login; return minimal user info
    res.json({ success: true, id: user.id, first_name: user.first_name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// existing static and default route remain
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
