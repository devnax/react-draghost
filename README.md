```tsx
import {DraggableWrapper, Droppable, DroppableProps, WrapperProps} from 'react-draghost'

<DraggableWrapper id="builder" onDrop={() => {}}>
   <Droppable id="a">...</Droppable>
   <Droppable id="b">...</Droppable>
</DraggableWrapper>



interface StateProps {
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



interface WrapperProps {
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


interface DroppableProps {
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
```