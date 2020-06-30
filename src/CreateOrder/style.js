import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;    
    align-items: center;
    height: 100vh;
`

export const TextGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    // height: 35%;
    text-align: center;

    &>*{
        width: 80%;
        margin: 15px 0 0;
    }
`