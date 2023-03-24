import {TextStyle} from 'react-native';

const size = {
  xs: 10,
  s: 12,
  default: 14,
  md: 16,
  lg: 24,
};

const weight: {[key: string]: TextStyle['fontWeight']} = {
  bold: '700',
  semi: '600',
  normal: '400',
  thin: '300',
};

export default {size, weight};
