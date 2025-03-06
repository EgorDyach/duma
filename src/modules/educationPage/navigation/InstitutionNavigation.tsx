import { Text } from '@components/Typography';
import { uiSelectors, uiActions } from '@store/ui';
import { DisplayedTab } from '@store/ui/types';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

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
`;

const InstitutionNavigation = () => {
  const activeTab = useSelector(uiSelectors.getActiveTabs);
  const dispatch = useDispatch();

  const handleToggle = (item: DisplayedTab) => {
    dispatch(uiActions.setActiveTab(item));
  };

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
    </Navigation>
  );
};

export default InstitutionNavigation;
