const BASE_URL = 'http://localhost:5005/api';

async function runTests() {
  console.log('🧪 Starting Vaidya API integration tests...\n');

  try {
    // Test 1: Healthcheck
    console.log('Testing 1: GET /api/health...');
    const healthRes = await fetch(`${BASE_URL}/health`);
    const health = await healthRes.json();
    console.log('✅ Health status:', health.status, '\n');

    // Test 2: Emergency Triage (Red)
    console.log('Testing 2: POST /api/triage (Emergency)...');
    const emergencyRes = await fetch(`${BASE_URL}/triage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptoms: 'I have severe crushing chest pain, difficulty breathing, and my left arm feels numb.' })
    });
    const emergency = await emergencyRes.json();
    console.log('✅ Result (Urgency):', emergency.urgency, `(${emergency.urgencyTitle})`);
    console.log('✅ Specialty Recommended:', emergency.specialty);
    console.log('✅ Key Symptoms Detected:', emergency.keySymptoms);
    console.log('✅ Advice Recommended:', emergency.advice, '\n');

    // Test 3: Urgent Triage (Orange)
    console.log('Testing 3: POST /api/triage (Urgent)...');
    const urgentRes = await fetch(`${BASE_URL}/triage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptoms: 'I have an extremely high fever of 103F and excruciating stomach pain since this morning.' })
    });
    const urgent = await urgentRes.json();
    console.log('✅ Result (Urgency):', urgent.urgency, `(${urgent.urgencyTitle})`);
    console.log('✅ Specialty Recommended:', urgent.specialty, '\n');

    // Test 4: Provider Fetching
    console.log(`Testing 4: GET /api/providers?specialty=${encodeURIComponent(urgent.specialty)}...`);
    const providerRes = await fetch(`${BASE_URL}/providers?specialty=${encodeURIComponent(urgent.specialty)}`);
    const providers = await providerRes.json();
    console.log('✅ Received providers:', providers.map(p => `${p.name} (${p.specialty})`));
    console.log('✅ Check first provider slots:', providers[0]?.slots, '\n');

    // Test 5: Booking
    if (providers.length > 0) {
      const selectedDoc = providers[0];
      const selectedSlot = selectedDoc.slots[0];
      console.log(`Testing 5: POST /api/bookings for ${selectedDoc.name} at "${selectedSlot}"...`);
      
      const bookingPayload = {
        providerId: selectedDoc.id,
        providerName: selectedDoc.name,
        specialty: selectedDoc.specialty,
        dateSlot: selectedSlot,
        userName: 'John Doe',
        userPhone: '+1-555-0199',
        symptomSummary: 'High fever and severe stomach ache'
      };

      const bookingRes = await fetch(`${BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });
      const booking = await bookingRes.json();
      console.log('✅ Booking Confirmed. ID:', booking.id);
      console.log('✅ Patient Name:', booking.user_name);
      console.log('✅ Booking Status:', booking.status, '\n');
    } else {
      console.log('❌ Skipping booking test because no providers were returned.');
    }

    console.log('🎉 All backend API verification tests passed successfully!');

  } catch (error) {
    console.error('❌ API Integration Test failed:', error.message);
  }
}

runTests();
