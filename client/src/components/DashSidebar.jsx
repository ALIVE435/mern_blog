import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom"
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi"
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import axios from "axios";

export const DashSidebar = () => {
    const location = useLocation();
    const [tab, setTab] = useState("");
    const dispatch = useDispatch();

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
                <Sidebar.ItemGroup>
                    <Link to="/dashboard?tab=profile" >  { /*<a><a></a></a> not possible hence internal link is marked as div*/}
                        <Sidebar.Item as={"div"} active={tab === 'profile'} icon={HiUser} label={"User"} labelColor='dark'>
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut}>
                        SignOut
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
};