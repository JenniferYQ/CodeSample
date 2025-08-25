/**
 * 创建响应式对象
 * 这是Vue 3 reactive API的简化实现
 * 
 * @param target - 目标对象
 * @returns 响应式代理对象
 */
export function reactive<T extends object>(target: T): T {
  return new Proxy(target, {
    get(target, key, receiver) {
      // 依赖收集（简化版）
      track(target, key);
      const result = Reflect.get(target, key, receiver);
      return typeof result === 'object' && result !== null 
        ? reactive(result) 
        : result;
    },
    set(target, key, value, receiver) {
      const oldValue = (target as any)[key];
      const result = Reflect.set(target, key, value, receiver);
      if (oldValue !== value) {
        // 触发更新（简化版）
        trigger(target, key);
      }
      return result;
    },
    deleteProperty(target, key) {
      const hadKey = key in target;
      const result = Reflect.deleteProperty(target, key);
      if (hadKey) {
        // 触发更新（简化版）
        trigger(target, key);
      }
      return result;
    }
  });
}

// 简化的依赖收集和触发更新
const targetMap = new WeakMap();
let activeEffect: Function | undefined;

/**
 * 跟踪依赖
 * 
 * @param target - 目标对象
 * @param key - 属性键
 */
function track(target: object, key: string | symbol) {
  if (!activeEffect) return;
  
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  
  dep.add(activeEffect);
}

/**
 * 触发更新
 * 
 * @param target - 目标对象
 * @param key - 属性键
 */
function trigger(target: object, key: string | symbol) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach((effect: Function) => {
      effect();
    });
  }
}

/**
 * 创建计算属性
 * 这是Vue 3 computed API的简化实现
 * 
 * @param getter - 获取计算值的函数
 * @returns 计算属性对象
 */
export function computed<T>(getter: () => T) {
  let value: T;
  let dirty = true;
  
  const effect = () => {
    dirty = true;
  };
  
  return {
    get value() {
      if (dirty) {
        const prevEffect = activeEffect;
        activeEffect = effect;
        value = getter();
        activeEffect = prevEffect;
        dirty = false;
      }
      return value;
    }
  };
}