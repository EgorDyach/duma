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

const tabs = [
  { id: 'shifts', name: 'Смены' },
  { id: 'profiles', name: 'Профили' },
  { id: 'teachers', name: 'Учителя' },
  { id: 'groups', name: 'Группы' },
  { id: 'subjects', name: 'Предметы' },
  { id: 'rooms', name: 'Аудитории' },
  { id: 'lessonTime', name: 'Время урока' },
  { id: 'disciplines', name: 'Дисциплины' },
];

type NavigationElementProps = {
  text: string;
  selected?: boolean;
  onSelect: VoidFunction;
};

const Navigation = styled.nav`
  border-radius: 10px;
  min-height: calc(100vh - 110px);
  background-color: #641aee;
  padding: 40px 35px;
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  width: 320px;
  height: 36px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  margin-top: 47px;
  position: absolute;
  top: ${(props) => props.$index * 43}px;
  z-index: -1;
  transition: top 0.1s;
`;

const InstitutionNavigation = () => {
  const activeTab = useSelector(uiSelectors.getActiveTabs);
  const dispatch = useDispatch();
  const [isServerLive, setIsServerLive] = useState(true);

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
    <Navigation>
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
