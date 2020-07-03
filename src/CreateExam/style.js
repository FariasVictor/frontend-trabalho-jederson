import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;    
    align-items: center;
    height: 100vh;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width:50%;
`;

export const TextGroup =  styled.div`
    display: flex;
    
    width:100%;
    justify-content: space-between;

    &>*{
        widht:40%;
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