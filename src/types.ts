import { DragulaOptions } from 'dragula'


interface Drake {
   containers: HTMLElement[];
   dragging: boolean;
   start(item: HTMLElement): void;
   end(): void;
   cancel(revert?: boolean): void;
   canMove(item: HTMLElement): boolean;
   remove(): void;
   on(event: 'drag', listener: (el: HTMLElement, source: HTMLElement) => void): Drake;
   on(event: 'dragend', listener: (el: HTMLElement) => void): Drake;
   on(event: 'drop', listener: (el: HTMLElement, target: HTMLElement, source: HTMLElement, sibling: HTMLElement) => void): Drake;
   on(
      event: 'cancel' | 'remove' | 'shadow' | 'over' | 'out',
      listener: (el: HTMLElement, container: HTMLElement, source: HTMLElement) => void,
   ): Drake;
   on(event: 'cloned', listener: (clone: HTMLElement, original: HTMLElement, type: 'mirror' | 'copy') => void): Drake;
   destroy(): void;
}


export interface StateProps {
   fromIndex?: number;
   toIndex?: number;
   target?: HTMLElement;
   source?: HTMLElement;
   handler?: HTMLElement;
   el?: HTMLElement;
   targetSibling?: HTMLElement;
   sourceSibling?: HTMLElement;
   shadow?: HTMLElement;
   clone?: HTMLElement;
   original?: HTMLElement;
   type?: 'copy' | 'mirror';

   targetProps?: DroppableProps;
   sourceProps?: DroppableProps;
}



export interface WrapperProps {
   instance: Drake;
   id: string;
   onDrop?: (props: StateProps) => void;
   onDrag?: (props: StateProps) => void;
   onDragend?: (props: StateProps) => void;
   onCalcel?: (props: StateProps) => void;
   onRemove?: (props: StateProps) => void;
   onShadow?: (props: StateProps) => void;
   onOver?: (props: StateProps) => void;
   onOut?: (props: StateProps) => void;
   onCloned?: (props: StateProps) => void;

   moves?: (props: StateProps) => boolean;
   accepts?: (props: StateProps) => boolean;
   copy?: (props: StateProps) => boolean;
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
   moves?: (props: StateProps) => boolean;
   accepts?: (props: StateProps) => boolean;
   copy?: DragulaOptions['copy'];
   selfOnly?: boolean;
   disabled?: boolean;
   onDrop?: (props: StateProps) => void;
   onDrag?: (props: StateProps) => void;
   onDragend?: (props: StateProps) => void;
   onCalcel?: (props: StateProps) => void;
   onRemove?: (props: StateProps) => void;
   onShadow?: (props: StateProps) => void;
   onOver?: (props: StateProps) => void;
   onOut?: (props: StateProps) => void;
   onCloned?: (props: StateProps) => void;
}



