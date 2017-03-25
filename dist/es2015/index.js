import { PLATFORM } from 'aurelia-pal';

export function configure(config) {
  config.globalResources([PLATFORM.moduleName('./ons-input'), PLATFORM.moduleName('./ons-navigator'), PLATFORM.moduleName('./ons-tab')]);
}