"use client"

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';

const CreatePrompt = () => {
    const router = useRouter();
    const [isLoading, setisLoading] = useState(false);
    const [post, setPost] = useState({ prompt: '', tag: '' });
    const { data: session } = useSession();

    const createPrompt = async (e) => {
        e.preventDefault();
        setisLoading(true);
        try {
            const response = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag,
                }),
            });

            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setisLoading(false);
        }
    };
    return (
        <Form
            type="Create Post"
            isLoading={isLoading}
            setisLoading={setisLoading}
            post={post}
            setPost={setPost}
            handleSubmit={createPrompt}
        />
    );
};

export default CreatePrompt;