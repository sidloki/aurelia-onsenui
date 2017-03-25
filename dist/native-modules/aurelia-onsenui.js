export { OnsInput } from './ons-input';
export { OnsNavigator } from './ons-navigator';
export { OnsTab } from './ons-tab';

export function configure(config) {
  config.globalResources(['./ons-input', './ons-navigator', './ons-tab']);
}