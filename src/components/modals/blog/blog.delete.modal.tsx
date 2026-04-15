import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { deleteBlog, resetDelete } from '../../../redux/blog/blog.slide';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
interface IBlog {
    id: number;
    title: string;
    author: string;
    content: string;
}
interface IProps {
    dataBlog: IBlog;
    isOpenDeleteModal: boolean;
    setIsOpenDeleteModal: (isOpen: boolean) => void;
}

const BlogDeleteModal = (props: IProps) => {
    const { dataBlog, isOpenDeleteModal, setIsOpenDeleteModal } = props;
    const dispatch = useAppDispatch();
    const isDeleteSuccess = useAppSelector((state) => state.blog.isDeleteBlogSuccess);
    const handleSubmit = () => {
        // console.log(">>> check delete: ", { id: dataBlog?.id ?? "" })
        dispatch(deleteBlog({ id: dataBlog?.id ?? 0 }));
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
                    Delete A Blog
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Delete the blog: {dataBlog?.title ?? ""}
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

export default BlogDeleteModal;