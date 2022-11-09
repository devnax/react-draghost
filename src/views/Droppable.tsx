import React, { FC, HTMLAttributes, useEffect, useMemo, useState, useRef } from 'react'
import { WrapperFactory, refreshBuilder, getCurrentWrapperID } from '../core'
import { DroppableProps } from '../types'

export type Props = Omit<DroppableProps, 'observe'> & {
   children: any;
} & HTMLAttributes<HTMLDivElement>

const Droppable: FC<Props> = ({ id, children, ...props }) => {
   const [wrapperId, setWrapperId] = useState(getCurrentWrapperID())
   const [observe, setObserve] = useState(0)
   const ref = useRef()

   const {
      moves,
      accepts,
      copy,
      selfOnly,
      disabled,
      onDrop,
      onDrag,
      onDragend,
      onCalcel,
      onRemove,
      onShadow,
      onOver,
      onOut,
      onCloned,
      ...divProps
   } = props


   useMemo(() => {
      const wrapper = WrapperFactory.get(wrapperId)
      if (wrapper) {
         wrapper.droppables[id] = {
            ...props,
            id,
            observe: () => setObserve(Math.random()),
            moves,
            accepts,
            copy,
            selfOnly,
            disabled,
            onDrop,
            onDrag,
            onDragend,
            onCalcel,
            onRemove,
            onShadow,
            onOver,
            onOut,
            onCloned
         }
         WrapperFactory.set(wrapper.id, { ...wrapper })
      }
   }, [wrapperId])

   useEffect(() => {
      let wrapper = wrapperId && WrapperFactory.get(wrapperId)

      if (wrapper && wrapper.instance) {
         refreshBuilder(wrapper.id)
      } else if (!wrapper) {
         let i = 0;
         let ele: HTMLDivElement = ref.current as any
         while (true) {
            const _wraperId = ele.parentElement?.getAttribute("data-wrapper")
            if (_wraperId) {
               setWrapperId(_wraperId)
               break;
            } else {
               ele = ele.parentElement as any
            }
            i++;
            if (i > 1000) {
               break
            }
         }
      }

      return () => {

         if (wrapper) {
            if (wrapper.droppables[id]) {
               delete wrapper.droppables[id]
            }
            wrapperId && WrapperFactory.set(wrapper.id, { ...wrapper })
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [wrapperId])

   return (
      <div {...divProps} ref={ref as any} data-drop={id} key={observe} >
         {children}
      </div>
   )
}

export default Droppable