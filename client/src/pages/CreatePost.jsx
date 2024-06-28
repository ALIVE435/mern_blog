import { FileInput, Select, TextInput,Button } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function CreatePost() {
    return (
        <div className="p-3 max-w-3xl min-h-screen mx-auto">
            <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row justify-center">
                    <TextInput type="text" placeholder="Title" className="flex-1" required id="title"></TextInput>
                    <Select>
                        <option value="uncategorised">Select a category</option>
                        <option value="javascript">Javascript</option>
                        <option value="reactjs">ReactJs</option>
                        <option value="nextjs">NextJs</option>
                    </Select>
                </div>
                <div className="flex gap-4 items-center p-3 justify-between border-4 border-teal-500 border-dotted">
                    <FileInput type="file" accept="image/*"></FileInput>
                    <Button type="button" gradientDuoTone='purpleToBlue' size="sm" outline>Upload Image</Button>
                </div>
                <ReactQuill theme="snow" placeholder="Write something..." className="h-72 mb-12" required/>
                <Button type="submit" gradientDuoTone={'purpleToPink'}>Publish</Button>
            </form>
        </div>
    )
}