import Flex from '@components/Flex';
import { Text } from '@components/Typography';
import { uiSelectors, uiActions } from '@store/ui';
import { DisplayedTab } from '@store/ui/types';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { StyledButton } from '../EducationPage';
import axios from 'axios';
import CloseIcon from '@components/icons/CloseIcon';
import BurgerIcon from '@components/icons/BurgerIcon';
import { useNavigate } from 'react-router-dom';

const tabs = [
  { id: 'shifts', name: 'Смены' },
  { id: 'profiles', name: 'Профили' },
  { id: 'teachers', name: 'Учителя' },
  { id: 'groups', name: 'Группы' },
  { id: 'subjects', name: 'Предметы' },
  { id: 'rooms', name: 'Аудитории' },
  { id: 'disciplines', name: 'Дисциплины' },
];

type NavigationElementProps = {
  text: string;
  selected?: boolean;
  onSelect: VoidFunction;
};

const CloseButton = styled.button`
  background-color: #641aee;
  width: 60px;
  height: 60px;
  position: absolute;
  right: -50px;
  top: 0;
  border: none;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  padding: 13px;

  @media (min-width: 950px) {
    display: none;
  }
`;

const Navigation = styled.nav<{ $isOpened: boolean }>`
  position: relative;
  border-radius: 10px;
  min-height: calc(100vh - 110px);
  background-color: #641aee;
  padding: 40px 35px;
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 950px) {
    position: fixed;
    z-index: 100;
    transform: translateX(${(props) => (!props.$isOpened ? '-100%' : 0)});
    transition: all 0.3s ease-in-out;
  }
`;

const NavigationElement: React.FC<NavigationElementProps> = ({
  text,
  selected,
  onSelect,
}) => (
  <li
    onClick={onSelect}
    style={{
      marginBlock: 7,
      paddingInline: 10,
      borderRadius: 10,
      cursor: 'pointer',
    }}
  >
    <Text $size="subheader" $color={selected ? '#641aee' : '#fff'}>
      {text}
    </Text>
  </li>
);

const Pointer = styled.div<{ $index: number }>`
  width: 250px;
  height: 36px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  margin-top: 47px;
  position: absolute;
  top: ${(props) => props.$index * 43}px;
  z-index: -1;
  transition: top 0.1s;

  @media (max-width: 950px) {
    width: 237px;
  }
`;

const InstitutionNavigation = () => {
  const activeTab = useSelector(uiSelectors.getActiveTabs);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [isServerLive, setIsServerLive] = useState(true);
  const [isMenuOpened, setIsMenuOpened] = useState(true);

  const handleToggle = (item: DisplayedTab) => {
    dispatch(uiActions.setActiveTab(item));
  };

  useEffect(() => {
    (async () => {
      try {
        await axios.get('https://puzzlesignlanguage.ru/api/algo/v1/status');
        setIsServerLive(true);
      } catch (e) {
        if (isServerLive) setIsServerLive(true);
      }
    })();
    const interval = setInterval(async () => {
      try {
        await axios.get('https://puzzlesignlanguage.ru/api/algo/v1/status');
        setIsServerLive(true);
      } catch (e) {
        if (isServerLive) setIsServerLive(true);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Navigation $isOpened={isMenuOpened}>
      <CloseButton onClick={() => setIsMenuOpened(!isMenuOpened)}>
        {isMenuOpened ? <CloseIcon color="#641aee" /> : <BurgerIcon />}
      </CloseButton>
      <Pointer $index={tabs.findIndex((tab) => tab.id === activeTab)} />
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {tabs.map((tab) => (
          <NavigationElement
            text={tab.name}
            key={tab.id}
            onSelect={() => handleToggle(tab.id as DisplayedTab)}
            selected={activeTab === tab.id}
          />
        ))}
      </ul>
      <Flex gap="16px" align="stretch" $top="large" direction="column">
        <StyledButton
          disabled={!isServerLive}
          style={ 
            isServerLive
              ? { backgroundColor: 'white', borderColor: 'white', color: 'black' }
              : {
                  backgroundColor: '#f0414c',
                  borderColor: '#f0414c',
                  cursor: 'default',
                }
          }
          $isActive
          onClick={() =>
            navigate('/schedule')
          }
        >
          Расписание
        </StyledButton>
        <StyledButton
          disabled={!isServerLive}
          style={
            isServerLive
              ? { backgroundColor: '#35c452', borderColor: '#35c452' }
              : {
                  backgroundColor: '#f0414c',
                  borderColor: '#f0414c',
                  cursor: 'default',
                }
          }
          $isActive
          onClick={() =>
            dispatch(
              uiActions.openModal({
                modalName: 'GenerateModal',
                value: null,
                isEditing: true,
              }),
            )
          }
        >
          Сгенерировать
        </StyledButton>
        <StyledButton
          $isActive
          disabled={!isServerLive}
          style={
            isServerLive
              ? { backgroundColor: '#35c452', borderColor: '#35c452' }
              : {
                  backgroundColor: '#f0414c',
                  borderColor: '#f0414c',
                  cursor: 'default',
                }
          }
          onClick={async () => {
            try {
              await fetch(
                // @ts-ignore
                `https://puzzlesignlanguage.online/schedule/get/excel?institution_id=${user.institution_id}`,
                {},
              )
                .then((resp) =>
                  resp.status === 200
                    ? resp.blob()
                    : Promise.reject('Не удалось скачать, попробуйте еще раз!'),
                )
                .then((blob) => {
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.style.display = 'none';
                  a.href = url;
                  a.download = 'Расписание.xlsx';
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                  toast.success('Файл успешно скачен!');
                })
                .catch((error) =>
                  toast.error('Не удалось скачать ' + `(${error})`),
                );
            } catch (error) {
              toast.error('Не удалось скачать ' + `(${error})`);
            }
          }}
        >
          Скачать
        </StyledButton>
      </Flex>
    </Navigation>
  );
};

export default InstitutionNavigation;
