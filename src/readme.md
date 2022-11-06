```tsx
import {Wrapper, Droppable, DroppableProps, WrapperProps} from 'dragula'

<Wrapper id="builder" onDrop={() => {}}>
   <Droppable id="a">...</Droppable>
   <Droppable id="b">...</Droppable>
</Wrapper>

interface WraperProps extends Omit<WrapperProps, 'droppables' | 'instance'> {
   children: ReactElement
}


type DropProps = Omit<DroppableProps, 'observe'> & {
   children: any;
} & HTMLAttributes<HTMLDivElement>
```