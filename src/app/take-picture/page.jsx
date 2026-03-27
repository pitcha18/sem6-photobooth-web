'use client'
import { useSearchParams } from "next/navigation";
import { Suspense } from 'react'; // 1. Import Suspense

// 2. Extract your logic into a sub-component
function TakePictureContent() {
    const searchParams = useSearchParams();
    const frameName = searchParams.get("frame");
    const peopleSize = searchParams.get("size");

    return (
        <>
            take a pic for {frameName} with size {peopleSize}
        </>
    );
}

// 3. Keep the page exported as the main component
export default function TakePicturePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TakePictureContent />
        </Suspense>
    );
}