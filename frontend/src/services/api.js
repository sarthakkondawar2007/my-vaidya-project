const BASE_URL = 'http://localhost:5005/api';

/**
 * Send symptoms to the backend to get a triage analysis.
 * @param {string} symptoms 
 * @returns {Promise<object>}
 */
export async function triageSymptoms(symptoms) {
  try {
    const response = await fetch(`${BASE_URL}/triage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symptoms }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Triage request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error (triageSymptoms):', error.message);
    throw error;
  }
}

/**
 * Fetch available healthcare providers filtered by specialty.
 * @param {string} specialty 
 * @returns {Promise<Array>}
 */
export async function fetchProviders(specialty) {
  try {
    const response = await fetch(`${BASE_URL}/providers?specialty=${encodeURIComponent(specialty)}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to fetch providers with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error (fetchProviders):', error.message);
    throw error;
  }
}

/**
 * Create a new appointment booking.
 * @param {object} bookingData 
 * @returns {Promise<object>}
 */
export async function createBooking(bookingData) {
  try {
    const response = await fetch(`${BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Booking request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error (createBooking):', error.message);
    throw error;
  }
}
