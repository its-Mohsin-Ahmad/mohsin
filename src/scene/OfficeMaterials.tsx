import { useMemo } from 'react'
import * as THREE from 'three'

/**
 * Centralised PBR materials reused across the whole office. Sharing material
 * instances keeps draw-call overhead and memory low and keeps the palette
 * consistent with the design system.
 */
export default function useOfficeMaterials() {
  return useMemo(() => {
    // Natural oak flooring — warm, low roughness, subtle sheen.
    const oak = new THREE.MeshStandardMaterial({
      color: '#b98a54',
      roughness: 0.55,
      metalness: 0.05,
    })

    // Slightly darker walnut for trims and feature walls.
    const walnut = new THREE.MeshStandardMaterial({
      color: '#6b4a2f',
      roughness: 0.6,
      metalness: 0.05,
    })

    // Off-white walls.
    const wall = new THREE.MeshStandardMaterial({
      color: '#e7e2d8',
      roughness: 0.9,
      metalness: 0.0,
    })

    // Darker interior wall for contrast on cut faces.
    const wallDark = new THREE.MeshStandardMaterial({
      color: '#cdc6b8',
      roughness: 0.9,
      metalness: 0.0,
    })

    // Glass partitions — soft gray, realistic transparency.
    const glass = new THREE.MeshPhysicalMaterial({
      color: '#cfe0e6',
      roughness: 0.05,
      metalness: 0.0,
      transparent: true,
      opacity: 0.28,
      transmission: 0.6,
      thickness: 0.4,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
    })

    // Frosted glass.
    const frosted = new THREE.MeshPhysicalMaterial({
      color: '#e6edeF',
      roughness: 0.5,
      metalness: 0.0,
      transparent: true,
      opacity: 0.6,
    })

    // Brushed metal for frames, legs, fixtures.
    const metal = new THREE.MeshStandardMaterial({
      color: '#9aa4ab',
      roughness: 0.35,
      metalness: 0.85,
    })

    // Dark metal.
    const metalDark = new THREE.MeshStandardMaterial({
      color: '#3a4249',
      roughness: 0.4,
      metalness: 0.8,
    })

    // Fabric for seating.
    const fabric = new THREE.MeshStandardMaterial({
      color: '#3d4a52',
      roughness: 0.95,
      metalness: 0.0,
    })

    const fabricWarm = new THREE.MeshStandardMaterial({
      color: '#7a5b43',
      roughness: 0.95,
      metalness: 0.0,
    })

    // Screen / monitor glass.
    const screen = new THREE.MeshStandardMaterial({
      color: '#0a0f13',
      roughness: 0.15,
      metalness: 0.3,
      emissive: '#0d1b24',
      emissiveIntensity: 0.4,
    })

    // Gold accent (MA branding, highlights).
    const gold = new THREE.MeshStandardMaterial({
      color: '#D9AE63',
      roughness: 0.25,
      metalness: 0.9,
      emissive: '#3a2c12',
      emissiveIntensity: 0.3,
    })

    // Plant foliage.
    const foliage = new THREE.MeshStandardMaterial({
      color: '#6f8a6a',
      roughness: 0.85,
      metalness: 0.0,
    })

    const foliageDark = new THREE.MeshStandardMaterial({
      color: '#587a55',
      roughness: 0.85,
      metalness: 0.0,
    })

    // Paper / documents.
    const paper = new THREE.MeshStandardMaterial({
      color: '#f2efe6',
      roughness: 0.95,
      metalness: 0.0,
    })

    // Ceiling.
    const ceiling = new THREE.MeshStandardMaterial({
      color: '#1b232a',
      roughness: 0.95,
      metalness: 0.0,
    })

    return {
      oak,
      walnut,
      wall,
      wallDark,
      glass,
      frosted,
      metal,
      metalDark,
      fabric,
      fabricWarm,
      screen,
      gold,
      foliage,
      foliageDark,
      paper,
      ceiling,
    }
  }, [])
}

export type OfficeMaterials = ReturnType<typeof useOfficeMaterials>

export { THREE }
