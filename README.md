```tsx
import {DraggableWrapper, Droppable, DroppableProps, WrapperProps} from 'react-draghost'

<DraggableWrapper id="builder" onDrop={() => {}}>
   <Droppable id="a">...</Droppable>
   <Droppable id="b">...</Droppable>
</DraggableWrapper>



interface WrapperProps {
   instance: Drake;
   id: string;
   onDrop?: (props: { el: ELE, target: ELE, source: ELE, sibling: ELE }) => void;
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


interface DroppableProps {
   id: string;
   selfOnly?: boolean;
   disabled?: boolean;
   observe: () => void;

   moves?: (props: { el?: ELE, container?: ELE, handle?: ELE, sibling?: ELE }) => boolean;
   accepts?: (props: { el: ELE, target: ELE, source: ELE, sibling: ELE }) => boolean;
   copy?: (props: { el: Element, source: Element }) => boolean;
   invalid?: (props: { el?: ELE, target?: ELE }) => boolean;
   isContainer?: (props: { el?: ELE }) => boolean;

   onDrop?: (props: { fromIndex: number | null, toIndex: number | null, el: ELE, target: ELE, source: ELE, sibling: ELE }) => void;
   onDrag?: (props: { el: ELE, source: ELE }) => void;
   onDragend?: (props: { el: ELE }) => void;
   onCalcel?: (props: { el: ELE, container: ELE, source: ELE }) => void;
   onRemove?: (props: { el: ELE, container: ELE, source: ELE }) => void;
   onShadow?: (props: { el: ELE, container: ELE, source: ELE }) => void;
   onOver?: (props: { el: ELE, container: ELE, source: ELE }) => void;
   onOut?: (props: { el: ELE, container: ELE, source: ELE }) => void;
   onCloned?: (props: { clone: ELE, original: ELE, type: 'mirror' | 'copy' }) => void;
}
```