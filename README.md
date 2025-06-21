# 13 Month Calendar

A modern web application featuring a unique 13-month calendar system with glassmorphism design and three distinct themes.

![13 Month Calendar](https://img.shields.io/badge/Calendar-13%20Months-blue)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)

## 🌟 Features

### Unique Calendar System
- **13 months** of exactly 28 days each (4 weeks per month)
- The 13th month is called **"Yule"**
- **New Year's Day** - A special day outside regular time (day 365)
- **New Year's Leap** - An extra day in leap years (day 366)
- Perfect weekly cycles throughout the year

### Calendar Views & Navigation
- **13-Month Calendar** - The primary view with all unique features
- **Gregorian Calendar** - Traditional calendar view with holiday mapping
- **Smooth Toggle** - Animated transitions between calendar modes
- **Date Picker** - Click the month/year header for quick date navigation
  - Year selector with up/down navigation
  - Month grid for easy month selection
  - Full calendar picker with day selection

### Unique 13-Month Features
- **Week Numbers (1-52)** - Perfect alignment with 4 weeks per month
- **Perpetual Day Indicator** - Shows which dates always fall on the same weekday
- **Holiday System** - Special holidays for each month with custom icons
- **Tooltip Positioning** - Smart tooltips that avoid edge clipping

### Three Beautiful Themes
1. **Light Mode** - Soft pastels with elegant glassmorphism
2. **Dark Mode** - Rich gradients with classic glass effects
3. **Black Ice Mode** - Ultra-dark theme with stunning cyan accents

### Modern Design
- Glassmorphism effects throughout
- Smooth theme transitions
- Animated gradient backgrounds
- Interactive day cells with hover effects
- Holiday indicators with tooltips
- Responsive design

## 🚀 Live Demo

Visit the live application: [https://wampin-13-month-calendar.pages.dev](https://wampin-13-month-calendar.pages.dev)

## 🛠️ Technology Stack

- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **Heroicons** - Icon library
- **Cloudflare Pages** - Hosting

## 📅 Month Names

1. January
2. February
3. March
4. April
5. May
6. June
7. July
8. August
9. September
10. October
11. November
12. December
13. **Yule**

## 🎯 Why 13 Months?

The 13-month calendar offers several advantages over the traditional Gregorian calendar:

### Perfect Regularity
- **Every month has exactly 28 days** (4 complete weeks)
- **Same date = Same weekday** all year (e.g., the 15th is always the same day of the week)
- **52 perfect weeks** with no split weeks across months

### Better Planning
- **Predictable patterns** make scheduling easier
- **Monthly comparisons** are accurate (all months have the same number of days)
- **Payroll & billing cycles** align perfectly with months

### Natural Alignment
- **28-day months** closely match the lunar cycle (~29.5 days)
- **13 months × 28 days = 364 days** plus New Year's Day
- **Quarters** can be 3-3-3-4 months for even distribution

## 🎨 Themes

### Light Mode
- Soft gradient backgrounds
- Dark text for contrast
- Vibrant holiday colors
- White glassmorphism effects

### Dark Mode
- Purple/blue/cyan gradients
- White text with shadows
- Muted accent colors
- Classic glassmorphism

### Black Ice Mode
- Ultra-dark black/slate background
- Cyan accent colors throughout
- Frosted glass effects
- Minimal color palette

## 🏗️ Installation

```bash
# Clone the repository
git clone https://github.com/ProverbialLemon/Wampin13MonthCal.git

# Navigate to project directory
cd Wampin13MonthCal

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🔧 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Calendar Logic

The calendar implements a unique date system:
- Each month has exactly 28 days
- Total regular days: 364 (13 × 28)
- New Year's Day is the 365th day
- Leap years add New Year's Leap as the 366th day
- In ISO format: New Year's Day = 13-29, New Year's Leap = 13-30

## 🚀 Deployment

This project automatically deploys to Cloudflare Pages when pushing to the main branch.

### Setup Cloudflare Pages:

1. Create a Cloudflare Pages project
2. Add the following secrets to your GitHub repository:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
3. Push to main branch to trigger deployment

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- Inspired by the International Fixed Calendar
- Built with React and modern web technologies
- Glassmorphism design trends
- Heroicons for beautiful icons

---

Made with ❤️ by ProverbialLemon