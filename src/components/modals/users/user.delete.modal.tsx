import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { deleteUser, resetDelete } from '../../../redux/user/user.slide';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const UserDeleteModal = (props: any) => {
    const { dataUser, isOpenDeleteModal, setIsOpenDeleteModal } = props;
    const dispatch = useAppDispatch();
    const isDeleteSuccess = useAppSelector((state) => state.user.isDeleteUserSuccess);
    const handleSubmit = () => {
        // console.log(">>> check delete: ", { id: dataUser?.id ?? "" })
        dispatch(deleteUser({ id: dataUser?.id ?? 0 }));
    }
    useEffect(() => {
        if (isDeleteSuccess) {
            setIsOpenDeleteModal(false);
            toast('🦄 Wow so easy! Delete succeed');
            dispatch(resetDelete());
        }
    }, [isDeleteSuccess]);

    return (
        <Modal
            show={isOpenDeleteModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={false}
            onHide={() => setIsOpenDeleteModal(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Delete A User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Delete the user: {dataUser?.email ?? ""}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant='warning'
                    onClick={() => setIsOpenDeleteModal(false)} className='mr-2'>Cancel</Button>
                <Button onClick={() => handleSubmit()}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UserDeleteModal;