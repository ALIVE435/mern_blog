import { useSelector } from "react-redux"
import { Button, TextInput } from "flowbite-react"




export const DashProfile = () => {
    const { currentUser } = useSelector(state => state.user);


    return (
        <div className="max-w-lg mx-auto w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form className="flex flex-col gap-4">
                <div className="w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden">
                    <img src={currentUser.photoUrl} alt="user" className="rounded-full h-full border-8 border-[lightGray]" />
                </div>
                <TextInput type="text" id='username' placeholder='username' defaultValue={currentUser.username} />
                <TextInput type="email" id='email' placeholder={"email"} defaultValue={currentUser.email} />
                <TextInput type="password" placeholder="password" id="password" />
                <Button type="submit" gradientDuoTone={"purpleToBlue"}  outline>
                    Update
                </Button>
                <div className="text-red-500 flex justify-between">
                    <div className="cursor-pointer">Delete Account</div>
                    <div className="cursor-pointer">Sign Out</div>
                </div>
            </form>
        </div>
    )
}