/**
 * 事件监听器类型
 */
type EventListener = (...args: any[]) => void;

/**
 * 事件发射器
 * 这是Node.js EventEmitter的简化实现
 */
export class EventEmitter {
  private events: Map<string, EventListener[]>;
  
  /**
   * 构造函数
   */
  constructor() {
    this.events = new Map();
  }
  
  /**
   * 添加事件监听器
   * 
   * @param eventName - 事件名称
   * @param listener - 监听器函数
   * @returns this实例，用于链式调用
   */
  on(eventName: string, listener: EventListener): this {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    
    const listeners = this.events.get(eventName)!;
    listeners.push(listener);
    
    return this;
  }
  
  /**
   * 添加一次性事件监听器
   * 
   * @param eventName - 事件名称
   * @param listener - 监听器函数
   * @returns this实例，用于链式调用
   */
  once(eventName: string, listener: EventListener): this {
    const onceWrapper = (...args: any[]) => {
      listener(...args);
      this.off(eventName, onceWrapper);
    };
    
    return this.on(eventName, onceWrapper);
  }
  
  /**
   * 移除事件监听器
   * 
   * @param eventName - 事件名称
   * @param listener - 要移除的监听器函数
   * @returns this实例，用于链式调用
   */
  off(eventName: string, listener: EventListener): this {
    if (this.events.has(eventName)) {
      const listeners = this.events.get(eventName)!;
      const index = listeners.indexOf(listener);
      
      if (index !== -1) {
        listeners.splice(index, 1);
      }
      
      if (listeners.length === 0) {
        this.events.delete(eventName);
      }
    }
    
    return this;
  }
  
  /**
   * 触发事件
   * 
   * @param eventName - 事件名称
   * @param args - 传递给监听器的参数
   * @returns 是否有监听器处理了该事件
   */
  emit(eventName: string, ...args: any[]): boolean {
    if (this.events.has(eventName)) {
      const listeners = this.events.get(eventName)!;
      listeners.forEach(listener => {
        listener(...args);
      });
      return true;
    }
    
    return false;
  }
  
  /**
   * 移除所有监听器
   * 
   * @param eventName - 可选的事件名称，如果提供则只移除该事件的所有监听器
   * @returns this实例，用于链式调用
   */
  removeAllListeners(eventName?: string): this {
    if (eventName) {
      this.events.delete(eventName);
    } else {
      this.events.clear();
    }
    
    return this;
  }
}