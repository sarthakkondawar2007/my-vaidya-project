import { createBooking } from '../services/dbService.js';

export async function handleCreateBooking(req, res) {
  try {
    const { providerId, providerName, specialty, dateSlot, userName, userPhone, symptomSummary } = req.body;

    if (!providerId || !providerName || !specialty || !dateSlot || !userName || !userPhone) {
      return res.status(400).json({ error: 'Missing required booking fields.' });
    }

    const booking = await createBooking({
      providerId,
      providerName,
      specialty,
      dateSlot,
      userName,
      userPhone,
      symptomSummary
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error('Booking controller error:', error.message);
    res.status(500).json({ error: error.message || 'An error occurred while creating your booking.' });
  }
}
