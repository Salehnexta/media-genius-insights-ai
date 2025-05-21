export const getChartConfig = () => {
  return {
    'Website Traffic': {
      label: 'Website Traffic',
      color: '#4285F4'
    },
    'Social Media': {
      label: 'Social Media',
      color: '#34A853'
    },
    'Positive': {
      label: 'Positive',
      color: '#34A853'
    },
    'Negative': {
      label: 'Negative',
      color: '#EA4335'
    },
    'Neutral': {
      label: 'Neutral',
      color: '#FBBC05'
    },
    'Your Brand': {
      label: 'Your Brand',
      color: '#4285F4'
    },
    'Competitor A': {
      label: 'Competitor A',
      color: '#34A853'
    },
    'Competitor B': {
      label: 'Competitor B',
      color: '#FBBC05'
    },
    'Competitor C': {
      label: 'Competitor C',
      color: '#EA4335'
    },
    'Campaign A': {
      label: 'Campaign A',
      color: '#4285F4'
    },
    'Campaign B': {
      label: 'Campaign B',
      color: '#34A853'
    },
    'Campaign C': {
      label: 'Campaign C',
      color: '#FBBC05'
    },
    'New Users': {
      label: 'New Users',
      color: '#9b87f5'
    },
    'Returning Users': {
      label: 'Returning Users',
      color: '#6E59A5'
    },
    'Blog Posts': {
      label: 'Blog Posts',
      color: '#4285F4'
    },
    'Videos': {
      label: 'Videos',
      color: '#34A853'
    },
    'Images': {
      label: 'Images',
      color: '#FBBC05'
    },
    'Podcasts': {
      label: 'Podcasts',
      color: '#EA4335'
    },
    'Likes': {
      label: 'Likes',
      color: '#4285F4'
    },
    'Comments': {
      label: 'Comments',
      color: '#34A853'
    },
    'Shares': {
      label: 'Shares',
      color: '#FBBC05'
    }
  };
};

// Example data for charts
export const getOverviewData = () => [
  { name: 'Jan', "Website Traffic": 31, "Social Media": 11 },
  { name: 'Feb', "Website Traffic": 40, "Social Media": 32 },
  { name: 'Mar', "Website Traffic": 28, "Social Media": 45 },
  { name: 'Apr', "Website Traffic": 51, "Social Media": 32 },
  { name: 'May', "Website Traffic": 42, "Social Media": 34 },
  { name: 'Jun', "Website Traffic": 109, "Social Media": 52 },
  { name: 'Jul', "Website Traffic": 100, "Social Media": 41 },
];

export const getSentimentData = () => [
  { name: 'Mon', "Positive": 44, "Negative": 76, "Neutral": 35 },
  { name: 'Tue', "Positive": 55, "Negative": 85, "Neutral": 41 },
  { name: 'Wed', "Positive": 57, "Negative": 101, "Neutral": 36 },
  { name: 'Thu', "Positive": 56, "Negative": 98, "Neutral": 26 },
  { name: 'Fri', "Positive": 61, "Negative": 87, "Neutral": 45 },
  { name: 'Sat', "Positive": 58, "Negative": 105, "Neutral": 48 },
  { name: 'Sun', "Positive": 63, "Negative": 91, "Neutral": 52 },
];

export const getShareOfVoiceData = () => [
  { name: 'Your Brand', value: 42, fill: '#4285F4' },
  { name: 'Competitor A', value: 28, fill: '#34A853' },
  { name: 'Competitor B', value: 19, fill: '#FBBC05' },
  { name: 'Competitor C', value: 11, fill: '#EA4335' }
];

export const getContentCreatorData = () => [
  { name: 'Jan', "Blog Posts": 12, "Videos": 8, "Images": 24, "Podcasts": 4 },
  { name: 'Feb', "Blog Posts": 15, "Videos": 10, "Images": 28, "Podcasts": 6 },
  { name: 'Mar', "Blog Posts": 18, "Videos": 12, "Images": 32, "Podcasts": 8 },
  { name: 'Apr', "Blog Posts": 14, "Videos": 9, "Images": 26, "Podcasts": 5 },
  { name: 'May', "Blog Posts": 16, "Videos": 11, "Images": 30, "Podcasts": 7 },
  { name: 'Jun', "Blog Posts": 20, "Videos": 14, "Images": 34, "Podcasts": 9 }
];

export const getContentEngagementData = () => [
  { name: 'Jan', "Likes": 320, "Comments": 180, "Shares": 90 },
  { name: 'Feb', "Likes": 380, "Comments": 210, "Shares": 110 },
  { name: 'Mar', "Likes": 420, "Comments": 240, "Shares": 130 },
  { name: 'Apr', "Likes": 450, "Comments": 260, "Shares": 140 },
  { name: 'May', "Likes": 480, "Comments": 290, "Shares": 160 },
  { name: 'Jun', "Likes": 520, "Comments": 320, "Shares": 180 }
];
