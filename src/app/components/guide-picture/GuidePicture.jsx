import { useEffect, useState } from "react"
import { useStorage } from "@/app/hooks/useStorage";
import Image from "next/image";
import { DownloadPictureButton } from "../take-picture/DownloadPictureButton";
import { SharePictureButton } from "../take-picture/SharePictureButton";
import { usePicture } from "../take-picture/usePicture";

export function GuidePicture() {
    const [ peopleCount , setPeopleCount ] = useState(1);
    const { getAllImageUrlFromFolder } = useStorage();
    const [ urls , setUrl] = useState([]);
    const [ localPhoto , setLocalPicture ] = useState({file:null});

    const handleClick = async () => {
        const image = await getAllImageUrlFromFolder(peopleCount+'-people');
        setUrl(image);
        // console.log(image);
    }

    const { createTestFile } = usePicture();
    // Fix 1: Wrap the test file creation in a useEffect so it only runs ONCE
    useEffect(() => {
        const initTestFile = async () => {
            const file = await createTestFile();
            setLocalPicture({ file });
        };
        initTestFile();
    }, []); // Empty array means "only run on page load"

    return <>
    <ul className="">
    <li><button onClick={()=>setPeopleCount(1)}>1 person</button></li>
    <li><button onClick={()=>setPeopleCount(2)}>2 person</button></li>
    <li><button onClick={()=>setPeopleCount(3)}>3 person</button></li>
    <li><button onClick={()=>setPeopleCount(4)}>4 person</button></li>
    <li><button onClick={handleClick}>load image</button></li>

    <SharePictureButton
        pictureUrl={urls[0]}
        pictureFile={localPhoto.file}
        buttonText="Click to share"
    />
    <DownloadPictureButton
        pictureUrl={urls[0]}
        buttonText="Click to download"
    />

    </ul>
        {urls[0] === "" ? null : (
              <Image 
                src={urls[0]} 
                alt="pic" 
                width={500} 
                height={500} // Next.js Image requires height if not using 'fill'
              />
        )}
    </>
}