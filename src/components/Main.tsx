// import styled from '@emotion/styled'
import * as mui from '@mui/material'
import React from 'react'

const VStack = React.forwardRef<HTMLDivElement, mui.StackProps>(function VStack({...rest}, ref) {
  return <mui.Stack ref={ref} direction="column" {...rest} />
})
const HStack = React.forwardRef<HTMLDivElement, mui.StackProps>(function HStack({...rest}, ref) {
  return <mui.Stack ref={ref} direction="row" {...rest} />
})

export const Main: React.FC = () => {
  return <VStack />
}
