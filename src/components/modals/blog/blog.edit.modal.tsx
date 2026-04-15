import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { updateBlog, resetUpdate } from '../../../redux/blog/blog.slide';
import { toast } from 'react-toastify';

const BlogEditModal = (props: any) => {
    const { isOpenUpdateModal, setIsOpenUpdateModal, dataBlog } = props;
    const dispatch = useAppDispatch();
    const [id, setId] = useState();

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const isUpdateSuccess = useAppSelector((state) => state.blog.isUpdateBlogSuccess);
    useEffect(() => {
        // console.log(">>> check data blog: ", dataBlog);
        if (dataBlog?.id) {
            setId(dataBlog?.id);
            setTitle(dataBlog?.title);
            setAuthor(dataBlog?.author);
            setContent(dataBlog?.content)
        }
    }, [dataBlog])

    useEffect(() => {
        if (isUpdateSuccess) {
            toast('🦄 Wow so easy! Update succeed');
            setIsOpenUpdateModal(false);
            setTitle("");
            setAuthor("");
            setContent("");
            dispatch(resetUpdate());
        }
    }, [isUpdateSuccess]);
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
        // console.log(">>> check update: ", { title, author, content, id })
        dispatch(updateBlog({ title, author, content, id }));
    }

    return (
        <>
            <Modal
                show={isOpenUpdateModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop={false}
                onHide={() => setIsOpenUpdateModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update A Blog
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
                    <FloatingLabel label="Author">
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
                        onClick={() => setIsOpenUpdateModal(false)} className='mr-2'>Cancel</Button>
                    <Button onClick={() => handleSubmit()}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BlogEditModal;