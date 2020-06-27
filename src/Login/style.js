import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const Container = styled.div`
    display: flex;
    justify-content: center;    
    align-items: center;
    background: #7FFFD4;
    height: 100vh;
`

export const Card = styled.div`
    display: flex;
    background: white;
    justify-content:center;
    align-items: center;
    margin: 0px auto;
    border-radius: 15px;
    width: 450px;
    height: 450px;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    width: 100%;
    height: 100%;
`;

export const Img = styled.img`
    width: 150px;
    height: 150px;
`;

export const TextGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    height: 35%;
    text-align: center;

    &>*{
        width: 80%;
        margin: 15px 0 0;
    }
`;

export const ErrorSpan = styled.span`
    color: red;
`

export const SubmitButton = styled(Button)`
    height: 10%;
    width: 50%;    
`;