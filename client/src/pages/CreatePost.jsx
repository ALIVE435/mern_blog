import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { FileInput, Select, TextInput,Button, Alert } from "flowbite-react";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
    const [file, setFile] = useState(null);
    const [fileUploadProgress,setFileUploadProgress] = useState(null);
    const [fileUploadError, setFileUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate()
    const handleFileUpload = async () =>{
        try{
            if(!file){
                setFileUploadError('Please select an image')
                return;
            }
            setFileUploadError(null)
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name
            const storageRef = ref(storage,fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',(snapshot)=>{
                const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                setFileUploadProgress(progress.toFixed(0));
            },(err)=>{
                setFileUploadError('Image upload failed, size should be less than 2mb');
                setFileUploadProgress(null)
            },()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    setFileUploadError(null);
                    setFileUploadProgress(null);
                    setFormData({...formData,image:downloadURL})
                })
            })
        }
        catch(err){
            setFileUploadError('Image upload failed');
            setFileUploadProgress(null)
            console.log(err)
        }
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        setPublishError(null)
        try{
            const res = await axios.post("api/post/create",formData)
            navigate(`/post/${res.data.slug}`)
        }
        catch(err){
            console.log(err.response)
            setPublishError(err.response.data.message)
        }
    }
    return (
        <div className="p-3 max-w-3xl min-h-screen mx-auto">
            <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 sm:flex-row justify-center">
                    <TextInput type="text" placeholder="Title" className="flex-1" onChange={(e)=>setFormData({...formData, title:e.target.value})} required id="title"></TextInput>
                    <Select onChange={(e)=>setFormData({...formData, category:e.target.value})}>
                        <option value="uncategorised">Select a category</option>
                        <option value="javascript">Javascript</option>
                        <option value="reactjs">ReactJs</option>
                        <option value="nextjs">NextJs</option>
                    </Select>
                </div>
                <div className="flex gap-4 items-center p-3 justify-between border-4 border-teal-500 border-dotted">
                    <FileInput type="file" accept="image/*" onChange={(e)=>setFile(e.target.files[0])}></FileInput>
                    <Button type="button" gradientDuoTone='purpleToBlue' size="sm" disabled={fileUploadProgress} outline onClick={handleFileUpload}>
                        {fileUploadProgress?(<CircularProgressbar className="w-10, h-10" value={fileUploadProgress} text={`${fileUploadProgress || 0}%`}/>):'Upload Image'}
                    </Button>
                </div>
                {fileUploadError && <Alert color={'failure'}>{fileUploadError}</Alert>}
                {formData.image && (
                    <img src={formData.image} alt='upload' className="w-full h-72 object-cover"/>
                )}
                <ReactQuill theme="snow" placeholder="Write something..." onChange={(value)=>setFormData({...formData, content:value})} className="h-72 mb-12" required/>
                <Button type="submit" gradientDuoTone={'purpleToPink'}>Publish</Button>
                {publishError && <Alert color={'failure'}>{publishError}</Alert>}
            </form>
        </div>
    )
}