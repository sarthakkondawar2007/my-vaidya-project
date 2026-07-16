import { triageSymptoms } from '../services/aiService.js';

export async function handleTriage(req, res) {
  try {
    const { symptoms } = req.body;

    if (!symptoms || typeof symptoms !== 'string' || symptoms.trim().length < 5) {
      return res.status(400).json({ 
        error: 'Invalid input. Please provide a clear symptom description (minimum 5 characters).' 
      });
    }

    const triageResult = await triageSymptoms(symptoms);
    res.json(triageResult);
  } catch (error) {
    console.error('Triage handler error:', error.message);
    res.status(500).json({ error: 'An error occurred during symptom triage. Please try again.' });
  }
}
