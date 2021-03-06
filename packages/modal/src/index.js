import React from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'
import theme from '@zcool/theme'
import { T, zIndex } from '@zcool/util'
import Icon from '@zcool/icon'
import Spinner from '@zcool/spinner'

const ModalContainer = styled.div`
  text-align: center;
  margin: auto;

  overflow-y: auto;
  overflow-x: hidden;

  .modal__close {
    display: flex;
    position: absolute;
    right: ${T('spacing.xs')}px;
    top: 4px;
    padding: ${T('spacing.sm')}px;
    cursor: pointer;

    &.loading {
      pointer-events: none;
    }
  }

  .modal__header {
    line-height: 56px;
    background: #f5f8fa;
  }

  .modal__body {
    height: auto;
    padding: ${T('spacing.xl')}px;
  }

  .modal__footer {
    margin-bottom: ${T('spacing.xl')}px;
  }
`

function Modal(props) {
  const MODAL_STYLES = {
    content: {
      margin: 'auto',
      width: 528,
      border: 0,
      padding: 0,
      borderRadius: 0,
      bottom: 'auto',
      minHeight: '10rem',
      left: '50%',
      position: 'fixed',
      right: 'auto',
      top: '50%',
      transform: 'translate(-50%,-50%)',
      minWidth: '20rem',
      maxWidth: '60rem'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: zIndex.modal
    }
  }

  const {
    width,
    height,
    title,
    footer,
    children,
    loading,
    loadingPositionTop,
    onRequestClose,
    style,
    ariaHideApp,
    shouldCloseOnOverlayClick,
    ...rest
  } = props

  if (style && style.content) {
    Object.assign(MODAL_STYLES.content, style.content)
  }

  if (style && style.overlay) {
    Object.assign(MODAL_STYLES.overlay, style.overlay)
  }

  if (width) {
    MODAL_STYLES.content.width = width
  }

  if (height) {
    MODAL_STYLES.content.height = height
  }

  return (
    <ReactModal
      ariaHideApp={ariaHideApp}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      style={MODAL_STYLES}
      {...rest}
    >
      <ModalContainer theme={props.theme}>
        <span
          className={`modal__close ${loading ? 'loading' : ''}`}
          onClick={onRequestClose}
        >
          <Icon glyph="close" />
        </span>
        {title ? <div className="modal__header">{title}</div> : null}
        <Spinner spinning={loading} top={loadingPositionTop}>
          <div className="modal__body">{children}</div>
          {footer ? <div className="modal__footer">{footer}</div> : null}
        </Spinner>
      </ModalContainer>
    </ReactModal>
  )
}

Modal.displayName = 'Modal'

Modal.defaultProps = {
  theme,
  loading: false,
  ariaHideApp: false,
  shouldCloseOnOverlayClick: false
}

export default Modal
