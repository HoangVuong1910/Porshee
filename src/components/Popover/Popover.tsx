/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState, useId, ElementType } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
  FloatingPortal,
  FloatingArrow,
  arrow,
  useHover,
  safePolygon,
  type Placement
} from '@floating-ui/react'
import { AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  placement?: Placement
}

export default function Popover({
  children,
  renderPopover,
  className,
  as: Element = 'div',
  placement = 'bottom-end'
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const id = useId()
  const arrowRef = useRef(null)
  const { refs, floatingStyles, context } = useFloating({
    middleware: [
      arrow({
        element: arrowRef
      }),
      offset(6),
      flip(),
      shift()
    ],
    placement: placement,
    whileElementsMounted: autoUpdate,
    open: isOpen,
    onOpenChange: setIsOpen
  })
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)
  const hover = useHover(context, { restMs: 50, handleClose: safePolygon() }) // props này để hover ra khỏi vùng an toàn của popover nó vẫn show ra chứ ko tắt liền

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role, hover])
  return (
    <Element
      // className='flex items-center py-1 hover:text-gray-300 cursor-pointer'
      className={className}
      ref={refs.setReference}
      {...getReferenceProps()}
    >
      {children}

      <FloatingPortal id={id}>
        <AnimatePresence mode='wait' initial={false}>
          {isOpen && (
            <FloatingFocusManager context={context} modal={false}>
              <div
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
                // key='modal'
                // initial={{
                //   opacity: 0,
                //   transform: 'scale(0)',
                //   position: 'relative',
                //   top: '20px',
                //   right: 0,
                //   left: 0
                // }}
                // animate={{ opacity: 1, transform: 'scale(1)' }}
                // exit={{ opacity: 0, transform: 'scale(0)' }}
                // transition={{ duration: 0.2 }}
              >
                <FloatingArrow ref={arrowRef} context={context} className='text-white' fill='white' />
                {/* <div className='bg-white relative shadow-md rounded-sm border border-gray-300'>
                  <div className='flex flex-col py-2 px-3'>
                    <button className='py-2 px-3 hover:text-orange border-none outline-none'>Tiếng Việt</button>
                    <button className='py-2 px-3 hover:text-orange border-none outline-none mt-2'>English</button>
                  </div>
                </div> */}
                {renderPopover}
              </div>
            </FloatingFocusManager>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
