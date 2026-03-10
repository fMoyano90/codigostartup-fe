'use client'

import React, { CSSProperties, useEffect, useRef, useState, useMemo, PropsWithChildren } from 'react'
import * as math from 'mathjs'

type GradualBlurProps = PropsWithChildren<{
  position?: 'top' | 'bottom' | 'left' | 'right'
  strength?: number
  height?: string
  width?: string
  divCount?: number
  exponential?: boolean
  zIndex?: number
  animated?: boolean | 'scroll'
  duration?: string
  easing?: string
  opacity?: number
  curve?: 'linear' | 'bezier' | 'ease-in' | 'ease-out' | 'ease-in-out'
  className?: string
  style?: CSSProperties
}>

const CURVE_FUNCTIONS: Record<string, (p: number) => number> = {
  linear: p => p,
  bezier: p => p * p * (3 - 2 * p),
  'ease-in': p => p * p,
  'ease-out': p => 1 - Math.pow(1 - p, 2),
  'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2),
}

const getGradientDirection = (position: string): string => {
  const directions: Record<string, string> = {
    top: 'to top',
    bottom: 'to bottom',
    left: 'to left',
    right: 'to right',
  }
  return directions[position] || 'to bottom'
}

const GradualBlur: React.FC<GradualBlurProps> = ({
  position = 'bottom',
  strength = 2,
  height = '6rem',
  width,
  divCount = 5,
  exponential = false,
  zIndex = 10,
  opacity = 1,
  curve = 'linear',
  className = '',
  style = {},
  children,
}) => {
  const isVertical = ['top', 'bottom'].includes(position)

  const blurDivs = useMemo(() => {
    const divs: React.ReactNode[] = []
    const increment = 100 / divCount
    const curveFunc = CURVE_FUNCTIONS[curve] || CURVE_FUNCTIONS.linear

    for (let i = 1; i <= divCount; i++) {
      let progress = i / divCount
      progress = curveFunc(progress)

      let blurValue: number
      if (exponential) {
        blurValue = Number(math.pow(2, progress * 4)) * 0.0625 * strength
      } else {
        blurValue = 0.0625 * (progress * divCount + 1) * strength
      }

      const p1 = Math.round((increment * i - increment) * 10) / 10
      const p2 = Math.round(increment * i * 10) / 10
      const p3 = Math.round((increment * i + increment) * 10) / 10
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10

      let gradient = `transparent ${p1}%, black ${p2}%`
      if (p3 <= 100) gradient += `, black ${p3}%`
      if (p4 <= 100) gradient += `, transparent ${p4}%`

      const direction = getGradientDirection(position)

      const divStyle: CSSProperties = {
        maskImage: `linear-gradient(${direction}, ${gradient})`,
        WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        opacity,
        position: 'absolute',
        inset: 0,
      }

      divs.push(<div key={i} style={divStyle} />)
    }

    return divs
  }, [position, strength, divCount, exponential, opacity, curve])

  const containerStyle: CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex,
    ...(isVertical
      ? { height, width: width || '100%', [position]: 0, left: 0, right: 0 }
      : { width: width || height, height: '100%', [position]: 0, top: 0, bottom: 0 }),
    ...style,
  }

  return (
    <div className={className} style={containerStyle}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>{blurDivs}</div>
      {children && <div style={{ position: 'relative' }}>{children}</div>}
    </div>
  )
}

export default React.memo(GradualBlur)
