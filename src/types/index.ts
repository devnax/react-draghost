import { DragulaOptions } from 'dragula'
import { onDropProps, onDragProps } from './CallbackTypes';
import { Drake } from 'dragula'
export * from './CallbackTypes'
export interface WrapperProps {
   instance: Drake;
   id: string;
   onDrop: (props: onDropProps) => void;
   onDrag?: (props: onDragProps) => void;
   onDragend?: (el: Element) => void;
   onCalcel?: (el: Element, source: Element, container: Element) => void;
   onRemove?: (el: Element, source: Element, container: Element) => void;
   onShadow?: (el: Element, source: Element, container: Element) => void;
   onOver?: (el: Element, source: Element, container: Element) => void;
   onOut?: (el: Element, source: Element, container: Element) => void;
   onCloned?: (clone: Element, original: Element, type: 'copy' | 'mirror') => void;

   moves?: DragulaOptions['moves'];
   accepts?: DragulaOptions['accepts'];
   copy?: DragulaOptions['copy'];
   invalid?: DragulaOptions['invalid'];
   isContainer?: DragulaOptions['isContainer'];

   direction?: 'vertical' | 'horizontal';
   copySortSource?: boolean;
   revertOnSpill?: boolean;
   removeOnSpill?: boolean;
   mirrorContainer?: HTMLElement;
   ignoreInputTextSelection?: boolean;
   slideFactorX?: number;
   slideFactorY?: number;

   droppables: {
      [droppableId: string]: DroppableProps
   }
}


export interface DroppableProps {
   id: string;
   observe: () => void;
   moves?: DragulaOptions['moves'];
   accepts?: DragulaOptions['accepts'];
   copy?: DragulaOptions['copy'];
   selfOnly?: boolean;
   disabled?: boolean;
   onDrop?: (props: onDropProps) => void;
   onDrag?: (props: onDragProps) => void;
}