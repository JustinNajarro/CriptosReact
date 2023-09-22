import styled from '@emotion/styled'

const Text = styled.div`
    background-color: #B7322C;
    color: #FFF;
    padding: 10px;
    font-size: 22px;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    text-align: center;
    border-radius: 5px;
`

const Error = ({children}) => {
  return (
    <Text>
        {children}
    </Text>
  )
}

export default Error