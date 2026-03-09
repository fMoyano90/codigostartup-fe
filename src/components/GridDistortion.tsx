'use client'

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

interface GridDistortionProps {
  grid?: number
  mouse?: number
  strength?: number
  relaxation?: number
  className?: string
}

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// Procedural dot-grid that warps with mouse movement
const fragmentShader = `
uniform sampler2D uDataTexture;
uniform vec4 resolution;
uniform float time;
varying vec2 vUv;

void main() {
  // Read distortion offset from data texture
  vec4 offset = texture2D(uDataTexture, vUv);

  // Distorted UV
  vec2 uv = vUv + 0.018 * offset.rg;

  // Aspect-corrected UV for the dot grid
  vec2 aspect = vec2(resolution.x / resolution.y, 1.0);
  vec2 gridUv = uv * aspect * 28.0;

  // Dot pattern
  vec2 cell = fract(gridUv) - 0.5;
  float dist = length(cell);
  float dot = 1.0 - smoothstep(0.12, 0.18, dist);

  // Color: volt yellow tint on dots, transparent background
  vec3 voltColor = vec3(0.992, 0.784, 0.157); // #fdc828
  float alpha = dot * 0.22;

  // Subtle glow boost near mouse (where offset magnitude is high)
  float warp = length(offset.rg) * 0.15;
  alpha += dot * warp * 2.2;
  alpha = clamp(alpha, 0.0, 0.55);

  gl_FragColor = vec4(voltColor, alpha);
}
`

const GridDistortion: React.FC<GridDistortionProps> = ({
  grid = 18,
  mouse = 0.12,
  strength = 0.18,
  relaxation = 0.91,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationIdRef = useRef<number | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.innerHTML = ''
    container.appendChild(renderer.domElement)

    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000)
    camera.position.z = 2

    const size = grid
    const data = new Float32Array(4 * size * size)
    const dataTexture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType)
    dataTexture.needsUpdate = true

    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector4() },
      uDataTexture: { value: dataTexture },
    }

    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    })

    const geometry = new THREE.PlaneGeometry(1, 1, size - 1, size - 1)
    const plane = new THREE.Mesh(geometry, material)
    scene.add(plane)

    const handleResize = () => {
      const rect = container.getBoundingClientRect()
      const w = rect.width, h = rect.height
      if (w === 0 || h === 0) return
      const aspect = w / h
      renderer.setSize(w, h)
      plane.scale.set(aspect, 1, 1)
      const fH = 1, fW = fH * aspect
      camera.left = -fW / 2; camera.right = fW / 2
      camera.top = fH / 2; camera.bottom = -fH / 2
      camera.updateProjectionMatrix()
      uniforms.resolution.value.set(w, h, 1, 1)
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(container)
    resizeObserverRef.current = ro
    handleResize()

    const mouse = { x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 }

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = 1 - (e.clientY - rect.top) / rect.height
      mouse.vX = x - mouse.prevX
      mouse.vY = y - mouse.prevY
      Object.assign(mouse, { x, y, prevX: x, prevY: y })
    }
    const onLeave = () => Object.assign(mouse, { x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 })

    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      uniforms.time.value += 0.05

      const d = dataTexture.image.data as Float32Array
      for (let i = 0; i < size * size; i++) {
        d[i * 4] *= relaxation
        d[i * 4 + 1] *= relaxation
      }
      const gx = size * mouse.x, gy = size * mouse.y
      const maxD = size * 0.12
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const dSq = (gx - i) ** 2 + (gy - j) ** 2
          if (dSq < maxD * maxD) {
            const idx = 4 * (i + size * j)
            const pow = Math.min(maxD / Math.sqrt(dSq), 10)
            d[idx]     += strength * 100 * mouse.vX * pow
            d[idx + 1] -= strength * 100 * mouse.vY * pow
          }
        }
      }
      dataTexture.needsUpdate = true
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current)
      ro.disconnect()
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      dataTexture.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [grid, mouse, strength, relaxation])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{ width: '100%', height: '100%', minWidth: 0, minHeight: 0 }}
    />
  )
}

export default GridDistortion
