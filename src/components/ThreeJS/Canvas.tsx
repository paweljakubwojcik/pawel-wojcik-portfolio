import { graphql, useStaticQuery } from 'gatsby'
import React, { useEffect } from 'react'
import {
  Mesh,
  SphereBufferGeometry,
  Color,
  MeshStandardMaterial,
  PointLight,
  Plane,
  Vector3,
  Group,
  DoubleSide,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import useThree from '../../hooks/useThree'
import * as dat from 'dat.gui'
import { useTheme } from 'styled-components'
import IconSatelite from './IconSatelite'

// TODO: Split up threejs elements into canvas, light, moons and other stuff

export default function Cnavas() {
  const {
    texture: { publicURL: MOON_TEXTURE },
    displaycment: { publicURL: DISPLAYCMENT_MAP },
    skills: { nodes: icons },
  } = useStaticQuery(graphql`
    query Moon {
      texture: file(name: { eq: "moon_texture" }) {
        publicURL
      }
      displaycment: file(name: { eq: "moon_displaycment_map" }) {
        publicURL
      }
      skills: allGraphCmsSkill {
        nodes {
          icon {
            url
          }
        }
      }
    }
  `)

  const {
    colors: {
      palette: { green, pink },
    },
  } = useTheme()

  const { canvas, canvasRef, camera, renderer, render, scene, clock, textureLoader } = useThree()

  const createMoon = () => {
    const geometry = new SphereBufferGeometry(1, 128, 128)

    // texture loader is async, so it takes callback
    const moonTexture = textureLoader.load(
      MOON_TEXTURE,
      () => render(),
      () => {},
      (error) => {
        throw error
      }
    )
    const moonDisp = textureLoader.load(
      DISPLAYCMENT_MAP,
      () => render(),
      () => {},
      (error) => {
        throw error
      }
    )

    const group = new Group()

    /* const clipPlanes = [new Plane(new Vector3(0, up ? -1 : 1, 0), -0.01)] */

    // Materials
    const material = new MeshStandardMaterial({
      color: new Color('#ffffff'),
      displacementMap: moonDisp,
      displacementScale: 0.02,
      map: moonTexture,
     /*  clippingPlanes: clipPlanes,
      clipIntersection: true, */
      side: DoubleSide,
    })

    const moon = new Mesh(geometry, material)

    return moon
  }

  useEffect(() => {
    if (canvas) {
      console.log('creating view')

      camera.position.set(0, 0, 3)
      renderer.setSize(window?.innerWidth, window?.innerHeight)

      const pointLight = new PointLight('#ffffff', 0.6)
      pointLight.position.set(0, -1, 7)
      scene.add(pointLight)

      const pinkLight = new PointLight(pink.main, 0.9)
      pinkLight.position.set(-2, -3, 10)
      pinkLight.castShadow = true
      scene.add(pinkLight)

      pinkLight.shadow.mapSize.width = 512 // default
      pinkLight.shadow.mapSize.height = 512 // default
      pinkLight.shadow.camera.near = 0.5 // default
      pinkLight.shadow.camera.far = 500 // default

      // helpers
      /* const gui = new dat.GUI() */

      /* gui.add(camera.position, 'x', -10, 100, 1)
      gui.add(camera.position, 'y', -10, 100, 1)
      gui.add(camera.position, 'z', -10, 100, 1)
      gui.add(camera, 'fov', -10, 10000, 100)
      gui.add(camera, 'far', -10, 10000, 10)
      gui.add(camera, 'near', -10, 10, 0.1)
 */

      const group = new Group()
      const moon = createMoon()
      const moon2 = createMoon()
      moon.receiveShadow = true
      group.add(moon)
      //group.add(moon2)
      const iconsSatelites: IconSatelite[] = icons.map((icon) => new IconSatelite(icon.icon.url, {}))
      iconsSatelites.forEach((iconSatelite) => group.add(iconSatelite.mesh))

      group.position.set(1, 0, 0)
      scene.add(group)
      camera.updateProjectionMatrix()

      let targetPosition = { x: 0, y: 0, z: 0 }

      window.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) * 0.0001
        const y = (e.clientY - window.innerHeight / 2) * 0.0001

        targetPosition = { x: 0 + x, y: 0 - y, z: 0 }
      })

      const tick = () => {
        const elapsedTime = clock.getElapsedTime()

        // Update objects
        moon.rotation.y = 0.05 * elapsedTime
        moon2.rotation.y = -0.05 * elapsedTime
        iconsSatelites.forEach((iconSatelite) => iconSatelite.updatePosition(elapsedTime))

        moon.position.x += 0.05 * (targetPosition.x - moon.position.x)
        moon.position.z += 0.05 * (targetPosition.z - moon.position.z)

        group.position.y += 0.05 * (targetPosition.y - group.position.y)
        moon2.position.x += 0.05 * (-targetPosition.x - moon2.position.x)
        moon2.position.z += 0.05 * (targetPosition.z - moon2.position.z)

        // Render
        render()

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
      }
      tick()
    }
  }, [canvas, camera, renderer, render, scene])

  return (
    <div
      ref={canvasRef}
      style={{
        position: 'absolute',
        zIndex: 0,
        left: 0,
      }}
    ></div>
  )
}
