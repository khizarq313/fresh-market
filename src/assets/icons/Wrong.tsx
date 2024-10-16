import React from 'react'

const Wrong = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><filter id="close_svg__a" width="136.7%" height="135.5%" x="-18.3%" y="-17.8%" filterUnits="objectBoundingBox"><feMorphology in="SourceAlpha" operator="dilate" radius="9" result="shadowSpreadOuter1"></feMorphology><feOffset dx="2" dy="12" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset><feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="14"></feGaussianBlur><feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"></feColorMatrix><feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs><g fillRule="evenodd" filter="url(#close_svg__a)" transform="translate(-421 -24)"><path d="m439.77 28 1.23 1.23-6.77 6.77 6.77 6.77-1.23 1.23-6.77-6.77-6.77 6.77-1.23-1.23 6.769-6.77L425 29.23l1.23-1.23 6.77 6.769L439.77 28z"></path></g></svg>
  )
}

export default Wrong