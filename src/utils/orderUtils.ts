import moment from 'moment';
import { getRandomIntager } from './numberUtils';

export function createOrderId() {
  return moment().format('YYYYMMDDhhmmss') + getRandomIntager(6);
}

export function createPickupCode() {
  return moment().format('MM-DD-') + getRandomIntager(4);
}