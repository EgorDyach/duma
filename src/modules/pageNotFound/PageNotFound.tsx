import styled from 'styled-components';
import { Text } from '@components/Typography';
import { Link } from 'react-router-dom';
import { lineHeightDict } from '@lib/theme/fonts';
import { content } from '@lib/theme/colors';
import { indent } from '@lib/theme/sizes';
import img from '/img/notFound.png';

const StyledPageNotFound = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 295px;
  height: 260px;
  margin: 76px auto 0;
  text-align: center;
`;
const StyledTextGray = styled.p`
  line-height: ${lineHeightDict.subtitle};
  margin-top: -12px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const Button = styled.button`
  background-color: ${content.primary};
  border-radius: 10px;
  border: none;
  color: ${content.white};
  padding: ${indent.medium} ${indent.vlarge};
  cursor: pointer;
  margin-top: ${indent.medium};
  font-size: ${indent.medium};
  font-family: 'Manrope';
`;

const PageNotFound = () => {
  return (
    <StyledPageNotFound>
      <img src={img} />
      <Text $size="heroLarge">404</Text>
      <Text $size="title" $top="small">
        Страница не найдена
      </Text>
      <Text $top="medium" $size="big" $color="tertiary">
        <StyledTextGray>
          Неправильно набран адрес
          <br />
          или такой страницы не существует
        </StyledTextGray>
      </Text>
      <Button>
        <StyledLink to={'/'}>Перейти на главную</StyledLink>
      </Button>
    </StyledPageNotFound>
  );
};

export default PageNotFound;
