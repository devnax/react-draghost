import { WrapperProps } from './types'
import dragula from "react-dragula";

let currentWrapper: any = null

export const WrapperFactory = new Map<string, WrapperProps>()
export const setCurrentWrapperID = (wrapperId: string) => currentWrapper = wrapperId
export const getCurrentWrapperID = () => currentWrapper
export const getCurrentWrapper = () => WrapperFactory.get(currentWrapper)


export const refreshBuilder = (wrapperId: string) => {

   let wrapper = WrapperFactory.get(wrapperId)
   if (!wrapper) {
      return;
   }
   const { droppables, ...dragulaProps } = wrapper
   const containers: any = Object.keys(droppables).map(id => document.querySelector(`[data-wrapper=${wrapperId}] [data-drop=${id}]`))

   const {
      onDrop,
      onDrag,
      onDragend,
      onCalcel,
      onRemove,
      onShadow,
      onOver,
      onOut,
      onCloned,
      ...settings
   } = dragulaProps

   wrapper.instance && wrapper.instance.destroy()
   WrapperFactory.set(wrapperId, {
      ...wrapper,
      instance: dragula(Array.from(containers), {
         ...settings,
         accepts: (el, target, source, sibling) => {
            const targetId: any = target?.getAttribute('data-drop') || ""
            const sourceId = source?.getAttribute('data-drop') || ""
            const targetOptions = droppables[targetId]
            const sourceOptions = droppables[sourceId]

            const disabled = sourceOptions?.disabled || targetOptions?.disabled
            const selfOnly = sourceOptions?.selfOnly || targetOptions?.selfOnly

            if (disabled) {
               return false
            }
            if (selfOnly && targetId !== sourceId) {
               return false
            }

            if (targetOptions && targetOptions.accepts) {
               return targetOptions.accepts(el, target, source, sibling)
            }
            return settings.accepts ? settings.accepts(el, target, source, sibling) : true
         },
         moves: (el, container, handle, sibling) => {
            const sourceId = el?.parentElement?.getAttribute('data-drop') || ""
            const sourceOptions = droppables[sourceId]
            if (sourceOptions?.disabled) {
               return false
            }
            return settings.moves ? settings.moves(el, container, handle, sibling) : true
         }
      })
   })
   wrapper = WrapperFactory.get(wrapperId) as WrapperProps

   const instance = wrapper.instance
   let fromIndex: any = null


   onDragend && instance.on("dragend", onDragend)
   onCalcel && instance.on("cancel", onCalcel)
   onRemove && instance.on("remove", onRemove)
   onShadow && instance.on("shadow", onShadow)
   onOver && instance.on("over", onOver)
   onOut && instance.on("out", onOut)
   onCloned && instance.on("cloned", onCloned)

   instance.on('drag', (el: any, source) => {
      fromIndex = Array.from(el.parentNode.children).indexOf(el)
      if (onDrag) {
         const sourceId: any = source.getAttribute('data-drop')
         const sourceOptions = droppables[sourceId]
         sourceOptions.onDrag && sourceOptions.onDrag({ el, source, fromIndex, sourceId })
         onDrag({ el, source, fromIndex, sourceId })
      }
   })

   instance.on('drop', (el: any, target, source, sibling) => {
      if (!target) return
      const sourceId: any = source.getAttribute('data-drop')
      const targetId: any = target.getAttribute('data-drop')
      let toIndex = Array.from(el.parentNode.children).indexOf(el)
      const targetOptions = droppables[targetId]

      const args = { el, target, source, sibling, fromIndex, toIndex, sourceId, targetId }
      targetOptions.onDrop && targetOptions.onDrop(args)
      onDrop(args)

      if (droppables[sourceId]) droppables[sourceId].observe()
      if (droppables[targetId]) droppables[targetId].observe()

      fromIndex = null

      setTimeout(() => {
         instance?.destroy()
         refreshBuilder(wrapperId)
      }, 50)
   })
}