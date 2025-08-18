import React, { useState, useEffect } from 'react';
import Flex from '@components/Flex';
import {
  StyledModalTitle,
  StyledModalAdd,
} from '@components/Modal/ModalStyles';
import { useSelector } from 'react-redux';
import { uiSelectors } from '@store/ui';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { fetchUpdateTeacherAccount } from '@store/institution/thunks';
import { showErrorNotification } from '@lib/utils/notification';
import Input from '@components/input/Input';
import { Text } from '@components/Typography';
import { Teacher } from '@type/index';

export const MODAL_NAME = 'editTeacherCredentials';

const ITEM_INIT_DATA = {
  email: '',
  password: '',
  fullname: '',
};

export const EditTeacherCredentialsModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const currentModal = modals[MODAL_NAME];

  const [credentials, setCredentials] = useState(ITEM_INIT_DATA);
  const [hasChanges, setHasChanges] = useState(false);

  // Инициализация данных при открытии модального окна
  useEffect(() => {
    if (currentModal.isOpened && currentModal.value) {
      const teacher = currentModal.value as Teacher;
      const accountEmail = (teacher as any)?.account?.email || '';
      
      setCredentials({
        email: accountEmail,
        password: '',
        fullname: teacher.fullname,
      });
      setHasChanges(false);
    }
  }, [currentModal.isOpened, currentModal.value]);

  // Проверка изменений
  useEffect(() => {
    if (currentModal.value) {
      const teacher = currentModal.value as Teacher;
      const accountEmail = (teacher as any)?.account?.email || '';
      
      const hasEmailChanged = credentials.email !== accountEmail;
      const hasPasswordChanged = credentials.password !== '';
      
      setHasChanges(hasEmailChanged || hasPasswordChanged);
    }
  }, [credentials, currentModal.value]);

  const handleSave = async () => {
    if (!hasChanges) {
      return; // Не отправляем запрос, если ничего не изменилось
    }

    try {
      const payload = {
        email: credentials.email,
        fullname: credentials.fullname,
        // Отправляем пароль только если он был изменен
        ...(credentials.password ? { password: credentials.password } : {}),
      };

      await dispatch(fetchUpdateTeacherAccount(payload) as any);
      showErrorNotification('Учетные данные успешно обновлены');
    } catch (e) {
      if (e instanceof Error) {
        showErrorNotification(e.message);
      } else {
        showErrorNotification('Ошибка при обновлении учетных данных');
      }
    }
  };

  if (!currentModal.isOpened) return null;

  return (
    <>
      <StyledModalTitle>
        Изменить учетные данные
      </StyledModalTitle>

      <Flex $top="medium">
        <Input
          style={{ width: '100%' }}
          label="Email"
          placeholder="Введите email..."
          type="email"
          onChange={(e) =>
            setCredentials((prev) => ({
              ...prev,
              email: e,
            }))
          }
          value={credentials.email}
        />
      </Flex>

      <Flex $top="medium">
        <Input
          style={{ width: '100%' }}
          label="Пароль"
          placeholder="Оставьте пустым, если не хотите менять пароль"
          type="password"
          onChange={(e) =>
            setCredentials((prev) => ({
              ...prev,
              password: e,
            }))
          }
          value={credentials.password}
        />
      </Flex>

      <Flex gap="16px" $top="medium" justify="flex-end">
        <StyledModalAdd 
          onClick={handleSave}
          style={{ 
            opacity: hasChanges ? 1 : 0.5,
            cursor: hasChanges ? 'pointer' : 'not-allowed'
          }}
        >
          <Text $size="small">
            Сохранить
          </Text>
        </StyledModalAdd>
      </Flex>
    </>
  );
};
