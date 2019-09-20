import { sortBy } from 'lodash';

const sort = array =>
  sortBy(array, [array => array.name.toLowerCase()], ['asc']);

export default sort;
