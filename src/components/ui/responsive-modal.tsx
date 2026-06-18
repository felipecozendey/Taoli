import * as React from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer'

export const ResponsiveModalContext = React.createContext<{ isMobile: boolean }>({
  isMobile: false,
})

export function ResponsiveModal({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()

  return (
    <ResponsiveModalContext.Provider value={{ isMobile }}>
      {isMobile ? (
        <Drawer open={open} onOpenChange={onOpenChange}>
          {children}
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={onOpenChange}>
          {children}
        </Dialog>
      )}
    </ResponsiveModalContext.Provider>
  )
}

export function ResponsiveModalTrigger({
  children,
  asChild,
}: {
  children: React.ReactNode
  asChild?: boolean
}) {
  const { isMobile } = React.useContext(ResponsiveModalContext)
  return isMobile ? (
    <DrawerTrigger asChild={asChild}>{children}</DrawerTrigger>
  ) : (
    <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
  )
}

export function ResponsiveModalContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { isMobile } = React.useContext(ResponsiveModalContext)
  return isMobile ? (
    <DrawerContent className={className}>{children}</DrawerContent>
  ) : (
    <DialogContent className={className}>{children}</DialogContent>
  )
}

export function ResponsiveModalHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { isMobile } = React.useContext(ResponsiveModalContext)
  return isMobile ? (
    <DrawerHeader className={className}>{children}</DrawerHeader>
  ) : (
    <DialogHeader className={className}>{children}</DialogHeader>
  )
}

export function ResponsiveModalTitle({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { isMobile } = React.useContext(ResponsiveModalContext)
  return isMobile ? (
    <DrawerTitle className={className}>{children}</DrawerTitle>
  ) : (
    <DialogTitle className={className}>{children}</DialogTitle>
  )
}

export function ResponsiveModalDescription({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { isMobile } = React.useContext(ResponsiveModalContext)
  return isMobile ? (
    <DrawerDescription className={className}>{children}</DrawerDescription>
  ) : (
    <DialogDescription className={className}>{children}</DialogDescription>
  )
}

export function ResponsiveModalFooter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { isMobile } = React.useContext(ResponsiveModalContext)
  return isMobile ? (
    <DrawerFooter className={className}>{children}</DrawerFooter>
  ) : (
    <DialogFooter className={className}>{children}</DialogFooter>
  )
}

export function ResponsiveModalClose({
  children,
  asChild,
}: {
  children: React.ReactNode
  asChild?: boolean
}) {
  const { isMobile } = React.useContext(ResponsiveModalContext)
  return isMobile ? (
    <DrawerClose asChild={asChild}>{children}</DrawerClose>
  ) : (
    <DialogClose asChild={asChild}>{children}</DialogClose>
  )
}
