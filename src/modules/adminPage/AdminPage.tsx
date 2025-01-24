// import Flex from '@components/Flex';
// import { Backdrop } from '@components/Modal/ModalStyles';
// import { AddingSchoolModal } from '@components/Modal/ModalViews/AddingSchoolModal';
// import { AddingSuzModal } from '@components/Modal/ModalViews/AddingSuzModal';
// import { AddingVuzModal } from '@components/Modal/ModalViews/AddingVuzModal';
// import Portal from '@components/Portal';
// import TextButton from '@components/TextButton';
// import { Title } from '@components/Title';

import Flex from '@components/Flex';
import styled from 'styled-components';
import SchoolModule from './school/SchoolModule';

const Wrapper = styled(Flex)`
    background-color: #fff;
    flex-direction: column;
    border-radius: 10px;
    padding: 40px 35px;
`;

const AdminPage = () => {
    return (
        <Wrapper>
            <SchoolModule />
            {/* <Flex direction="column" $top="large">
                <Title action={() => setIsVuzModalOpen(true)}>Вузы</Title>
                {!areSchoolsLoading && (
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
                            {schools
                                .filter((el) => el.type === 'vuz')
                                .sort((a, b) => a.id - b.id)
                                .map((item) => (
                                    <Flex gap="16px" align="center">
                                        <button
                                            onClick={() =>
                                                setCurrentSchoolValue(item)
                                            }
                                            style={{
                                                padding: 8,
                                                background: 'white',
                                                borderRadius: 8,
                                                width: 32,
                                                height: 32,
                                            }}
                                        >
                                            <svg
                                                width="15"
                                                height="9"
                                                viewBox="0 0 15 9"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M9.56774 4.30609C9.56774 5.52145 8.58249 6.5067 7.36712 6.5067C6.15175 6.5067 5.1665 5.52145 5.1665 4.30609C5.1665 3.09072 6.15175 2.10547 7.36712 2.10547C8.58249 2.10547 9.56774 3.09072 9.56774 4.30609ZM5.79681 4.30609C5.79681 5.17335 6.49986 5.8764 7.36712 5.8764C8.23438 5.8764 8.93743 5.17335 8.93743 4.30609C8.93743 3.43883 8.23438 2.73577 7.36712 2.73577C6.49986 2.73577 5.79681 3.43883 5.79681 4.30609Z"
                                                    fill="black"
                                                />
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M14.7346 4.24253C14.7346 4.24253 11.522 -0.0309508 7.38273 0.000169143C3.24346 0.0312891 0 4.24253 0 4.24253C0 4.24253 3.24346 8.4507 7.38273 8.41958C11.522 8.38846 14.7346 4.24253 14.7346 4.24253ZM1.0228 4.00677C0.942914 4.0924 0.871355 4.17136 0.808547 4.24215C0.871183 4.31257 0.942516 4.39105 1.02212 4.47612C1.37514 4.85333 1.88714 5.35591 2.52137 5.85638C3.80405 6.86856 5.51329 7.81457 7.37809 7.80055C9.24871 7.78648 10.9541 6.83714 12.229 5.83274C12.8597 5.33584 13.3681 4.8388 13.7182 4.46634C13.7968 4.38281 13.8672 4.30573 13.929 4.23655C13.8658 4.16363 13.7934 4.08206 13.7124 3.99346C13.3622 3.61039 12.8539 3.10012 12.2236 2.59203C10.9485 1.56415 9.24851 0.60521 7.38736 0.619203C5.5193 0.633247 3.80712 1.5965 2.52328 2.61785C1.88847 3.12287 1.37605 3.62809 1.0228 4.00677Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        </button>
                                        <TextButton
                                            key={item.id}
                                            text={item.name}
                                            // @ts-ignore
                                            size="full"
                                            openEditing={() => {
                                                setIsVuzModalOpen(true);
                                                setVuzEditValue(item);
                                            }}
                                        />

                                        <TextButton
                                            key={item.id}
                                            text={item.address}
                                            // @ts-ignore
                                            size="full"
                                            openEditing={() => {}}
                                        />
                                    </Flex>
                                ))}
                        </Flex>
                    </>
                )}
            </Flex>
            <Flex direction="column" $top="large">
                <Title action={() => setIsSuzModalOpen(true)}>Сузы</Title>
                {!areSchoolsLoading && (
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
                            {schools
                                .filter((el) => el.type === 'suz')
                                .sort((a, b) => a.id - b.id)
                                .map((item) => (
                                    <Flex gap="16px" align="center">
                                        <button
                                            onClick={() =>
                                                setCurrentSchoolValue(item)
                                            }
                                            style={{
                                                padding: 8,
                                                background: 'white',
                                                borderRadius: 8,
                                                width: 32,
                                                height: 32,
                                            }}
                                        >
                                            <svg
                                                width="15"
                                                height="9"
                                                viewBox="0 0 15 9"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M9.56774 4.30609C9.56774 5.52145 8.58249 6.5067 7.36712 6.5067C6.15175 6.5067 5.1665 5.52145 5.1665 4.30609C5.1665 3.09072 6.15175 2.10547 7.36712 2.10547C8.58249 2.10547 9.56774 3.09072 9.56774 4.30609ZM5.79681 4.30609C5.79681 5.17335 6.49986 5.8764 7.36712 5.8764C8.23438 5.8764 8.93743 5.17335 8.93743 4.30609C8.93743 3.43883 8.23438 2.73577 7.36712 2.73577C6.49986 2.73577 5.79681 3.43883 5.79681 4.30609Z"
                                                    fill="black"
                                                />
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M14.7346 4.24253C14.7346 4.24253 11.522 -0.0309508 7.38273 0.000169143C3.24346 0.0312891 0 4.24253 0 4.24253C0 4.24253 3.24346 8.4507 7.38273 8.41958C11.522 8.38846 14.7346 4.24253 14.7346 4.24253ZM1.0228 4.00677C0.942914 4.0924 0.871355 4.17136 0.808547 4.24215C0.871183 4.31257 0.942516 4.39105 1.02212 4.47612C1.37514 4.85333 1.88714 5.35591 2.52137 5.85638C3.80405 6.86856 5.51329 7.81457 7.37809 7.80055C9.24871 7.78648 10.9541 6.83714 12.229 5.83274C12.8597 5.33584 13.3681 4.8388 13.7182 4.46634C13.7968 4.38281 13.8672 4.30573 13.929 4.23655C13.8658 4.16363 13.7934 4.08206 13.7124 3.99346C13.3622 3.61039 12.8539 3.10012 12.2236 2.59203C10.9485 1.56415 9.24851 0.60521 7.38736 0.619203C5.5193 0.633247 3.80712 1.5965 2.52328 2.61785C1.88847 3.12287 1.37605 3.62809 1.0228 4.00677Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        </button>
                                        <TextButton
                                            key={item.id}
                                            text={item.name}
                                            // @ts-ignore
                                            size="full"
                                            openEditing={() => {
                                                setIsSuzModalOpen(true);
                                                setSuzEditValue(item);
                                            }}
                                        />
                                        <TextButton
                                            key={item.id}
                                            text={item.address}
                                            // @ts-ignore
                                            size="full"
                                            openEditing={() => {}}
                                        />
                                    </Flex>
                                ))}
                        </Flex>
                    </>
                )}
            </Flex>
            {isSchoolModalOpen && (
                <Portal elementId="overlay">
                    <Backdrop />
                    <AddingSchoolModal
                        handleDelete={(id) => {
                            setSchools((prev) =>
                                prev.filter((el) => el.id !== id),
                            );
                            closeAllModals();
                        }}
                        initValue={schoolEditValue}
                        onConfirm={handleAddSchool}
                        hideModal={closeAllModals}
                    />
                </Portal>
            )}
            {isVuzModalOpen && (
                <Portal elementId="overlay">
                    <Backdrop />
                    <AddingVuzModal
                        handleDelete={(id) => {
                            setSchools((prev) =>
                                prev.filter((el) => el.id !== id),
                            );
                            closeAllModals();
                        }}
                        initValue={vuzEditValue}
                        onConfirm={handleAddSchool}
                        hideModal={closeAllModals}
                    />
                </Portal>
            )}
            {isSuzModalOpen && (
                <Portal elementId="overlay">
                    <Backdrop />
                    <AddingSuzModal
                        handleDelete={(id) => {
                            setSchools((prev) =>
                                prev.filter((el) => el.id !== id),
                            );
                            closeAllModals();
                        }}
                        initValue={suzEditValue}
                        onConfirm={handleAddSchool}
                        hideModal={closeAllModals}
                    />
                </Portal>
            )} */}
        </Wrapper>
    );
};

export default AdminPage;
