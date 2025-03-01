import styled from 'styled-components';

const FooterContainer = styled.footer`
    background-color: #1f1f1f;
    color: white;
    text-align: center;
    padding: 20px;
    margin-top: 40px;
`;

export default function Footer() {
    return (
        <FooterContainer>
            <p>&copy; 2025 Guitar Shop. All rights reserved.</p>
        </FooterContainer>
    );
}