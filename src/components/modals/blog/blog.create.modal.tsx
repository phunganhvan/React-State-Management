import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { createNewBlog, resetCreate } from '../../../redux/blog/blog.slide';
import { toast } from 'react-toastify';

interface ICreateBlog {
    isOpenCreateModal: boolean;
    setIsOpenCreateModal: (isOpen: boolean) => void;
}
const BlogCreateModal = (props: ICreateBlog) => {
    const { isOpenCreateModal, setIsOpenCreateModal } = props;

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const dispatch = useAppDispatch();
    const handleSubmit = () => {
        if (!title) {
            alert("title empty");
            return;
        }
        if (!author) {
            alert("author empty");
            return;
        }
        if (!content) {
            alert("content empty");
            return;
        }
        dispatch(createNewBlog({ title, author, content }));

        // console.log(">>> check create: ", { title, author })
    }
    const isCreateSuccess = useAppSelector((state) => state.blog.isCreateBlogSuccess);
    useEffect(() => {
        if (isCreateSuccess) {
            setIsOpenCreateModal(false);
            setTitle("");
            setAuthor("");
            setContent("");
            toast('🦄 Wow so easy! Create succeed');
            // reset redux
            dispatch(resetCreate());
        }
    }, [isCreateSuccess])
    return (
        <>
            <Modal
                show={isOpenCreateModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop={false}
                onHide={() => setIsOpenCreateModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add A New Blog
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        label="Title"
                        className="mb-3"
                    >
                        <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                        />
                    </FloatingLabel>
                    <FloatingLabel label="Author" style={{marginBottom: "10px"}}>
                        <Form.Control
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            type="text"
                        />
                    </FloatingLabel>
                    <FloatingLabel label="Content">
                        <Form.Control
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            as="textarea"
                            placeholder="Content"
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='warning'
                        onClick={() => setIsOpenCreateModal(false)} className='mr-2'>Cancel</Button>
                    <Button onClick={() => handleSubmit()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BlogCreateModal;