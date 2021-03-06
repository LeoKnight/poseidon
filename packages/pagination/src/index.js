import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Input from '@zcool/input'
import theme from '@zcool/theme'
import { T } from '@zcool/util'

export const JumperInput = styled(Input)`
  width: 56px;
  height: 100%;
  border: none;
  border-bottom: 2px solid ${T('palette.black')};
  text-align: center;
  font-size: ${T('font.size.sm')}px;
  padding: 0;

  &:focus {
    border-color: ${T('palette.black')};
    box-shadow: none;
    outline: none;
  }
`

export const UL = styled.ul`
  display: flex;
  padding-left: 0;
  list-style: none;
  margin: 0;
  font-size: ${T('font.size.sm')}px;
  & > li:last-child {
    color: ${T('palette.spruce')};
    letter-spacing: 0;
    text-align: center;
  }

  & > li[role] {
    cursor: pointer;
  }
`

export const LI = styled.li`
  height: 24px;
  display: flex;
  align-items: center;

  & > button {
    cursor: inherit;
    border: none;
    outline: none;
    height: 100%;
    line-height: 1;
    background: transparent;
    padding: 0 ${T('spacing.sm')}px;

    &[disabled],
    &[disabled] [data-icon='true'] {
      cursor: not-allowed;
    }
  }
`

export const Count = styled.span`
  color: ${T('palette.black')};
  margin: 0 4px;
`

function Pagination(props) {
  const { total, className, onChange, current, defaultCurrent } = props
  const initialState = current || defaultCurrent || 1

  const [currentPage, setCurrentPage] = useState(initialState)
  const [currentInput, setCurrentInput] = useState(initialState)

  useEffect(
    () => {
      if (onChange) {
        onChange(currentPage)
      }
    },
    [currentPage]
  )

  function handleChange(e) {
    const value = parseInt(e.target.value, 10)

    if (Number.isNaN(value) || value <= 0) {
      setCurrentInput('')
    } else {
      setCurrentInput(value)
    }
  }

  function handleBlur() {
    setCurrentInput(currentPage)
  }

  function handleKeyUp(e) {
    if (e.keyCode === 13) {
      let targetCurrent = currentInput
      if (targetCurrent > total) {
        targetCurrent = total
      }

      setCurrentPage(targetCurrent)
      setCurrentInput(targetCurrent)
    }
  }

  function handleNext() {
    if (currentPage >= total) return

    setCurrentPage(currentPage + 1)
    setCurrentInput(currentPage + 1)
  }

  function handlePrev() {
    if (currentPage === 1) return

    setCurrentPage(currentPage - 1)
    setCurrentInput(currentPage - 1)
  }

  return (
    <UL className={className}>
      <LI onClick={handlePrev} role="prev">
        <button disabled={currentPage === 1}>&lt;</button>
      </LI>
      <LI>
        <JumperInput
          type="text"
          onKeyUp={handleKeyUp}
          value={currentInput}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </LI>
      <LI onClick={handleNext} role="next">
        <button disabled={currentPage >= total}>&gt;</button>
      </LI>
      <LI>
        总页数<Count>{total}</Count>页
      </LI>
    </UL>
  )
}

Pagination.displayName = 'Pagination'

Pagination.defaultProps = {
  theme
}

export default Pagination
