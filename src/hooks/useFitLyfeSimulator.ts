import { useState } from 'react';

export type FitLyfeTab = 'dashboard' | 'water' | 'calculator' | 'food' | 'history' | 'calorie' | 'rank';

export interface FitLyfeTabInfo {
  id: 'dashboard' | 'water' | 'calculator' | 'food' | 'history';
  name: string;
  shortLabel: string;
  heading: string;
  subheading: string;
  metricLabel: string;
  metricValue: string;
  badgeText: string;
  badgeType: 'emerald' | 'cyan' | 'purple' | 'amber';
  image: string;
  highlights: string[];
}

export const FITLYFE_TABS: Record<'dashboard' | 'water' | 'calculator' | 'food' | 'history', FitLyfeTabInfo> = {
  dashboard: {
    id: 'dashboard',
    name: 'Aesthetic Dashboard',
    shortLabel: 'Dashboard',
    heading: 'Live Calorie Ring & Macro Balance',
    subheading: 'Real-time tracking of calories consumed, burned, and remaining against your goal with a ±100 kcal Target Consistency Window.',
    metricLabel: "TODAY'S SUMMARY",
    metricValue: '0 / 2,000 kcal Goal',
    badgeText: '±100 kcal Target Window',
    badgeType: 'cyan',
    image: '/assets/projects/fitlyfe/dashboard_summary.jpg',
    highlights: [
      'Live Calorie Ring with active allowance',
      'Full Macro Grid: Protein, Carbs, Fat, Net Carbs, Fiber, Sodium',
      'MET-based burned calories & net balance calculations',
      'Smart emoji meal grouping (Breakfast, Lunch, Dinner, Protein, Snacks)',
    ],
  },
  water: {
    id: 'water',
    name: 'Hydration & Habit Dock',
    shortLabel: 'Hydration',
    heading: 'Quick-Cup Hydration & 10-Tier Rank',
    subheading: 'Single-tap water logging with interactive meter, side-docked rank emblem, and daily archive closeouts.',
    metricLabel: 'DAILY WATER INTAKE',
    metricValue: '0 / 2,000 ml · 8 Glasses',
    badgeText: '+250ml / +500ml Tap',
    badgeType: 'purple',
    image: '/assets/projects/fitlyfe/dashboard_water_actions.jpg',
    highlights: [
      'Interactive fluid intake meter with custom goals',
      'Side-docked consistency rank badge (Level 0 Rookie to Level 9 King)',
      'Single-tap Quick Log Meal dialog',
      '"Done for the Day" daily closeout with 2-hour persistent undo',
    ],
  },
  calculator: {
    id: 'calculator',
    name: 'Smart Goal Calculator',
    shortLabel: 'Calculator',
    heading: 'Mifflin-St Jeor Metabolic Engine',
    subheading: 'Guided scientific pathway computing BMR and TDEE across age, biological sex, metrics, and activity multipliers.',
    metricLabel: 'METABOLIC PATHWAY',
    metricValue: 'Moderate Deficit (-500 kcal)',
    badgeText: 'BMR & TDEE Multiplier',
    badgeType: 'emerald',
    image: '/assets/projects/fitlyfe/goal_calculator_pathways.jpg',
    highlights: [
      'Mifflin-St Jeor formula for exact BMR calculation',
      'Activity multipliers from Sedentary (1.20x) to Very Active (1.73x)',
      '5 Goal Pathways: Deficits (-300, -500, -750), Maintenance, Lean Bulk (+250)',
      'Quick manual calorie target override option',
    ],
  },
  food: {
    id: 'food',
    name: 'Food Library Database',
    shortLabel: 'Food Library',
    heading: 'Searchable Staples & Macro Facts',
    subheading: 'Instant offline food database indexing whole food staples, everyday recipes, and verified nutrition metrics.',
    metricLabel: 'OFFLINE DATABASE',
    metricValue: 'Sub-Second SQLite Search',
    badgeText: '1-Tap Quick Logging',
    badgeType: 'cyan',
    image: '/assets/projects/fitlyfe/food_library.jpg',
    highlights: [
      'Sub-second search across legumes, grains, proteins, and regional staples',
      'Popular quick-search pills (Chickpeas, Rice, Greek Yogurt, Lentils)',
      'Complete per-100g breakdown: Protein, Carbs, Fat, Fiber',
      'Save favorites and 1-tap direct log to today’s diary',
    ],
  },
  history: {
    id: 'history',
    name: 'Daily History & Overview',
    shortLabel: 'History',
    heading: 'Aggregated Analytics & Archives',
    subheading: 'Review historical nutritional logs, macro pill distributions, water tracking records, and long-term averages.',
    metricLabel: 'NUTRITION OVERVIEW',
    metricValue: '1,090 kcal · 74g Protein Avg',
    badgeText: 'Daily Analytics',
    badgeType: 'amber',
    image: '/assets/projects/fitlyfe/daily_history.jpg',
    highlights: [
      'Aggregated days logged, average calories, and average protein intake',
      'Past daily records with macro pill badges and percentage goals',
      'Historical meal review with easy log inspection',
      'Streak preservation and 24-hour grace window recovery',
    ],
  },
};

/**
 * useFitLyfeSimulator - Manages interactive preview tabs and metric switching for the FitLyfe showcase.
 * Single Responsibility: State and data mappings for the FitLyfe hardware & app simulator.
 */
export function useFitLyfeSimulator(initialTab: FitLyfeTab = 'dashboard') {
  // Normalize legacy keys
  const normalizeTab = (tab: FitLyfeTab): 'dashboard' | 'water' | 'calculator' | 'food' | 'history' => {
    if (tab === 'calorie') return 'dashboard';
    if (tab === 'rank') return 'water';
    return tab;
  };

  const [activeTab, setActiveTabState] = useState<'dashboard' | 'water' | 'calculator' | 'food' | 'history'>(
    normalizeTab(initialTab)
  );

  const setActiveTab = (tab: FitLyfeTab) => {
    setActiveTabState(normalizeTab(tab));
  };

  const currentTabInfo = FITLYFE_TABS[activeTab];

  const metric = {
    label: currentTabInfo.metricLabel,
    value: currentTabInfo.metricValue,
    badgeText: currentTabInfo.badgeText,
    image: currentTabInfo.image,
  };

  return {
    activeTab,
    setActiveTab,
    currentTabInfo,
    metric,
    allTabs: Object.values(FITLYFE_TABS),
  };
}
