export default function getScrollMapping(index: number, numberOfElements: number) {
  /**
   * mapping :
   * 0: [0, 0.33, 0.66 , 1] => [1,0,0,0]
   * 1: [0, 0.33, 0.66 , 1] => [0,1,0,0]
   * 2: [0, 0.33, 0.66 , 1] => [0,0,1,0]
   * 3: [0, 0.33, 0.66 , 1] => [0,0,0,1]
   *
   */

  const inputValues = new Array(numberOfElements).fill(0).map((v, i) => i / (numberOfElements - 1))
  const outputValues: Array<number> = new Array(numberOfElements).fill(0).map((v, i) => (i === index ? 1 : 0))

  return { inputValues, outputValues }
}
