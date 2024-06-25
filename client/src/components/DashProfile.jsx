import { useSelector, useDispatch } from "react-redux"
import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react';
import { useState, useRef, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable, } from 'firebase/storage'
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateEnd, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutSuccess} from "../redux/user/userSlice";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export const DashProfile = () => {
    const { currentUser, loading } = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const fileRef = useRef(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
    const [imageFileUploadError, setImageFileUploadError] = useState(null)
    const [imageUploading, setImageUploading] = useState(null)
    const [updateData, setUpdateData] = useState({});
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleFileChange = (e) => {
        const image = e.target.files[0];
        if (image) {
            setImageFile(image)
            setImageFileUrl(URL.createObjectURL(image))
        }
    }
    const uploadImage = async () => {       //https://firebase.google.com/docs/storage/web/upload-files   
        setImageFileUploadError(null);
        setImageUploading(true)
        const imageStorage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        // console.log(fileName)
        const storageRef = ref(imageStorage, fileName);
        // console.log(storageRef)
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        // console.log(uploadTask)
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError("couldn't upload file (file must be less than 2mb)");
                setImageFile(null);
                setImageFileUrl(null)
                setImageUploading(false)
                setImageFileUploadProgress(null)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    //console.log(downloadURL)
                    setImageFileUrl(downloadURL);
                    setUpdateData({ ...updateData, photoUrl: downloadURL });
                    setImageFileUploadProgress(null);
                    setImageUploading(false)
                })
            }
        )
    };

    useEffect(() => {
        if (imageFile) uploadImage()
    }, [imageFile])

    const handleDataChange = (e) => {
        setUpdateData({ ...updateData, [e.target.id]: e.target.value })
    }
    const submitChange = async (e) => {
        e.preventDefault();
        //console.log(updateData)
        if (Object.keys(updateData).length == 0) return setErrorMessage("No changes made")
        if (imageUploading) {
            return setErrorMessage("Please wait while image being uploaded")
        }
        try {
            setErrorMessage(null);
            dispatch(updateStart());
            const updateResult = await axios.put(`/api/user/update/${currentUser._id}`, updateData);
            //console.log(updateResult)
            dispatch(updateEnd(updateResult.data));
        } catch (err) {
            setErrorMessage(err.response.data.message);
            dispatch(updateFailure())
            //console.log(err)
        }
    }
    const handleDeleteUser = async () => {
        setShowModal(false);
        try {
            dispatch(deleteUserStart());
            const res = await axios.delete(`/api/user/delete/${currentUser._id}`);
            dispatch(deleteUserSuccess(res.data));
        } catch (error) {
            setErrorMessage(error.response.data.message)
            dispatch(deleteUserFailure());
        }
    };
    const handleSignOut = async ()=>{
        setErrorMessage(null)
        try{
            const res = await axios.post("/api/user/signout");
            //console.log(res.data)
            dispatch(signoutSuccess())
        }
        catch(err){
            console.log(err.response.data)
            setErrorMessage("some error occured, try again")
        }
    };


    return (
        <div className="max-w-lg mx-auto w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form className="flex flex-col gap-4">
                <input type="file" accept="image/*" onChange={handleFileChange} ref={fileRef} hidden />
                <div className="w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden relative">
                    {imageFileUploadProgress && <CircularProgressbar value={imageFileUploadProgress || 0}
                        text={`${imageFileUploadProgress}%`}
                        strokeWidth={5}
                        styles={{
                            root: { width: "100%", height: "100%", position: "absolute", top: "0", left: "0" },
                            path: { stroke: `rgba(62,152,199), ${imageFileUploadProgress}/100` }
                        }} />
                    }
                    <img src={imageFileUrl || currentUser.photoUrl} alt="user" onClick={() => fileRef.current.click()} className="rounded-full w-full object-fill h-full border-8 border-[lightGray]" />
                </div>
                {imageFileUploadError && <Alert color={'failure'}>
                    {imageFileUploadError}
                </Alert>}
                <TextInput type="text" id='username' placeholder='username' onChange={handleDataChange} defaultValue={currentUser.username} />
                <TextInput type="email" id='email' disabled placeholder={"email"} onChange={handleDataChange} defaultValue={currentUser.email} />
                <TextInput type="password" placeholder="password" onChange={handleDataChange} id="password" />
                <Button type="submit" gradientDuoTone={"purpleToBlue"} disabled={loading || imageUploading} onClick={submitChange} outline>
                    Update
                </Button>
                <div className="text-red-500 flex justify-between">
                    <div className="cursor-pointer" disabled={loading || imageUploading} onClick={() => {setShowModal(true)
                        setErrorMessage(null);
                    }}>Delete Account</div>
                    <div className="cursor-pointer" onClick={handleSignOut}>Sign Out</div>
                </div>
                <div>
                    {
                        errorMessage ? <Alert className="mt-5 " color="failure">
                            {errorMessage}
                            <AiOutlineCloseCircle onClick={() => setErrorMessage(null)} />
                        </Alert> : ""
                    }
                </div>
            </form>
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete your account?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDeleteUser}>
                                Yes, I'm sure
                            </Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}