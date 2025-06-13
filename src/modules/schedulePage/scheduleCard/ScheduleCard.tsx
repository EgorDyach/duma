import { StyledTable } from '@components/Table/TableStyles';
import { Text } from '@components/Typography';
import { content } from '@lib/theme/colors';
import styled from 'styled-components';
import { ScheduleCardCell, ScheduleCardRow } from './TableStyles';
import Flex from '@components/Flex';
import PointIcon from '@components/icons/PointIcon';
import ClipIcon from '@components/icons/ClipIcon';
import { toFixedNumberLessons } from './helpers';

const CardWrapper = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 100%;
`;

const CardDateWrapper = styled.div`
  background-color: ${content.primary};
  height: 100%;
  padding: 10px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export type Lesson = {
  timeStart?: string;
  timeEnd?: string;
  location?: string;
  name?: string;
  homework?: string;
  mark?: number | 'Н';
};

export type Schedule = {
  day: string;
  date: Date;
  lessons: Lesson[];
  lessonsOnDay?: number;
};

const ScheduleCard: React.FC<Schedule> = ({
  day,
  date,
  lessons,
  lessonsOnDay,
}) => {
  return (
    <CardWrapper>
      <Flex style={{ height: '100%' }}>
        <CardDateWrapper>
          <Text
            style={{
              textOrientation: 'mixed',
              writingMode: 'vertical-lr',
              transform: 'rotate(180deg)',
            }}
            $color={content.white}
          >
            {`${day.toLocaleUpperCase()}, ${date.getDate()}`}
          </Text>
        </CardDateWrapper>
        <StyledTable style={{ tableLayout: 'auto' }}>
          <tbody>
            {toFixedNumberLessons(lessons, lessonsOnDay || 0).map((el) => (
              <ScheduleCardRow key={el.name}>
                <ScheduleCardCell style={{ width: 217 }}>
                  <Flex justify="space-between" style={{ marginBottom: 3 }}>
                    <Text $color="#AAA" $size="small">
                      {el.timeStart &&
                        el.timeEnd &&
                        `${el.timeStart} - ${el.timeEnd}`}
                    </Text>
                    <Flex gap="6px">
                      {el.location && <PointIcon width="10px" height="12px" />}
                      <Text $color="#AAA" $size="small">
                        {el.location}
                      </Text>
                    </Flex>
                  </Flex>
                  <Text>{el.name}</Text>
                </ScheduleCardCell>
                <ScheduleCardCell>
                  <Flex style={{ width: '100%', justifyContent: 'end' }}>
                    {el.homework && <ClipIcon width="10px" height="11px" />}
                  </Flex>
                  <Text
                    style={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      maxWidth: 219,
                      display: 'inline-block',
                    }}
                    $size="small"
                  >
                    {el.homework}
                  </Text>
                </ScheduleCardCell>
                <ScheduleCardCell style={{ minWidth: 60 }}>
                  <Flex align="center" justify="center">
                    <Text $size="subheader" $color="#747474">
                      {el.mark}
                    </Text>
                  </Flex>
                </ScheduleCardCell>
              </ScheduleCardRow>
            ))}
          </tbody>
        </StyledTable>
      </Flex>
    </CardWrapper>
  );
};

export default ScheduleCard;
