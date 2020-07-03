import styled from 'styled-components';
import { Card } from '@material-ui/core';

export const Container = styled.div`
    display: flex;
    justify-content: center;    
    align-items: center;
    height: 100vh;
    width:100%;

    padding-top: 200px;
`

export const Form = styled(Card)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 15px;

    width:50%;
    &>h3{
        margin: 50px 0 ;
    }
`;

export const InputGroup =  styled.div`
    display: flex;
    
    width:100%;
    justify-content: space-between;

    &>*{
        width:40%;
    }
`

// export const TextGroup = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: space-around;
//     width: 80%;
//     // height: 35%;
//     text-align: center;

//     &>*{
//         width: 80%;
//         margin: 15px 0 0;
//     }
// `