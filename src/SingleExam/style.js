import styled from 'styled-components';
import { Card } from '@material-ui/core';

export const Container = styled.div`
    display: flex
    align-items:center;
    justify-content:center;
    width: 100%;
    margin: 150px 0;
    // height: 100vh;
`

export const CardContainer = styled(Card)`
    width: 600px;
    margin: 0 auto;
`

export const Group = styled.div`
    width: 50%;
    display: flex;
    flex-wrap:none;
    
`;

export const ExamData = styled.div`
    display: flex;
    flex-direction: column;
    
    margin: 30px 0 0 0;
`