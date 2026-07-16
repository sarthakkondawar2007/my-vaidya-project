import { supabase } from '../config/supabase.js';

// Dummy Doctors Data for local fallback
const dummyProviders = [
  // General Physician
  {
    id: 'gp1',
    name: 'Dr. Leonard McCoy',
    specialty: 'General Physician',
    rating: 4.8,
    experience: '25 years',
    location: 'Enterprise Medical Bay',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
    slots: ['Today at 2:00 PM', 'Today at 4:30 PM', 'Tomorrow at 9:00 AM'],
    bio: 'Old-school physician. Feisty and dislikes transporter beams, but holds supreme diagnostic expertise.'
  },
  {
    id: 'gp2',
    name: 'Dr. Meredith Grey',
    specialty: 'General Physician',
    rating: 4.9,
    experience: '18 years',
    location: 'Grey Sloan Memorial',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
    slots: ['Today at 3:00 PM', 'Tomorrow at 10:30 AM', 'Tomorrow at 4:00 PM'],
    bio: 'Highly experienced in general medicine and surgical care routing. Dedicated to patient advocacy.'
  },
  // Pediatrician
  {
    id: 'ped1',
    name: 'Dr. Perry Cox',
    specialty: 'Pediatrician',
    rating: 4.7,
    experience: '22 years',
    location: 'Sacred Heart Clinic',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80',
    slots: ['Today at 3:15 PM', 'Tomorrow at 10:00 AM', 'Tomorrow at 1:30 PM'],
    bio: 'Sarcastic mentor and tough-love pediatrician. Extremely protective of infant and child safety.'
  },
  {
    id: 'ped2',
    name: 'Dr. John Dorian',
    specialty: 'Pediatrician',
    rating: 4.8,
    experience: '10 years',
    location: 'Sacred Heart Clinic',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=300&q=80',
    slots: ['Today at 4:00 PM', 'Tomorrow at 9:00 AM', 'Tomorrow at 11:30 AM'],
    bio: 'Warm, empathetic, and daydream-prone pediatrician. Loves high-fives and toddler development checks.'
  },
  // Dermatologist
  {
    id: 'derm1',
    name: 'Dr. Jackson Avery',
    specialty: 'Dermatologist',
    rating: 4.9,
    experience: '12 years',
    location: 'Avery Aesthetic Plazas',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80',
    slots: ['Tomorrow at 11:30 AM', 'Tomorrow at 2:00 PM', 'Friday at 10:00 AM'],
    bio: 'Board-certified specialist in clinical dermatology, skin restoration, and complex skin ailments.'
  },
  // Orthopedist
  {
    id: 'ortho1',
    name: 'Dr. Alan Grant',
    specialty: 'Orthopedist',
    rating: 4.6,
    experience: '18 years',
    location: 'Jurassic Sports Medicine',
    image: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&w=300&q=80',
    slots: ['Today at 5:00 PM', 'Friday at 10:30 AM', 'Friday at 3:30 PM'],
    bio: 'Specialist in bone structures, fracture setting, and joint pain recovery.'
  },
  // ENT Specialist
  {
    id: 'ent1',
    name: 'Dr. Chloe Patel',
    specialty: 'ENT Specialist',
    rating: 4.9,
    experience: '9 years',
    location: 'Sinus & Ear Center',
    image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=300&q=80',
    slots: ['Today at 4:00 PM', 'Tomorrow at 3:30 PM', 'Friday at 11:00 AM'],
    bio: 'Focused on advanced sinus issues, allergy therapy, tonsil concerns, and auditory diagnostic checks.'
  },
  // Neurologist
  {
    id: 'neuro1',
    name: 'Dr. Gregory House',
    specialty: 'Neurologist',
    rating: 4.9,
    experience: '28 years',
    location: 'Princeton-Plainsboro Clinic',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
    slots: ['Tomorrow at 1:00 PM', 'Friday at 9:00 AM', 'Friday at 4:00 PM'],
    bio: 'Misanthropic, sarcastic, but absolute diagnostics genius. Specializes in solving medical riddles.'
  },
  {
    id: 'neuro2',
    name: 'Dr. Stephen Strange',
    specialty: 'Neurologist',
    rating: 4.8,
    experience: '20 years',
    location: 'Kamartaj Spine Plazas',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
    slots: ['Today at 4:30 PM', 'Tomorrow at 9:30 AM', 'Friday at 2:00 PM'],
    bio: 'Former elite neurosurgeon. Specializes in advanced motor nerve diagnostics and neurological anomalies.'
  },
  // Cardiologist
  {
    id: 'cardio1',
    name: 'Dr. Cristina Yang',
    specialty: 'Cardiologist',
    rating: 4.9,
    experience: '15 years',
    location: 'Cardio-Thoracic Wing',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=300&q=80',
    slots: ['Today at 3:30 PM', 'Tomorrow at 10:30 AM', 'Tomorrow at 2:00 PM'],
    bio: 'Relentlessly competitive and exceptionally skilled. Specializes in coronary heart anomalies and surgery routing.'
  },
  // Pulmonologist
  {
    id: 'pulm1',
    name: 'Dr. Allison Cameron',
    specialty: 'Pulmonologist',
    rating: 4.7,
    experience: '13 years',
    location: 'Princeton Diagnostics Center',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=300&q=80',
    slots: ['Today at 2:30 PM', 'Friday at 2:00 PM', 'Friday at 5:00 PM'],
    bio: 'Specialist in lung diseases, chronic asthma care, respiratory failure, and immunological breathing cases.'
  },
  // Emergency Medicine
  {
    id: 'er1',
    name: 'City General Emergency Room',
    specialty: 'Emergency Medicine',
    rating: 4.8,
    experience: '24/7 Service',
    location: 'City General Hospital (Main Wing)',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=300&q=80',
    slots: ['Immediate Walk-In (No Booking Needed)', 'Ambulance dispatch available'],
    bio: 'Trauma level 1 emergency department, fully staffed with trauma specialists and acute care physicians.'
  },
  {
    id: 'er2',
    name: 'St. Mary Urgent Care & ER',
    specialty: 'Emergency Medicine',
    rating: 4.5,
    experience: '24/7 Service',
    location: 'St. Mary Hospital complex',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=300&q=80',
    slots: ['Immediate Walk-In (No Booking Needed)', 'Ambulance dispatch available'],
    bio: 'Immediate acute care, pediatric emergency support, and minor trauma triage.'
  }
];

// Local Bookings store
const dummyBookings = [];

/**
 * Get doctors filtered by specialty.
 * @param {string} specialty 
 * @returns {Promise<Array>}
 */
export async function getProvidersBySpecialty(specialty) {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .eq('specialty', specialty);

      if (error) throw error;
      // If table exists but is empty, fallback to local so user doesn't get an empty screen
      if (data && data.length > 0) return data;
    } catch (err) {
      console.error('Supabase getProviders failed, falling back to Mock DB:', err.message);
    }
  }

  // Fallback to local filtering
  // If Emergency, return Emergency Medicine providers. Otherwise match exact specialty or return General Physicians as default
  const filtered = dummyProviders.filter(
    p => p.specialty.toLowerCase() === specialty.toLowerCase()
  );

  if (filtered.length > 0) {
    return filtered;
  }

  // Default fallback if no match
  return dummyProviders.filter(p => p.specialty === 'General Physician');
}

/**
 * Create a new appointment booking.
 * @param {object} bookingData 
 * @returns {Promise<object>}
 */
export async function createBooking(bookingData) {
  const { providerId, providerName, specialty, dateSlot, userPhone, userName, symptomSummary } = bookingData;
  
  if (!providerId || !dateSlot || !userName || !userPhone) {
    throw new Error('Missing required booking details (provider, time slot, name, or phone).');
  }

  const bookingRecord = {
    id: `bk-${Math.floor(100000 + Math.random() * 900000)}`,
    provider_id: providerId,
    provider_name: providerName,
    specialty: specialty,
    date_slot: dateSlot,
    user_name: userName,
    user_phone: userPhone,
    symptom_summary: symptomSummary || '',
    created_at: new Date().toISOString(),
    status: 'Confirmed'
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingRecord])
        .select();

      if (error) throw error;
      if (data && data.length > 0) return data[0];
    } catch (err) {
      console.error('Supabase booking creation failed, falling back to Mock DB:', err.message);
    }
  }

  // Fallback to memory
  dummyBookings.push(bookingRecord);
  console.log('📝 Saved booking to Mock DB:', bookingRecord);
  return bookingRecord;
}
