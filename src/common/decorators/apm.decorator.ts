import * as apm from 'elastic-apm-node';
import { apmConfig } from 'src/config/apm.config';
const apmAgent = apm.start(apmConfig());

export function startSpan(name: string) {
  return apmAgent.startSpan(name); //returning null will dissable apm
}

export function captureError(error) {
  apmAgent.captureError(error);
}

export function ApmSpan(name?: string) {
  //default will be className.methodName
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    if (originalMethod.constructor?.name == 'Function') {
      descriptor.value = function (...args: any[]) {
        const spanName = name || target.constructor?.name + '.' + propertyKey;
        try {
          const span = startSpan(spanName);
          const result = originalMethod.apply(this, args);
          span?.end();
          return result;
        } catch (error) {
          captureError(error);
          throw error;
        }
      };
    }
    if (originalMethod.constructor?.name == 'AsyncFunction') {
      descriptor.value = async function (...args: any[]) {
        const spanName = name || target.constructor?.name + '.' + propertyKey;
        try {
          const span = startSpan(spanName);
          const result = await originalMethod.apply(this, args);
          span?.end();
          return result;
        } catch (error) {
          captureError(error);
          throw error;
        }
      };
    }
  };
}

export function ApmSpanAllMethods(options?: { exclude?: string[] }) {
  return (target: any) => {
    const descriptors = Object.getOwnPropertyDescriptors(target.prototype);
    for (const [propName, descriptor] of Object.entries(descriptors)) {
      const isMethod =
        typeof descriptor.value == 'function' && propName != 'constructor';
      if (!isMethod) continue;
      if (options?.exclude?.includes(propName)) continue;
      const spanName = target.name + '.' + propName;
      ApmSpan(spanName)(target, propName, descriptor);
      Object.defineProperty(target.prototype, propName, descriptor);
    }
  };
}
