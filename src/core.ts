import { WrapperProps } from './types'
import { DragulaOptions, Drake } from 'dragula'

type ELE = HTMLElement

let dragula: (containers: ELE[], options?: DragulaOptions) => Drake;
let currentWrapper: any = null

export const WrapperFactory = new Map<string, WrapperProps>()
export const setCurrentWrapperID = (wrapperId: string) => currentWrapper = wrapperId
export const getCurrentWrapperID = () => currentWrapper
export const getCurrentWrapper = () => WrapperFactory.get(currentWrapper)


export const refreshBuilder = (wrapperId: string) => {
   if (!dragula) {
      import('react-dragula').then((mod) => {
         dragula = (mod.default || mod) as any
         refreshBuilder(wrapperId)
      })
      return
   }

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



   const getProps = (con: ELE) => droppables[con?.getAttribute('data-drop') || ""]
   const getElProps = (ele: ELE) => droppables[ele?.parentElement?.getAttribute('data-drop') || ""]




   const dragulaSettings: any = {}

   if (settings.copy) {
      dragulaSettings.copy = (el: ELE, source: ELE) => {
         const sourceOptions = getProps(source as any)
         if (sourceOptions.copy) {
            return sourceOptions.copy({ el, source })
         }
         return (settings.copy && settings.copy({ el, source } as any)) || false
      }
   }
   if (settings.invalid) {
      dragulaSettings.invalid = (el: ELE, target: ELE) => {
         const props = getProps(target as any)
         if (props.invalid) {
            return props.invalid({ el, target } as any)
         }
         return (settings.invalid && settings.invalid({ el, target } as any)) || false as boolean
      }
   }
   if (settings.isContainer) {
      dragulaSettings.isContainer = (el: ELE) => {
         const props = getElProps(el as any)
         if (props.isContainer) {
            return props.isContainer({ el } as any)
         }
         return (settings.isContainer && settings.isContainer({ el } as any)) || false as boolean
      }
   }

   wrapper.instance && wrapper.instance.destroy()
   WrapperFactory.set(wrapperId, {
      ...wrapper,
      instance: dragula(Array.from(containers), {
         ...settings,
         ...dragulaSettings,
         accepts: (el: ELE, target: ELE, source: ELE, sibling: ELE) => {
            const targetId: any = target?.getAttribute('data-drop') || ""
            const sourceId = source?.getAttribute('data-drop') || ""
            const targetOptions: any = getProps(target)
            const sourceOptions = getProps(source)
            const disabled = sourceOptions?.disabled || targetOptions?.disabled
            const selfOnly = sourceOptions?.selfOnly || targetOptions?.selfOnly

            if (disabled) {
               return false
            }
            if (selfOnly && targetId !== sourceId) {
               return false
            }
            if (targetOptions && targetOptions.accepts) {
               return targetOptions.accepts({ el, target, source, sibling }) as any || false
            }
            return settings.accepts ? settings.accepts({ el, target, source, sibling }) as any : true
         },
         moves: (el: ELE, container: ELE, handle: ELE, sibling: ELE) => {
            const sourceId = el?.parentElement?.getAttribute('data-drop') || ""
            const sourceOptions = droppables[sourceId]

            if (sourceOptions?.disabled) {
               return false
            }
            return settings.moves ? settings.moves({ el, container, handle, sibling }) as any : true
         }
      } as any) as any
   })
   wrapper = WrapperFactory.get(wrapperId) as WrapperProps
   let fromIndex: number | null = null;


   const instance = wrapper.instance

   instance.on("dragend", (el: ELE) => {
      const props = getElProps(el)
      props?.onDragend && props?.onDragend({ el })
      onDragend && onDragend({ el })
   })

   instance.on("cancel", (el: ELE, container: ELE, source: ELE) => {
      const props = getProps(container)
      props?.onCalcel && props?.onCalcel({ el, container, source })
      onCalcel && onCalcel({ el, container, source })
   })

   instance.on("remove", (el: ELE, container: ELE, source: ELE) => {
      const props = getProps(container)
      props?.onRemove && props?.onRemove({ el, container, source })
      onRemove && onRemove({ el, container, source })
   })

   instance.on("shadow", (el: ELE, container: ELE, source: ELE) => {
      const props = getProps(container)
      props?.onShadow && props?.onShadow({ el, container, source })
      onShadow && onShadow({ el, container, source })
   })

   instance.on("over", (el: ELE, container: ELE, source: ELE) => {
      const props = getProps(container)
      props?.onOver && props?.onOver({ el, container, source })
      onOver && onOver({ el, container, source })
   })
   instance.on("out", (el: ELE, container: ELE, source: ELE) => {
      const props = getProps(container)
      props?.onOut && props?.onOut({ el, container, source })
      onOut && onOut({ el, container, source })
   })

   instance.on("cloned", (clone: ELE, original: ELE, type: "copy" | "mirror") => {
      const props = getElProps(original)
      props?.onCloned && props?.onCloned({ clone, original, type })
      onCloned && onCloned({ clone, original, type })
   })

   instance.on('drag', (el: ELE, source: ELE) => {
      fromIndex = el?.parentElement && Array.from(el?.parentElement.children).indexOf(el)
      const props = getElProps(source)
      props?.onDrag && props?.onDrag({ el, source })
      onDrag && onDrag({ el, source })
   })

   instance.on('drop', (el: ELE, target: ELE, source: ELE, sibling: ELE) => {
      const targetProps = getProps(target)
      const sourceProps = getProps(source)
      const toIndex = el?.parentElement && Array.from(el?.parentElement.children).indexOf(el)
      targetProps?.onDrop && targetProps?.onDrop({ fromIndex, toIndex, el, target, source, sibling })

      onDrop && onDrop({ el, target, source, sibling })
      sourceProps && sourceProps.observe()
      targetProps && targetProps.observe()

      setTimeout(() => {
         instance?.destroy()
         refreshBuilder(wrapperId)
      }, 50)
   })
}