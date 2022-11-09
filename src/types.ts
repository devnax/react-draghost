type ELE = HTMLElement

interface Drake {
   containers: ELE[];
   dragging: boolean;
   start(item: ELE): void;
   end(): void;
   cancel(revert?: boolean): void;
   canMove(item: ELE): boolean;
   remove(): void;
   on(event: 'drag', listener: (el: ELE, source: ELE) => void): Drake;
   on(event: 'dragend', listener: (el: ELE) => void): Drake;
   on(event: 'drop', listener: (el: ELE, target: ELE, source: ELE, sibling: ELE) => void): Drake;
   on(
      event: 'cancel' | 'remove' | 'shadow' | 'over' | 'out',
      listener: (el: ELE, container: ELE, source: ELE) => void,
   ): Drake;
   on(event: 'cloned', listener: (clone: ELE, original: ELE, type: 'mirror' | 'copy') => void): Drake;
   destroy(): void;
}


export interface WrapperProps {
   instance: Drake;
   id: string;
   onDrop?: (props: { data?: any, fromIndex: number | null, toIndex: number | null, el: ELE, target: ELE, source: ELE, sibling: ELE }) => void;
   onDrag?: (props: { el: ELE, source: ELE }) => void;
   onDragend?: (props: { el: ELE }) => void;
   onCalcel?: (props: { el: ELE, container: ELE, source: ELE }) => void;
   onRemove?: (props: { el: ELE, container: ELE, source: ELE }) => void;
   onShadow?: (props: { el: ELE, container: ELE, source: ELE }) => void;
   onOver?: (props: { el: ELE, container: ELE, source: ELE }) => void;
   onOut?: (props: { el: ELE, container: ELE, source: ELE }) => void;
   onCloned?: (props: { clone: ELE, original: ELE, type: 'mirror' | 'copy' }) => void;

   moves?: (props: { el?: ELE, container?: ELE, handle?: ELE, sibling?: ELE }) => boolean;
   accepts?: (props: { el: ELE, target: ELE, source: ELE, sibling: ELE }) => boolean;
   copy?: (props: { el: ELE, source: ELE }) => boolean;
   invalid?: (props: { el?: ELE, target?: ELE }) => boolean;
   isContainer?: (props: { el?: ELE }) => boolean;

   direction?: 'vertical' | 'horizontal';
   copySortSource?: boolean;
   revertOnSpill?: boolean;
   removeOnSpill?: boolean;
   mirrorContainer?: ELE;
   ignoreInputTextSelection?: boolean;
   slideFactorX?: number;
   slideFactorY?: number;

   droppables: {
      [droppableId: string]: DroppableProps
   }
}


export interface DroppableProps {
   id: string;
   selfOnly?: boolean;
   disabled?: boolean;
   observe: () => void;

   moves?: (props: { el?: ELE, container?: ELE, handle?: ELE, sibling?: ELE }) => boolean;
   accepts?: (props: { el: ELE, target: ELE, source: ELE, sibling: ELE }) => boolean;
   copy?: (props: { el: Element, source: Element }) => boolean;
   invalid?: (props: { el?: ELE, target?: ELE }) => boolean;
   isContainer?: (props: { el?: ELE }) => boolean;

   onDrop?: (props: { data?: any, fromIndex: number | null, toIndex: number | null, el: ELE, target: ELE, source: ELE, sibling: ELE }) => void;
   onDrag?: (props: { el: ELE, source: ELE }) => void;
   onDragend?: (props: { el: ELE }) => void;
   onCalcel?: (props: { el: ELE, container: ELE, source: ELE }) => void;
   onRemove?: (props: { el: ELE, container: ELE, source: ELE }) => void;
   onShadow?: (props: { el: ELE, container: ELE, source: ELE }) => void;
   onOver?: (props: { el: ELE, container: ELE, source: ELE }) => void;
   onOut?: (props: { el: ELE, container: ELE, source: ELE }) => void;
   onCloned?: (props: { clone: ELE, original: ELE, type: 'mirror' | 'copy' }) => void;

   sendData?: (props: { fromIndex: number | null, toIndex: number | null, el: ELE, target: ELE, source: ELE, sibling: ELE }) => any;

}



