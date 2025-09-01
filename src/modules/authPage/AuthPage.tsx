import Flex from '@components/Flex';
import logo from '/img/Logo.png';
import { Text } from '@components/Typography';
import Input from '@components/input/Input';
import { FC, useState } from 'react';
import Checkbox from '@components/Checkbox';
import Button from './Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { requestAuthenticate } from '@lib/api/user';
import { showErrorNotification } from '@lib/utils/notification';
import SessionService from '@lib/utils/sessionService';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { uiActions } from '@store/ui';
import { institutionActions } from '@store/institution';

const StyledFlex = styled(Flex)`
  width: 80vw;
  @media (max-width: 1260px) {
    height: 100%;
    flex-direction: column;
  }
`;
const DecorateFlex = styled(Flex)`
  background-color: rgba(87, 39, 236, 1);
  height: 100%;
  width: 100%;
  border-radius: 10px;
  padding: 35px;
  flex: 1;

  @media (max-width: 1260px) {
    height: 150px;
    width: 100%;
  }
  @media (max-width: 700px) {
    padding: 18px;
    height: 80px;
    width: 100%;

    img {
      height: 20px;
      width: 70px;
    }
  }
`;

const ContentFlex = styled(Flex)`
  background-color: #fff;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  padding: 35px;
  flex: 1.34;
  @media (max-width: 700px) {
    padding: 18px;
  }
`;

const Title = styled(Text)`
  @media (max-width: 700px) {
    font-size: 30px;
    line-height: 45px;
  }
`;

interface AuthProps {
  isAdmin?: boolean;
}

export const AuthPage: FC<AuthProps> = ({ isAdmin = false }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await requestAuthenticate(login, password);
      if (res && res.message && res.message.token) {
        console.log(res);
        dispatch(uiActions.setUser(res.message));
        dispatch(uiActions.setRequestFinished('getUser'));
        dispatch(institutionActions.setCourses([]));
        dispatch(institutionActions.setDisciplines([]));
        dispatch(institutionActions.setGroups([]));
        dispatch(institutionActions.setLessonTimes([]));
        dispatch(institutionActions.setProfiles([]));
        dispatch(institutionActions.setShifts([]));
        dispatch(institutionActions.setSubjects([]));
        dispatch(institutionActions.setTeachers([]));
        SessionService.login(res.message.token, saving);
        navigate('/');
      }
    } catch (e: unknown) {
      const msg = (e as any)?.response?.data?.error || 'Неверный логин или пароль';
      showErrorNotification(msg);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <StyledFlex wrap="wrap" gap="20px">
      <DecorateFlex>
        <img
          src={logo}
          style={{ objectFit: 'contain' }}
          width={120}
          height={31}
        />
      </DecorateFlex>
      <ContentFlex align="center">
        <Flex flex="1" align="start" direction="column">
          <Title $color="rgba(87, 39, 236, 1)" $size="heroLarge">
            Авторизация {isAdmin ? 'Думы' : ''}
          </Title>
          <Flex
            $top="large"
            style={{ width: '100%' }}
            direction="column"
            gap="32px"
          >
            <Input
              placeholder="Введите email"
              label="Email"
              value={login}
              onChange={setLogin}
              name={''}
            />
            <Input
              placeholder="Введите пароль"
              label="Пароль"
              value={password}
              type="password"
              onChange={setPassword}
              name={''}
            />
            <label>
              <Flex gap="6px" align="center">
                <Checkbox setChecked={setSaving} checked={saving} />
                <Text $size="small">Запомнить меня</Text>
              </Flex>
            </label>
            <Button isLoading={isLoading} onClick={handleSubmit}>
              Войти
            </Button>
          </Flex>
        </Flex>
      </ContentFlex>
    </StyledFlex>
  );
};
