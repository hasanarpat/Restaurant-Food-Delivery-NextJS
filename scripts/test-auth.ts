// Node 18+ has native fetch
const BASE_URL = 'http://localhost:3000/api/v1/auth';

async function testAuth() {
  console.log('🚀 Starting Auth API Test...');

  const uniqueEmail = `test_${Date.now()}@example.com`;

  // 1. Register
  console.log('\n1️⃣ Testing Registration...');
  const regRes = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Test User',
      email: uniqueEmail,
      password: 'StrongPassword123!',
      phone: '5551234567',
    }),
  });

  const regData = await regRes.json();
  console.log('Status:', regRes.status);
  console.log('Response:', JSON.stringify(regData, null, 2));

  const cookie = regRes.headers.get('set-cookie');
  if (cookie && cookie.includes('token=')) {
    console.log('✅ Cookie received correctly on Register');
  } else {
    console.error('❌ Cookie Missing on Register!');
  }

  // 2. Login
  console.log('\n2️⃣ Testing Login...');
  const loginRes = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: uniqueEmail,
      password: 'StrongPassword123!',
    }),
  });

  const loginData = await loginRes.json();
  console.log('Status:', loginRes.status);
  console.log('Response:', JSON.stringify(loginData, null, 2));

  const loginCookie = loginRes.headers.get('set-cookie');
  if (loginCookie && loginCookie.includes('token=')) {
    console.log('✅ Cookie received correctly on Login');
  } else {
    console.error('❌ Cookie Missing on Login!');
  }
}

testAuth().catch(console.error);
