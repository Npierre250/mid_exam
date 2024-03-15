import React from 'react';
import {
    Avatar,
    ButtonText,
    InnerContainer,
    PageTitle,
    StyledButton,
    StyledFormArea,
    SubTitle,
    WelcomeContainer,
    WelcomeImage,
} from '../components/styles';

const Welcome = ({navigation}) => {
    return (
        <>
        <InnerContainer>
            <WelcomeImage resizeMode="cover" source={require('./../assets/flower.jpg')} />
            <WelcomeContainer>
                <PageTitle Welcome={true}>Wlcome to our application</PageTitle>
                <SubTitle Welcome={true}>Pierre Ndagijimana</SubTitle> 
                <StyledFormArea>
                    {/* <Avatar /> */}
                   
                    <StyledButton onPress={()=> navigation.navigate('Login')} >
                        <ButtonText>Logout</ButtonText>
                    </StyledButton>
                </StyledFormArea>
            </WelcomeContainer>

        </InnerContainer>
        </>
    );
}

export default Welcome;
