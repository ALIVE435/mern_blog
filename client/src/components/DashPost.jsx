import axios from "axios"
import { Table } from "flowbite-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


export default function DashPost() {
    const { currentUser } = useSelector((state) => state.user)
    const [userPosts, setUserPosts] = useState([])
    const [showMore, setShowMore] = useState(true)

    const handleShowMore = async()=>{
        const startIndex = userPosts.length;
        try{
            const res = await axios.get(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
            setUserPosts((prev)=>[...prev,...res.data.posts]);
            if(res.data.posts.length < 9) setShowMore(false);
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        if (currentUser.isAdmin)
            axios.get(`/api/post/getposts?userId=${currentUser._id}`)
                .then((res) => {
                    setUserPosts(res.data.posts)
                    if(res.data.posts < 9) setShowMore(false)
                })
                .catch(err => console.log(err))
    }, [currentUser._id])

    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && userPosts.length > 0 ? (
                <>
                    <Table hoverable className="shadow-md">
                        <Table.Head>
                            <Table.HeadCell>Date updated</Table.HeadCell>
                            <Table.HeadCell>Post image</Table.HeadCell>
                            <Table.HeadCell>Post title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {userPosts.map((post) => {
                            return (
                                <Table.Body key={post._id}>
                                    <Table.Row>
                                        <Table.Cell>
                                            {new Date(post.updatedAt).toLocaleDateString()}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Link to={`/post/${post.slug}`}>
                                                <img scr={post.image} alt={post.title} className="w-20 h-10 object-cover bg-gray-500" />
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Link to={`/post/${post.slug}`}>{post.title}</Link>
                                        </Table.Cell>
                                        <Table.Cell>{post.category}</Table.Cell>
                                        <Table.Cell>
                                            <span className="text-red-600 ">Delete</span>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Link to="">
                                                <span className="text-green-500">Edit</span>
                                            </Link>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            )
                        })}
                    </Table>
                    {showMore &&
                        <button className="w-full text-teal-500 self-center text-sm py-7" onClick={handleShowMore}>Show More</button>
                    }
                </>
            ) : (<p>You have no posts yet!</p>)}
        </div>
    )
}