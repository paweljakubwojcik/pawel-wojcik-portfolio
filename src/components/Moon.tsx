import { graphql, useStaticQuery } from 'gatsby'
import React, { useMemo, useCallback, useState, useEffect } from 'react'
import { TextureLoader, Mesh, SphereBufferGeometry, Color, MeshStandardMaterial, PointLight } from 'three'
import useThree from '../hooks/useThree'
import * as dat from 'dat.gui'

export default function Moon() {
  const {
    file: { publicURL: MOON_TEXTURE },
  } = useStaticQuery(graphql`
    query Moon {
      file(name: { eq: "moon_texture" }) {
        publicURL
      }
    }
  `)

  const { canvas, canvasRef, camera, renderer, render, scene, clock } = useThree()

  useEffect(() => {
    if (canvas) {
      console.log('creating view')

      camera.position.set(0, 0, 1.5)
      renderer.setSize(window?.innerWidth, window?.innerHeight)

      const geometry = new SphereBufferGeometry(1, 128, 128)

      // texture loader is async, so it takes callback
      const textureLoader = new TextureLoader()
      const moonTexture = textureLoader.load(
        MOON_TEXTURE,
        () => render(),
        () => {},
        (error) => {
          throw error
        }
      )

      const pointLight = new PointLight(0xffffff, 0.6)
      pointLight.position.set(0, -1, 7)
      scene.add(pointLight)

      const orangeLight = new PointLight(0xf26b2c, 0.7)
      orangeLight.position.set(10, 3, 0)
      scene.add(orangeLight)

      const gui = new dat.GUI()

      gui.add(pointLight.position, 'x', -10, 10, 1)
      gui.add(pointLight.position, 'y', -10, 10, 1)
      gui.add(pointLight.position, 'z', -10, 10, 1)
      gui.add(pointLight, 'intensity', -0, 1, 0.1)

      gui.add(orangeLight.position, 'x', -10, 10, 1)
      gui.add(orangeLight.position, 'y', -10, 10, 1)
      gui.add(orangeLight.position, 'z', -10, 10, 1)
      gui.add(orangeLight, 'intensity', -0, 1, 0.1)

      // Materials
      const material = new MeshStandardMaterial({
        color: new Color(0xffffff),
        /*  displacementMap: moonTextureDisplaycment,
        displacementScale: 0.01, */
        map: moonTexture,
      })

      let moon = new Mesh(geometry, material)
      moon.position.set(0, 0, 0)

      scene.add(moon)
      camera.updateProjectionMatrix()

      const tick = () => {
        /* const targetX = mouseX * 0.001
        const targetY = mouseY * 0.001 */

        const elapsedTime = clock.getElapsedTime()

        // Update objects
        moon.rotation.y = 0.05 * elapsedTime
        /*  //moon.rotation.y += 0.1 * (targetX - moon.rotation.y)
        moon.rotation.x += -0.005 * (targetY + moon.rotation.x)
        moon.position.z += 0.005 * (targetY - moon.position.z) */

        // Update Orbital Controls
        // controls.update()

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
        zIndex: -1,
        left: 0,
        backgroundColor: 'transparent',
      }}
    ></div>
  )
}
