import React, { FC, ReactElement, useEffect, useMemo } from 'react'
import { WrapperProps } from '../types'
import { setCurrentWrapperID, getCurrentWrapperID, refreshBuilder, WrapperFactory } from '../core'

interface Props extends Omit<WrapperProps, 'droppables' | 'instance'> {
   children: ReactElement
}

const DraggableWrapper: FC<Props> = ({ children, id, ...wrapperProps }) => {

   const prevWrapper = useMemo(() => {
      const pw = getCurrentWrapperID()
      setCurrentWrapperID(id)
      WrapperFactory.set(id, { id, ...wrapperProps, droppables: {}, instance: null as any })
      return pw
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   useEffect(() => {
      setCurrentWrapperID(prevWrapper)
      refreshBuilder(id)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   return (
      <div data-wrapper={id}>
         {children}
      </div>
   )
}

export default DraggableWrapper

