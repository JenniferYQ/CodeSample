/**
 * 表示React元素的类型
 */
export type ReactElementType = string | Function;

/**
 * 表示React元素的属性
 */
export interface ReactElementProps {
  [key: string]: any;
  children?: ReactElement[];
}

/**
 * 表示React元素
 */
export interface ReactElement {
  type: ReactElementType;
  props: ReactElementProps;
}

/**
 * 创建React元素
 * 这是React.createElement的简化实现
 * 
 * @param type - 元素类型（标签名或组件函数/类）
 * @param props - 元素属性
 * @param children - 子元素
 * @returns 创建的React元素
 */
export function createElement(
  type: ReactElementType,
  props: ReactElementProps | null = {},
  ...children: any[]
): ReactElement {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => 
        typeof child === 'object' ? child : createTextElement(child)
      ),
    },
  };
}

/**
 * 创建文本元素
 * 
 * @param text - 文本内容
 * @returns 文本元素
 */
function createTextElement(text: string | number): ReactElement {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}