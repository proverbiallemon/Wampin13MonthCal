# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a 13-month calendar application built with Vite + React + Tailwind CSS. The calendar follows a unique system:
- 13 months of 28 days each
- The 13th month is named "Yule"
- An additional day called "New Year's Day" exists outside the regular months
- Leap years have an extra day called "New Year's Leap"
- In ISO format, New Year's Day is represented as the 29th day of the 13th month (13-29)
- New Year's Leap is represented as the 30th day of the 13th month (13-30)

## Month Names

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
13. Yule

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting (once configured)
npm run lint

# Run type checking (once TypeScript is configured)
npm run typecheck
```

## Project Structure

```
/
├── src/
│   ├── components/     # React components
│   ├── utils/         # Calendar logic and date calculations
│   ├── App.jsx        # Main application component
│   ├── main.jsx       # Application entry point
│   └── index.css      # Global styles with Tailwind directives
├── public/            # Static assets
├── index.html         # HTML entry point
├── vite.config.js     # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
└── package.json       # Project dependencies and scripts
```

## Calendar Logic Implementation Notes

When implementing date calculations:
- Each regular month has exactly 28 days (4 weeks)
- The year has 364 regular days (13 × 28)
- New Year's Day is day 365 (not part of any week)
- New Year's Leap is day 366 in leap years
- Week cycles should account for the extra day(s) interrupting the regular 7-day pattern
- Date conversion between Gregorian and 13-month calendar requires careful handling of the day offset

## Key Considerations

1. **Date Storage**: Store dates internally in a format that can handle both calendar systems
2. **Week Display**: The extra day(s) break the regular weekly pattern - consider how to display this in the UI
3. **Date Validation**: Ensure proper validation for dates like 13-29 and 13-30
4. **Leap Year Calculation**: Use standard Gregorian leap year rules (divisible by 4, except centuries unless divisible by 400)
5. **Date Conversion**: Implement bidirectional conversion between Gregorian and 13-month calendar systems