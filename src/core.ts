import { StateProps, WrapperProps } from './types'
import { DragulaOptions, Drake } from 'dragula'
let dragula: (containers: Element[], options?: DragulaOptions) => Drake;
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

   const STATE: StateProps = {
      fromIndex: undefined,
      toIndex: undefined,
      target: undefined,
      source: undefined,
      handler: undefined,
      el: undefined,
      targetSibling: undefined,
      sourceSibling: undefined,
      shadow: undefined,
      clone: undefined,
      original: undefined,
      type: undefined,
      sourceProps: undefined,
      targetProps: undefined
   }


   wrapper.instance && wrapper.instance.destroy()
   WrapperFactory.set(wrapperId, {
      ...wrapper,
      instance: dragula(Array.from(containers), {
         ...settings,
         accepts: (el: HTMLElement, target: HTMLElement, source: HTMLElement, sibling: HTMLElement) => {
            const targetId: any = target?.getAttribute('data-drop') || ""
            const sourceId = source?.getAttribute('data-drop') || ""
            const targetOptions: any = droppables[targetId]
            const sourceOptions = droppables[sourceId]
            const disabled = sourceOptions?.disabled || targetOptions?.disabled
            const selfOnly = sourceOptions?.selfOnly || targetOptions?.selfOnly

            const idx: any = el?.parentNode && Array.from(el.parentNode.children).indexOf(el)
            if (!isNaN(idx)) {
               STATE.toIndex = idx
            }
            STATE.target = target
            STATE.targetSibling = sibling
            STATE.targetProps = targetOptions

            if (disabled) {
               return false
            }
            if (selfOnly && targetId !== sourceId) {
               return false
            }

            if (targetOptions && targetOptions.accepts) {
               return targetOptions.accepts(STATE) as any || false
            }

            return settings.accepts ? settings.accepts(STATE) as any : true
         },
         moves: (el: HTMLElement, source: HTMLElement, handle: HTMLElement, sibling: HTMLElement) => {
            const sourceId = el?.parentElement?.getAttribute('data-drop') || ""
            const sourceOptions = droppables[sourceId]

            const idx: any = el?.parentNode && Array.from(el.parentNode.children).indexOf(el)
            if (!isNaN(idx)) {
               STATE.fromIndex = idx
            }
            STATE.source = source
            STATE.sourceSibling = sibling
            STATE.handler = handle
            STATE.el = el
            STATE.sourceProps = sourceOptions

            if (sourceOptions?.disabled) {
               return false
            }
            return settings.moves ? settings.moves(STATE) as any : true
         }
      } as any) as any
   })
   wrapper = WrapperFactory.get(wrapperId) as WrapperProps

   const instance = wrapper.instance

   instance.on("dragend", () => {
      if (STATE.targetProps?.onDragend) {
         STATE.targetProps?.onDragend(STATE)
      }
      onDragend && onDragend(STATE)
   })

   instance.on("cancel", () => {
      if (STATE.sourceProps?.onCalcel) {
         STATE.sourceProps?.onCalcel(STATE)
      }
      onCalcel && onCalcel(STATE)
   })

   instance.on("remove", () => {
      if (STATE.sourceProps?.onRemove) {
         STATE.sourceProps?.onRemove(STATE)
      }
      onRemove && onRemove(STATE)
   })

   instance.on("shadow", (el) => {
      STATE.shadow = el
      if (STATE.targetProps?.onShadow) {
         STATE.targetProps?.onShadow(STATE)
      }
      onShadow && onShadow(STATE)
   })

   instance.on("over", () => {
      if (STATE.targetProps?.onOver) {
         STATE.targetProps?.onOver(STATE)
      }
      onOver && onOver(STATE)
   })
   instance.on("out", () => {
      if (STATE.sourceProps?.onOut) {
         STATE.sourceProps?.onOut(STATE)
      }
      onOut && onOut(STATE)
   })

   instance.on("cloned", (clone: HTMLElement, original: HTMLElement, type: "copy" | "mirror") => {
      STATE.clone = clone
      STATE.original = original
      STATE.type = type

      if (STATE.sourceProps?.onCloned) {
         STATE.sourceProps?.onCloned(STATE)
      }
      onCloned && onCloned(STATE)
   })

   instance.on('drag', () => {
      if (STATE.sourceProps?.onDrag) {
         STATE.sourceProps?.onDrag(STATE)
      }
      onDrag && onDrag(STATE)
   })

   instance.on('drop', () => {
      if (STATE.targetProps?.onDrop) {
         STATE.targetProps?.onDrop(STATE)
      }
      onDrop && onDrop(STATE)
      if (STATE.sourceProps) STATE.sourceProps.observe()
      if (STATE.targetProps) STATE.targetProps.observe()

      setTimeout(() => {
         instance?.destroy()
         refreshBuilder(wrapperId)
      }, 50)
   })
}