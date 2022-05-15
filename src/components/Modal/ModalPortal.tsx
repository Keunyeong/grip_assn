import ReactDom from 'react-dom'

interface Props {
  children: React.ReactNode
}

const ModalPortal = (props: Props) => {
  const { children } = props
  const el = document.getElementById('modal') as Element
  return ReactDom.createPortal(children, el)
}

export default ModalPortal
