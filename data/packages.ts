export type Package = {
  id:          string
  name:        string
  tagline:     string
  startingAt:  string
  features:    string[]
  highlighted: boolean
  whatsappMsg: string
}

export const packages: Package[] = [
  {
    id:         'driveway',
    name:       'Premium Interlock Driveway Installation',
    tagline:    'Engineered for Ottawa winters. Built to outlast.',
    startingAt: 'Contact Us for a Quote',
    highlighted: false,
    features: [
      '16"+ excavation depth to frost line',
      'Geo-textile filter fabric layer',
      'Compacted A-Gravel + HPB leveling bed',
      'Premium Unilock or Permacon paving stones',
      'Mechanical edge restraints',
      'Techniseal polymeric sand — professional grade',
      'Engineered 2% drainage slope',
      'Post-season integrity inspection (Year 1)',
    ],
    whatsappMsg: "Hi! I'm interested in the Premium Interlock Driveway Installation package. Can we schedule a free site assessment?",
  },
  {
    id:          'patio',
    name:        'Custom Interlock Patio & Outdoor Living',
    tagline:     'Where Ottawa families live May to October.',
    startingAt:  'Contact Us for a Quote',
    highlighted: true,
    features: [
      'Custom interlock patio design (digital layout)',
      'Natural stone or premium paver selection',
      'Integrated retaining wall(s) + drainage core',
      'Staircase & steps with non-slip finish',
      'Pathway from home entry to patio',
      'Optional: fire pit surround or outdoor kitchen base',
      'Full polymeric sand joint sealing',
      'Drone documentation of completed project',
    ],
    whatsappMsg: "Hi! I'm interested in the Custom Interlock Patio & Outdoor Living package. Can we schedule a free site assessment?",
  },
  {
    id:          'estate',
    name:        'Complete Hardscaping & Retaining Walls',
    tagline:     'Full front-to-back hardscape for the Ottawa homeowner who wants it all.',
    startingAt:  'Contact Us for a Quote',
    highlighted: false,
    features: [
      'Full property hardscape design consultation',
      'Front yard interlock driveway + walkway system',
      'Backyard patio, walls & recreational space',
      'Pool or spa surround (if applicable)',
      'Full drainage & grading remediation',
      'River rock garden accents & landscaping',
      'Deck or fence integration coordination',
      'Professional drone footage — before & after aerial',
      '2-year workmanship warranty',
    ],
    whatsappMsg: "Hi! I'm interested in the Complete Hardscaping & Retaining Walls package. Can we schedule a free site assessment?",
  },
]
