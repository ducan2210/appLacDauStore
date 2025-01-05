import {ImageSourcePropType} from 'react-native';

export type productReview = {
  nameCustomer: string;
  rating: number;
  avatar: ImageSourcePropType;
  comment?: string;
  image?: ImageSourcePropType[];
  date: Date;
};

export const productReviewData: productReview[] = [
  {
    nameCustomer: 'an dep trai',
    rating: 4,
    avatar: require('../assets/images/giay.png'),
    comment:
      'ascnaskcnkas cnklasnckl nsakcsakl,ascnaskcnkas cnklasnckl nsakcsakl,ascnaskcnkas cnklasnckl nsakcsakl,ascnaskcnkas cnklasnckl nsakcsakl',
    image: [
      require('../assets/images/giay.png'),
      require('../assets/images/giay.png'),
      require('../assets/images/giay.png'),
    ],
    date: new Date(),
  },
  {
    nameCustomer: 'an dep trai',
    rating: 4,
    avatar: require('../assets/images/giay.png'),
    comment:
      'ascnaskcnkas cnklasnckl nsakcsakl,ascnaskcnkas cnklasnckl nsakcsakl,ascnaskcnkas cnklasnckl nsakcsakl,ascnaskcnkas cnklasnckl nsakcsakl',
    image: [
      require('../assets/images/giay.png'),
      require('../assets/images/giay.png'),
      require('../assets/images/giay.png'),
    ],
    date: new Date(),
  },
  {
    nameCustomer: 'an dep trai',
    rating: 4,
    avatar: require('../assets/images/giay.png'),
    comment:
      'ascnaskcnkas cnklasnckl nsakcsakl,ascnaskcnkas cnklasnckl nsakcsakl,ascnaskcnkas cnklasnckl nsakcsakl,ascnaskcnkas cnklasnckl nsakcsakl',
    image: [
      require('../assets/images/giay.png'),
      require('../assets/images/giay.png'),
      require('../assets/images/giay.png'),
    ],
    date: new Date(),
  },
  {
    nameCustomer: 'an dep trai',
    rating: 4,
    avatar: require('../assets/images/giay.png'),
    comment:
      'ascnaskcnkas cnklasnckl nsakcsakl,ascnaskcnkas cnklasnckl nsakcsakl,ascnaskcnkas cnklasnckl nsakcsakl,ascnaskcnkas cnklasnckl nsakcsakl',
    image: [
      require('../assets/images/giay.png'),
      require('../assets/images/giay.png'),
      require('../assets/images/giay.png'),
    ],
    date: new Date(),
  },
];
