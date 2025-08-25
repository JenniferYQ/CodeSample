import { ReactElement } from './createElement';

/**
 * 组件基类
 * 这是React.Component的简化实现
 */
export class Component {
  props: any;
  state: any;
  
  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: any) {
    this.props = props;
    this.state = {};
  }
  
  /**
   * 设置状态
   * @param partialState - 部分状态或状态更新函数
   * @param callback - 状态更新后的回调
   */
  setState(partialState: any, callback?: () => void) {
    // 简化实现，实际React中这里会有更复杂的逻辑
    this.state = {
      ...this.state,
      ...(typeof partialState === 'function' ? partialState(this.state, this.props) : partialState),
    };
    
    // 触发重新渲染
    // 实际实现中会有更复杂的调度逻辑
    if (callback) callback();
  }
  
  /**
   * 渲染方法
   * 子类需要重写此方法
   */
  render(): ReactElement | null {
    return null;
  }
}