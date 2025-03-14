import { Text } from './Typography';
import { useState } from 'react';
import MultiDatePicker, {
  MultiDatePickerProps,
} from './MultiDatepicker';

const PopupCalendar: React.FC<MultiDatePickerProps> = (props) => {
  const [shown, setShown] = useState(false);

  return (
    <div
      style={{ position: 'relative', cursor: 'pointer', display: 'flex', justifyContent: 'center' }}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <Text onClick={() => setShown(!shown)}>Показать...</Text>
      <div
        style={{
          position: 'absolute',
          display: shown ? 'block' : 'none',
          zIndex: 999,
          top: 22,
        }}
      >
        <MultiDatePicker {...props} isEditable={false} />
      </div>
    </div>
  );
};

export default PopupCalendar;
