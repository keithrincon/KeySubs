export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Create Team',
    route: '/teams/create',
  },
  {
    label: 'My Profile',
    route: '/profile',
  },
];

export const teamDefaultValues = {
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
  // level: '',
};
