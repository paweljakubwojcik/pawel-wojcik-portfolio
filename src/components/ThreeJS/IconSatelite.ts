import {
  TextureLoader,
  Mesh,
  MeshStandardMaterial,
  BoxGeometry,
  MathUtils,
  DoubleSide,
  PlaneBufferGeometry,
} from 'three'

type IconSateliteConfig = {}

const createIcon = (ICON_TEXTURE: string) => {
  const textureLoader = new TextureLoader()
  const geometry = new PlaneBufferGeometry(0.1, 0.1)
  const iconTexture = textureLoader.load(ICON_TEXTURE)
  const material = new MeshStandardMaterial({
    map: iconTexture,
    transparent: true,
    side: DoubleSide,
  })
  return new Mesh(geometry, material)
}

export default class IconSatelite {
  static AllIconSatelites = []

  mesh: Mesh
  #spinningVelocity: number
  #orbitVelocity: number
  #orbitRadius: number
  #tilt: number
  margin: number

  constructor(texture: string, {}: IconSateliteConfig) {
    this.mesh = createIcon(texture)

    this.#spinningVelocity = MathUtils.randFloat(3, 6)
    this.#orbitVelocity = 0.5
    this.#orbitRadius = 1.1
    this.#tilt = MathUtils.randFloat(20, 30)

    const prev =
      IconSatelite.AllIconSatelites.length < 0
        ? IconSatelite.AllIconSatelites[IconSatelite.AllIconSatelites.length - 1]
        : undefined

    this.margin = MathUtils.randFloat(0, MathUtils.degToRad(360))

    IconSatelite.AllIconSatelites.push(this)
  }

  updatePosition(elapsedTime: number) {
    /*     this.mesh.position.x = Math.cos(this.#orbitVelocity * elapsedTime) * this.#orbitRadius
    this.mesh.position.y = Math.sin(this.#deviationVelocity * elapsedTime) * this.#orbitDeviation
    this.mesh.position.z = Math.sin(this.#orbitVelocity * elapsedTime) * this.#orbitRadius */
    this.mesh.rotation.y = this.#spinningVelocity * elapsedTime
    this.mesh.position.setFromSphericalCoords(
      this.#orbitRadius,
      MathUtils.degToRad(90) -
        Math.cos(this.#orbitVelocity * elapsedTime + this.margin) * MathUtils.degToRad(this.#tilt),
      this.#orbitVelocity * elapsedTime + this.margin
    )
  }
}
