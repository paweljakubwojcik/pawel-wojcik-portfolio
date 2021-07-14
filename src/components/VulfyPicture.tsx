import React from 'react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { motion, Variant, Variants } from 'framer-motion'

const DIFFRENCE = 20

const ImageVariants: Variants = {
  visible: (i) => ({ x: i * DIFFRENCE * 1.2, y: -i * DIFFRENCE, transition: { delay: 0.5 } }),
  hidden: { x: 0, y: 0 },
}

const PseudoElementVariants: Variants = {
  visible: { height: '112.5%', opacity: 1, transition: { delay: 0.2 } },
  hidden: { height: '0%', opacity: 1 },
}

export default function VulfyPicture({ visible }) {
  const { file } = useStaticQuery(graphql`
    query Me {
      file(name: { eq: "Me" }) {
        childImageSharp {
          gatsbyImageData(width: 600, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
      }
    }
  `)

  return (
    <Wrapper animate={visible ? 'visible' : 'hidden'}>
      <PseudoBefore variants={PseudoElementVariants} />
      {[2, 1, 0].map((i) => {
        return (
          <SingleImageWrapper i={i} custom={i} variants={ImageVariants} key={i}>
            <GatsbyImage image={file.childImageSharp.gatsbyImageData} alt="Me" />
          </SingleImageWrapper>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  min-width: 300px;
  max-width: 500px;

  transform: translateX(-10%);
  z-index: -1;
`

const PseudoBefore = styled(motion.div)`
  display: block;
  position: absolute;
  top: 5%;
  left: 25%;
  width: 87.5%;
  background-color: ${(props) => props.theme.colors.palette.pink.light};
`

const SingleImageWrapper = styled(motion.div)<{ i: number }>`
  position: ${(props) => (props.i === 0 ? 'static' : 'absolute')};
  top: 0;
  left: 0;
  opacity: ${(props) => 1 - props.i * 0.2};
  width: 100%;
`
