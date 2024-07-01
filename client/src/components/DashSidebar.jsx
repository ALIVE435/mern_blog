import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom"
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiDocumentText, HiUser } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import axios from "axios";

export const DashSidebar = () => {
    const location = useLocation();
    const [tab, setTab] = useState("");
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user)

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        if (tabFromUrl) setTab(tabFromUrl);
    }, [location.search]);

    const handleSignOut = async () => {
        try {
            const res = await axios.post("/api/user/signout");
            dispatch(signoutSuccess())
        }
        catch (err) {
            console.log(err.response)
        }
    }

    return (
        <Sidebar className="w-full md:w-56">
            <Sidebar.Items>
                <Sidebar.ItemGroup className="flex flex-col gap-y-0.5">
                    <Link to="/dashboard?tab=profile">  { /*<a><a></a></a> not possible hence internal link is marked as div*/}
                        <Sidebar.Item as={"div"} active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin?'Admin':"User"} labelColor='dark'>
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {currentUser.isAdmin && 
                    <Link to="/dashboard?tab=posts" >  { /*<a><a></a></a> not possible hence internal link is marked as div*/}
                        <Sidebar.Item as={"div"} active={tab === 'posts'} icon={HiDocumentText}>
                            Posts
                        </Sidebar.Item>
                    </Link>}
                    <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer my-0" onClick={handleSignOut}>
                        SignOut
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
};