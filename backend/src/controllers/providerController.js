import { getProvidersBySpecialty } from '../services/dbService.js';

export async function handleGetProviders(req, res) {
  try {
    const { specialty } = req.query;

    if (!specialty || typeof specialty !== 'string') {
      return res.status(400).json({ error: 'Specialty parameter is required.' });
    }

    const providers = await getProvidersBySpecialty(specialty);
    res.json(providers);
  } catch (error) {
    console.error('Provider controller error:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching providers.' });
  }
}
