import Flex from '@components/Flex';
import EyeIcon from '@components/icons/EyeIcon';
import { Backdrop } from '@components/Modal/ModalStyles';
import { AddingSchoolModal } from '@components/Modal/ModalViews/AddingSchoolModal';
import Portal from '@components/Portal';
import TextButton from '@components/TextButton';
import { Title } from '@components/Title';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { adminActions, adminSelectors } from '@store/admin';
import { fetchDeleteEducation } from '@store/admin/thunks';
import { uiSelectors } from '@store/ui';
import { UserEducation } from '@type/user';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const SchoolModule = () => {
    const dispatch = useAppDispatch();
    const requests = useSelector(uiSelectors.getRequests);
    const schools = useSelector(adminSelectors.getSchools);
    const [editValue, setEditValue] = useState<UserEducation | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
        setEditValue(null);
    };

    return (
        <>
            {isModalOpen && (
                <Portal elementId="overlay">
                    <Backdrop />
                    <AddingSchoolModal
                        handleDelete={(id) => {
                            dispatch(fetchDeleteEducation(id));
                            closeModal();
                        }}
                        initValue={editValue}
                        onConfirm={(newItem: UserEducation) => {
                            if (editValue)
                                dispatch(adminActions.editItem(newItem));
                            else dispatch(adminActions.addItem(newItem));
                        }}
                        hideModal={closeModal}
                    />
                </Portal>
            )}
            <Flex direction="column">
                <Title action={() => setIsModalOpen(true)}>Школы</Title>
                {!requests['educations'] && (
                    <>
                        <Flex
                            style={{
                                marginBottom: 11,
                                display: 'flex',
                                flexDirection: 'column',
                                alignContent: 'start',
                                justifyContent: 'center',
                            }}
                            justify="center"
                            basis="100%"
                            gap="11px"
                        >
                            {schools.map((item) => (
                                <Flex gap="16px" align="center">
                                    <button
                                        style={{
                                            padding: 8,
                                            background: 'white',
                                            borderRadius: 8,
                                            width: 32,
                                            height: 32,
                                        }}
                                    >
                                        <EyeIcon />
                                    </button>
                                    <TextButton
                                        key={item.Education.ID}
                                        text={item.Education.name}
                                        // @ts-ignore
                                        size="full"
                                        openEditing={() => {
                                            setIsModalOpen(true);
                                            setEditValue(item);
                                        }}
                                    />
                                </Flex>
                            ))}
                        </Flex>
                    </>
                )}
            </Flex>
        </>
    );
};

export default SchoolModule;
