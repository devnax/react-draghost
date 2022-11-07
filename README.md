```tsx
import {DraggableWrapper, Droppable, DroppableProps, WrapperProps} from 'react-draghost'

<DraggableWrapper id="builder" onDrop={() => {}}>
   <Droppable id="a">...</Droppable>
   <Droppable id="b">...</Droppable>
</DraggableWrapper>

interface WraperProps extends Omit<WrapperProps, 'droppables' | 'instance'> {
   children: ReactElement
}


type DropProps = Omit<DroppableProps, 'observe'> & {
   children: any;
} & HTMLAttributes<HTMLDivElement>
```