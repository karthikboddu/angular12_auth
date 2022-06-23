const categoriesData = [
  {
    id: '1',
    image: require('../images/building.png'),
    title: 'M Residency',
    address: 'Ashok nagar',
    amount: '₹20,000',
    selected: true,
    totalFloors: 4,
    floors: [11,12,13,14],
  },
  {
    id: '2',
    image: require('../images/office-building.png'),
    title: 'A Towers',
    address: 'Himayatnagar',
    amount: '₹25,000',
    selected: false,
    floors: [15,16],
  },
  {
    id: '3',
    image: require('../images/building_lite.png'),
    title: 'F Stays',
    address: 'Rtc x roads',
    amount: '₹10,000',
    selected: false,
    floors: [17,18],
  },
];

export default categoriesData;
