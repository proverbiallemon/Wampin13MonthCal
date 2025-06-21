import { 
  StarIcon,
  SunIcon,
  MoonIcon,
  GiftIcon,
  HeartIcon,
  SparklesIcon,
  FireIcon,
  CakeIcon,
  AcademicCapIcon,
  GlobeAmericasIcon,
  BoltIcon,
  BeakerIcon,
  RocketLaunchIcon,
  BookOpenIcon,
  HomeIcon,
  ShieldCheckIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'

export const monthNames = [
  'January',
  'February', 
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  'Yule'
]

export const holidays = {
  1: { // January
    1: { name: "Renewal Day", icon: StarIcon, color: "text-yellow-500", description: "First day of the new calendar year" },
    14: { name: "Unity Day", icon: HeartIcon, color: "text-red-500", description: "Celebrating community and togetherness" },
    21: { name: "Hope Festival", icon: SunIcon, color: "text-orange-500", description: "Mid-winter celebration of hope" }
  },
  2: { // February
    7: { name: "Knowledge Day", icon: BookOpenIcon, color: "text-blue-500", description: "Honoring learning and wisdom" },
    14: { name: "Love Day", icon: HeartIcon, color: "text-pink-500", description: "Celebrating love and friendship" },
    28: { name: "Leap Eve", icon: RocketLaunchIcon, color: "text-purple-500", description: "Preparing for the leap into spring" }
  },
  3: { // March
    1: { name: "Spring Dawn", icon: SunIcon, color: "text-green-500", description: "First day of spring season" },
    15: { name: "Balance Day", icon: BeakerIcon, color: "text-indigo-500", description: "Spring equinox celebration" },
    25: { name: "Growth Festival", icon: SparklesIcon, color: "text-emerald-500", description: "Celebrating new growth" }
  },
  4: { // April
    7: { name: "Rain Dance", icon: BoltIcon, color: "text-blue-600", description: "Welcoming spring rains" },
    14: { name: "Earth Day", icon: GlobeAmericasIcon, color: "text-green-600", description: "Honoring our planet" },
    22: { name: "Bloom Festival", icon: StarIcon, color: "text-pink-400", description: "Celebrating flowers and nature" }
  },
  5: { // May
    1: { name: "Labor Day", icon: ShieldCheckIcon, color: "text-gray-600", description: "Honoring workers and craftspeople" },
    14: { name: "Creativity Day", icon: LightBulbIcon, color: "text-yellow-400", description: "Celebrating arts and innovation" },
    28: { name: "Memory Day", icon: BookOpenIcon, color: "text-indigo-600", description: "Remembering ancestors" }
  },
  6: { // June
    7: { name: "Sun Festival", icon: SunIcon, color: "text-yellow-500", description: "Celebrating the summer sun" },
    21: { name: "Solstice Day", icon: FireIcon, color: "text-orange-600", description: "Summer solstice celebration" },
    28: { name: "Mid-Year Eve", icon: MoonIcon, color: "text-purple-600", description: "Halfway through the year" }
  },
  7: { // July
    4: { name: "Freedom Day", icon: RocketLaunchIcon, color: "text-red-500", description: "Celebrating independence and liberty" },
    14: { name: "Unity Festival", icon: HomeIcon, color: "text-blue-500", description: "Community gathering day" },
    25: { name: "Star Night", icon: StarIcon, color: "text-indigo-500", description: "Stargazing and astronomy celebration" }
  },
  8: { // August
    1: { name: "Harvest Dawn", icon: SparklesIcon, color: "text-amber-500", description: "Beginning of harvest season" },
    15: { name: "Abundance Day", icon: GiftIcon, color: "text-green-500", description: "Celebrating the harvest" },
    28: { name: "Gratitude Eve", icon: HeartIcon, color: "text-red-600", description: "Giving thanks for abundance" }
  },
  9: { // September
    7: { name: "Knowledge Festival", icon: AcademicCapIcon, color: "text-blue-600", description: "Back to learning celebration" },
    21: { name: "Autumn Equinox", icon: SunIcon, color: "text-orange-500", description: "Fall equinox celebration" },
    28: { name: "Preparation Day", icon: BeakerIcon, color: "text-purple-500", description: "Preparing for the final quarter" }
  },
  10: { // October
    13: { name: "Mystery Night", icon: MoonIcon, color: "text-purple-700", description: "Celebrating mysteries and magic" },
    21: { name: "Ancestor Day", icon: StarIcon, color: "text-gray-500", description: "Honoring those who came before" },
    31: { name: "Transformation Eve", icon: BoltIcon, color: "text-orange-600", description: "Night of change and transformation" }
  },
  11: { // November
    11: { name: "Peace Day", icon: ShieldCheckIcon, color: "text-blue-500", description: "Honoring peace and veterans" },
    21: { name: "Feast Day", icon: CakeIcon, color: "text-amber-600", description: "Gratitude feast celebration" },
    28: { name: "Reflection Day", icon: BookOpenIcon, color: "text-indigo-500", description: "Time for year-end reflection" }
  },
  12: { // December
    7: { name: "Light Festival", icon: LightBulbIcon, color: "text-yellow-500", description: "Festival of lights in darkness" },
    21: { name: "Winter Solstice", icon: MoonIcon, color: "text-blue-400", description: "Longest night celebration" },
    25: { name: "Joy Day", icon: GiftIcon, color: "text-red-500", description: "Day of giving and joy" }
  },
  13: { // Yule
    1: { name: "First of Yule", icon: StarIcon, color: "text-purple-500", description: "Beginning of the final month" },
    7: { name: "Festival of Lights", icon: FireIcon, color: "text-orange-500", description: "Mid-winter light celebration" },
    14: { name: "Midwinter Day", icon: SparklesIcon, color: "text-blue-500", description: "Heart of winter celebration" },
    21: { name: "Solstice Night", icon: MoonIcon, color: "text-indigo-600", description: "Sacred winter solstice" },
    25: { name: "Gift Day", icon: GiftIcon, color: "text-green-500", description: "Traditional day of giving" },
    28: { name: "Year's End Eve", icon: SparklesIcon, color: "text-amber-500", description: "Last day before New Year" },
    29: { name: "New Year's Day", icon: RocketLaunchIcon, color: "text-purple-600", description: "Day outside of time - renewal and celebration" },
    30: { name: "New Year's Leap", icon: BoltIcon, color: "text-pink-600", description: "Extra day in leap years only" }
  }
}

export const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
}

export const getDaysInMonth = (month, year) => {
  if (month === 13) {
    // Yule has 28 regular days, plus New Year's Day (29) and possibly New Year's Leap (30)
    return isLeapYear(year) ? 30 : 29
  }
  return 28 // All other months have exactly 28 days
}