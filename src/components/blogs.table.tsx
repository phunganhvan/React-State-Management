import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchListBlogs } from '../redux/blog/blog.slide';
import Button from 'react-bootstrap/Button';
import BlogCreateModal from './modals/blog/blog.create.modal';
import BlogDeleteModal from './modals/blog/blog.delete.modal';
import BlogEditModal from './modals/blog/blog.edit.modal';
// import blogEditModal from './modals/Blogs/blog.edit.modal';
// import blogDeleteModal from './modals/Blogs/blog.delete.modal';
interface IBlog {
    id: number;
    title: string;
    author: string;
    content: string;
}

function BlogsTable() {

    const dispatch = useAppDispatch();
    const Blogs = useAppSelector(state => state.blog.listBlogs);

    const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);

    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
    const [dataBlog, setDataBlog] = useState<IBlog>({});
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchListBlogs())
        // toast.success("fetch success")
    }, [])

    const handleEditBlog = (blog: IBlog) => {
        setDataBlog(blog);
        setIsOpenUpdateModal(true);
    }

    const handleDelete = (blog: IBlog) => {
        setDataBlog(blog);
        setIsOpenDeleteModal(true);
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "15px 0" }}>
                <h4>Table Blogs</h4>
                <Button variant="primary"
                    onClick={() => setIsOpenCreateModal(true)}
                >Add New</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Content</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Blogs?.map((blog: IBlog) => {
                        return (
                            <tr key={blog.id}>
                                <td>{blog.id}</td>
                                <td>{blog.title}</td>
                                <td>{blog.author}</td>
                                <td>{blog.content}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        onClick={() => handleEditBlog(blog)}
                                    >
                                        Edit
                                    </Button>&nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDelete(blog)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            <BlogCreateModal
                isOpenCreateModal={isOpenCreateModal}
                setIsOpenCreateModal={setIsOpenCreateModal}
            />

            <BlogEditModal
                isOpenUpdateModal={isOpenUpdateModal}
                setIsOpenUpdateModal={setIsOpenUpdateModal}
                dataBlog={dataBlog}
            />

            <BlogDeleteModal
                dataBlog={dataBlog}
                isOpenDeleteModal={isOpenDeleteModal}
                setIsOpenDeleteModal={setIsOpenDeleteModal}
            />
        </>
    );
}

export default BlogsTable;