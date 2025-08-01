// Framework for adding verses - users can add their own research
export interface VerseSource {
  id: number
  text: string
  theme: string
  emotion: string
  sur: string
  translation?: string
  source?: string // For attribution
  verified?: boolean // For accuracy verification
}

// Sample structure showing how verses should be formatted
// Users should research and add authentic verses following this pattern
export const verseFramework: VerseSource[] = [
  // Sur Kalyan - Divine Love Examples
  {
    id: 1,
    text: "الله واحد لا شريک، هن جو نالو وٺي ڪري",
    theme: "DivineLove",
    emotion: "Peaceful",
    sur: "Sur Kalyan",
    translation: "Allah is One without partner, take His name and remember",
    source: "Shah Jo Risalo - Sur Kalyan",
    verified: true,
  },

  // Framework entries for different Surs - to be expanded with research
  {
    id: 2,
    text: "[Research needed: Add authentic verse from Sur Sarang]",
    theme: "HumanLove",
    emotion: "Joyful",
    sur: "Sur Sarang",
    translation: "[Add English translation]",
    source: "Shah Jo Risalo - Sur Sarang",
    verified: false,
  },

  // Add framework for all 30 Surs mentioned in Shah Jo Risalo:
  // Sur Kalyan, Sur Yaman Kalyan, Sur Bilawal, Sur Sorath, Sur Dhanasri,
  // Sur Sarang, Sur Malkauns, Sur Kedaro, Sur Bhairav, Sur Ramkali,
  // Sur Gujari, Sur Marwa, Sur Husaini, Sur Bhairavi, Sur Todi,
  // Sur Lalit, Sur Kanhra, Sur Kafi, Sur Asawari, Sur Jaijaiwanti,
  // Sur Desi, Sur Sindhi-Bhairavi, Sur Ahir-Bhairav, Sur Basant,
  // Sur Hindol, Sur Dipak, Sur Megh, Sur Bhimpalasi, Sur Puriya, Sur Yaman
]

// Instructions for users to add more verses
export const verseAdditionGuidelines = {
  instructions: `
    To add more authentic verses from Shah Jo Risalo:
    
    1. Research authentic sources of Shah Jo Risalo
    2. Verify verses with multiple scholarly sources
    3. Include proper Sur (musical mode) classification
    4. Add accurate English translations
    5. Categorize by theme and emotion
    6. Respect copyright and provide proper attribution
    
    Themes: DivineLove, HumanLove, Separation, Spirituality, Nature, Wisdom
    Emotions: Peaceful, Joyful, Melancholic, Longing, Contemplative, Ecstatic, Betrayed
    
    Each verse should follow the VerseSource interface structure.
  `,

  suggestedSources: [
    "Academic publications on Shah Jo Risalo",
    "University research papers",
    "Scholarly translations",
    "Cultural heritage organizations",
    "Sindhi literature departments",
  ],

  verificationProcess: [
    "Cross-reference with multiple sources",
    "Verify Sur classification",
    "Confirm translation accuracy",
    "Check theme and emotion categorization",
    "Validate Sindhi script accuracy",
  ],
}
