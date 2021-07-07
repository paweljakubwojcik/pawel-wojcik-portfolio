import { graphql, useStaticQuery } from 'gatsby'
import React, { useMemo, useCallback, useState, useEffect } from 'react'
import { TextureLoader, Mesh, SphereBufferGeometry, Color, MeshStandardMaterial, PointLight } from 'three'
import useThree from '../hooks/useThree'
import * as dat from 'dat.gui'
import { useTheme } from 'styled-components'

// TODO: Split up threejs elements into canvas, light, moons and other stuff

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

  const {
    colors: {
      palette: { green, pink },
    },
  } = useTheme()

  const { canvas, canvasRef, camera, renderer, render, scene, clock } = useThree()

  const createMoon = () => {
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

    // Materials
    const material = new MeshStandardMaterial({
      color: new Color('#ffffff'),
      /*  displacementMap: moonTextureDisplaycment,
        displacementScale: 0.01, */
      map: moonTexture,
    })

    return new Mesh(geometry, material)
  }

  useEffect(() => {
    if (canvas) {
      console.log('creating view')

      camera.position.set(-1, 0, 3)
      renderer.setSize(window?.innerWidth, window?.innerHeight)

      const pointLight = new PointLight('#ffffff', 0.6)
      pointLight.position.set(0, -1, 7)
      scene.add(pointLight)

      const pinkLight = new PointLight(pink.main, 0.9)
      pinkLight.position.set(-2, -3, 10)
      scene.add(pinkLight)

      // helpers
      /* const gui = new dat.GUI() */

      /*  gui.add(pointLight.position, 'x', -10, 10, 1)
      gui.add(pointLight.position, 'y', -10, 10, 1)
      gui.add(pointLight.position, 'z', -10, 10, 1)
      gui.add(pointLight, 'intensity', -0, 1, 0.1) */

      /* gui.add(camera.position, 'x', -10, 100, 1)
      gui.add(camera.position, 'y', -10, 100, 1)
      gui.add(camera.position, 'z', -10, 100, 1)
      gui.add(camera, 'fov', -10, 10000, 100)
      gui.add(camera, 'far', -10, 10000, 10)
      gui.add(camera, 'near', -10, 10, 0.1)
 */
      const moon = createMoon()
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
