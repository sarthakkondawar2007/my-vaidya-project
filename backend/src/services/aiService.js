import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.ANTHROPIC_API_KEY;
let anthropic = null;

if (apiKey) {
  try {
    anthropic = new Anthropic({ apiKey });
    console.log('✅ Anthropic Claude API integration active.');
  } catch (error) {
    console.error('❌ Failed to initialize Anthropic client:', error.message);
  }
} else {
  console.warn('⚠️ ANTHROPIC_API_KEY not found in environment. Falling back to local clinical rules engine.');
}

/**
 * Perform symptom triage.
 * @param {string} symptomText 
 * @returns {Promise<{urgency: string, urgencyTitle: string, specialty: string, analysis: string, keySymptoms: string[], advice: string[]}>}
 */
export async function triageSymptoms(symptomText) {
  if (!symptomText || symptomText.trim().length < 5) {
    throw new Error('Symptom description is too short to process.');
  }

  if (anthropic) {
    try {
      const response = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        temperature: 0,
        system: `You are an expert clinical triage assistant. Analyze the user's symptoms and classify them into one of four color-coded urgency levels:
- Red: Emergency (Life-threatening, call 911 / go to ER immediately)
- Orange: Urgent (High priority, see a doctor within 12-24 hours)
- Yellow: Routine (Standard care, schedule a regular doctor appointment)
- Green: Self-Care (Low risk, treat at home, monitor closely)

Identify the most relevant medical specialty from these standard options:
"General Physician", "Pediatrician", "Dermatologist", "Orthopedist", "ENT Specialist", "Neurologist", "Cardiologist", "Pulmonologist", "Emergency Medicine".

Format your response EXACTLY as a JSON object with this shape:
{
  "urgency": "Red" | "Orange" | "Yellow" | "Green",
  "urgencyTitle": "Emergency" | "Urgent" | "Routine" | "Self-Care",
  "specialty": "Specialty Name",
  "analysis": "Clinical reasoning for the urgency bucket (1-2 sentences)",
  "keySymptoms": ["symptom1", "symptom2", ...],
  "advice": ["Action item 1", "Action item 2", ...]
}
Do not return any markdown formatting outside of the JSON block.`,
        messages: [{ role: 'user', content: symptomText }]
      });

      const rawText = response.content[0].text;
      // Parse the JSON output
      const jsonStart = rawText.indexOf('{');
      const jsonEnd = rawText.lastIndexOf('}') + 1;
      if (jsonStart !== -1 && jsonEnd !== -1) {
        const jsonString = rawText.slice(jsonStart, jsonEnd);
        return JSON.parse(jsonString);
      }
      throw new Error('Failed to parse structured JSON from Claude response.');
    } catch (error) {
      console.error('AI Triage API failed, calling local clinical rules fallback:', error.message);
      // Fallback if API fails mid-execution
    }
  }

  // Local Triage Rules Fallback
  return localTriageFallback(symptomText);
}

function localTriageFallback(symptomText) {
  const text = symptomText.toLowerCase();
  
  // Define categories and keywords
  const emergencyKeywords = [
    'chest pain', 'heart attack', 'breathing difficulty', 'shortness of breath', 
    'difficulty breathing', 'unable to breathe', 'unconscious', 'passed out', 
    'stroke', 'paralysis', 'slurred speech', 'heavy bleeding', 'poisoning', 
    'choking', 'coughing blood', 'severe allergic reaction', 'anaphylaxis', 
    'severe chest tightness', 'bluish lips'
  ];

  const urgentKeywords = [
    'high fever', 'burning up', 'severe pain', 'excruciating', 'fracture', 
    'broken bone', 'deep cut', 'gash', 'dehydration', 'severe vomiting', 
    'kidney stone', 'urinary infection', 'uti', 'severe headache', 
    'migraine', 'asthma', 'wheezing', 'cannot stop vomiting'
  ];

  const routineKeywords = [
    'cough', 'cold', 'mild fever', 'sore throat', 'runny nose', 'rash', 
    'skin', 'itchy', 'acne', 'eczema', 'joint pain', 'back pain', 
    'muscle ache', 'stomach ache', 'diarrhea', 'ear pain', 'earache', 
    'pink eye', 'allergy', 'congestion', 'flu'
  ];

  // Check matching symptoms
  const matchedEmergency = emergencyKeywords.filter(kw => text.includes(kw));
  const matchedUrgent = urgentKeywords.filter(kw => text.includes(kw));
  const matchedRoutine = routineKeywords.filter(kw => text.includes(kw));

  // Determine specialty
  let specialty = 'General Physician';
  if (text.includes('child') || text.includes('baby') || text.includes('kid') || text.includes('toddler') || text.includes('infant')) {
    specialty = 'Pediatrician';
  } else if (text.includes('chest') || text.includes('heart') || text.includes('cardiac') || text.includes('palpitations')) {
    specialty = matchedEmergency.length > 0 ? 'Emergency Medicine' : 'Cardiologist';
  } else if (text.includes('breath') || text.includes('lung') || text.includes('cough') || text.includes('asthma')) {
    specialty = text.includes('severe') ? 'Emergency Medicine' : 'Pulmonologist';
  } else if (text.includes('rash') || text.includes('skin') || text.includes('acne') || text.includes('mole') || text.includes('eczema') || text.includes('itch')) {
    specialty = 'Dermatologist';
  } else if (text.includes('joint') || text.includes('bone') || text.includes('fracture') || text.includes('back pain') || text.includes('knee') || text.includes('spine')) {
    specialty = 'Orthopedist';
  } else if (text.includes('ear') || text.includes('throat') || text.includes('nose') || text.includes('sinus') || text.includes('tonsil')) {
    specialty = 'ENT Specialist';
  } else if (text.includes('headache') || text.includes('migraine') || text.includes('dizzy') || text.includes('numb') || text.includes('seizure')) {
    specialty = 'Neurologist';
  }

  // Urgency logic
  if (matchedEmergency.length > 0) {
    return {
      urgency: 'Red',
      urgencyTitle: 'Emergency',
      specialty: 'Emergency Medicine',
      analysis: 'Your symptoms indicate a potential life-threatening emergency. Immediate medical intervention is critical.',
      keySymptoms: matchedEmergency.length > 0 ? matchedEmergency : ['potential severe distress'],
      advice: [
        'Call emergency services (e.g. 911 / 112) immediately.',
        'Do not drive yourself to the hospital; wait for paramedics.',
        'Rest in a comfortable position and keep breathing deeply.'
      ]
    };
  }

  if (matchedUrgent.length > 0 || text.includes('severe') || text.includes('sudden')) {
    return {
      urgency: 'Orange',
      urgencyTitle: 'Urgent',
      specialty: specialty,
      analysis: 'Your symptoms require prompt professional evaluation within the next 12-24 hours to prevent complications.',
      keySymptoms: matchedUrgent.length > 0 ? matchedUrgent : ['severe discomfort'],
      advice: [
        'Visit an urgent care center or contact your physician for a same-day appointment.',
        'Monitor your temperature and rest.',
        'Avoid strenuous physical activity until evaluated.'
      ]
    };
  }

  if (matchedRoutine.length > 0 || text.includes('days') || text.includes('mild')) {
    return {
      urgency: 'Yellow',
      urgencyTitle: 'Routine',
      specialty: specialty,
      analysis: 'Your symptoms appear non-urgent but should be evaluated by a healthcare professional in a standard appointment slot.',
      keySymptoms: matchedRoutine.length > 0 ? matchedRoutine : ['general symptoms'],
      advice: [
        'Schedule a routine appointment with a specialist or general practitioner.',
        'Stay well-hydrated and get adequate rest.',
        'Keep a log of symptoms, noting triggers or changes in severity.'
      ]
    };
  }

  // Default: Green / Self-Care
  return {
    urgency: 'Green',
    urgencyTitle: 'Self-Care',
    specialty: 'General Physician',
    analysis: 'Your symptoms suggest a low-risk condition suitable for home monitoring and self-care.',
    keySymptoms: ['mild or general symptoms'],
    advice: [
      'Get plenty of rest and drink fluids.',
      'Use over-the-counter remedies as appropriate for comfort.',
      'Seek medical advice if symptoms worsen or persist past a few days.'
    ]
  };
}
