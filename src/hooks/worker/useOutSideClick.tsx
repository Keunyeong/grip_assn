import { useEffect } from 'react'

interface Props {
  ref: React.MutableRefObject<HTMLElement>
  handler: Function
}

export function useOnClickOutside(props: Props) {
  const { ref, handler } = props
  useEffect(() => {
    const listener = (event: React.MouseEvent | React.TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.currentTarget)) {
        return
      }
      handler(event)
    }
    document.addEventListener('mousedown', () => listener)
    document.addEventListener('touchstart', () => listener)
    return () => {
      document.removeEventListener('mousedown', () => listener)
      document.removeEventListener('touchstart', () => listener)
    }
  }, [ref, handler])
}
