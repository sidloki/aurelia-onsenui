export {OnsBackButton} from './ons-back-button';
export {OnsInput} from './ons-input';
export {OnsNavigator} from './ons-navigator';
export {OnsTab} from './ons-tab';

export function configure(config) {
  config.globalResources([
    './ons-back-button',
    './ons-input',
    './ons-navigator',
    './ons-tab'
  ]);
}
