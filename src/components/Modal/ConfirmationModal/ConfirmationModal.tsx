import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { StyledModalAdd } from '../ModalStyles';

interface Props {
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
    setIsEdit: (value: boolean) => void
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const content = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "24px"
}

export const ConfirmationModal: React.FC<Props> = ({ isOpenModal, setIsOpenModal, setIsEdit }) => {

    const handleClose = () => setIsOpenModal(false);

    const confirmEdit = () => {
        setIsEdit(true)
        setIsOpenModal(false)
    }

    return (
        <div>
            <Modal
                open={isOpenModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={content}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight={600}>
                            ВЫ УВЕРЕНЫ?
                        </Typography>
                        <Box sx={{ display: "flex", gap: "32px" }}>
                            <StyledModalAdd onClick={confirmEdit}>ДА</StyledModalAdd>
                            <StyledModalAdd onClick={handleClose}>НЕТ</StyledModalAdd>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default ConfirmationModal
