import { StyledTable } from '@components/Table/TableStyles';
import { Text } from '@components/Typography';
import { content } from '@lib/theme/colors';
import styled from 'styled-components';
import { ScheduleCardCell, ScheduleCardRow } from './TableStyles';
import Flex from '@components/Flex';
import PointIcon from '@components/icons/PointIcon';
// import ClipIcon from '@components/icons/ClipIcon';
import { toFixedNumberLessons } from './helpers';
import { useSelector } from 'react-redux';
import { institutionSelectors } from '@store/institution';

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

export type LessonData = {
  time?: string;
  location?: string;
  name?: string;
};

export type Schedule = {
  day: string;
  date: Date;
  lessons: Array<Lesson | null>;
  lessonsOnDay?: number;
};

const ScheduleCard: React.FC<Schedule> = ({
  day,
  date,
  lessons,
  lessonsOnDay,
}) => {
  const lessonTimes = useSelector(institutionSelectors.getLessonTimes);
  const rooms = useSelector(institutionSelectors.getRooms);
  const courses = useSelector(institutionSelectors.getCourses);
  const disciplines = useSelector(institutionSelectors.getDisciplines);
  const subjects = useSelector(institutionSelectors.getSubjects);

  const lessonToDisplayable = (lessons: (Lesson | null)[]): LessonData[] => {
    return lessons.map((lesson) => {
      const currentLessonTime = lessonTimes.find(
        (time) => time.id === lesson?.lesson_time_id,
      );
      const room = rooms.find((room) => room.room.id === lesson?.room_id);
      const course = courses.find(
        (course) => course.course.id === lesson?.course_id,
      );
      const discipline = disciplines.find((el) => el.id === course?.course.id);
      const subject = subjects.find((el) => el.id === discipline?.subject_id);

      return {
        time: `${currentLessonTime?.start_time} - ${currentLessonTime?.end_time}`,
        location: room?.room.name,
        name: subject?.name,
      };
    });
  };

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
            {toFixedNumberLessons(
              lessonToDisplayable(lessons),
              lessonsOnDay || 0,
            ).map((el: LessonData | null, index) => (
              <ScheduleCardRow key={index}>
                <ScheduleCardCell style={{ width: 217 }}>
                  <Flex justify="space-between" style={{ marginBottom: 3 }}>
                    <Text $color="#AAA" $size="small">
                      {}
                    </Text>
                    <Flex gap="6px">
                      {el?.location && <PointIcon width="10px" height="12px" />}
                      <Text $color="#AAA" $size="small">
                        {el?.location}
                      </Text>
                    </Flex>
                  </Flex>
                  <Text>{el?.name}</Text>
                </ScheduleCardCell>
                <ScheduleCardCell>
                  <Flex style={{ width: '100%', justifyContent: 'end' }}>
                    {/* {el?.homework && <ClipIcon width="10px" height="11px" />} */}
                  </Flex>
                  <Text
                    style={{
                      textOverflow: 'el?lipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      maxWidth: 193,
                      display: 'inline-block',
                    }}
                    $size="small"
                  >
                    {/* {el?.homework} */}
                  </Text>
                </ScheduleCardCell>
                <ScheduleCardCell style={{ minWidth: 60, width: 60 }}>
                  <Flex align="center" justify="center">
                    <Text $size="subheader" $color="#747474">
                      {/* {el?.mark} */}
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
