import { ModuleInterface } from 'rtk';

/**
 * Function to get status of module.
 * @param appModule appModule of redux.
 * @param moduleName moduleName of app module.
 * @param subModuleName subModuleName of app module.
 * @returns flag of status
 */

export const getStatusModule = (appModule: ModuleInterface[], moduleName: string, subModuleName: string) => {
  const moduleAppBilling: ModuleInterface | undefined = appModule ? appModule.find(mod => mod.id === moduleName) : undefined;
  const flag: boolean | undefined = moduleAppBilling ? moduleAppBilling.modules.find(mod => mod.id === subModuleName)?.enabled : false;
  return flag;
};

/**
 * Function to get status of module.
 * @param appModule appModule of redux.
 * @param moduleName moduleName of app module.
 * @returns flag of status
 */

export const getStatusModuleFather = (appModule: ModuleInterface[], moduleName: string) => {
  const moduleAppBilling: ModuleInterface | undefined = appModule ? appModule.find(mod => mod.id === moduleName) : undefined;
  const flag: boolean | undefined = moduleAppBilling?.enabled;
  return flag;
};
