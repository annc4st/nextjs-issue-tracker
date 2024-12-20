'use client';

import { TextField, TextArea, Button, Callout, Text} from '@radix-ui/themes'
import {InfoCircledIcon }  from  '@radix-ui/react-icons';
import dynamic from 'next/dynamic';
 

// Dynamically import react-simplemde-editor to ensure it only loads on the client
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });
import 'easymde/dist/easymde.min.css';
import axios from 'axios'

import {useForm, Controller} from 'react-hook-form'
import { useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchema';
import {z} from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

//  interface IssueForm {
//   title: string;
//   description: string;
//  }

//generate interface based on schema createIssueSchema like above interface
type IssueForm = z.infer<typeof createIssueSchema>;


const NewIssuePage = () => {
  const {register, control, handleSubmit, formState: { errors}} = useForm<IssueForm>({ resolver: zodResolver(createIssueSchema)});

  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit( async (data) => {
    try {
        setIsSubmitting(true)
        await axios.post('/api/issues', data);
        router.push('/issues')  /// send user to issues page
    
    } catch (error) {
      setIsSubmitting(false)
      console.log(error)
      setError('Error occurred.')
    }
  });


  return (
    <div className='max-w-xl space-y-3'>
    
      {error && <Callout.Root color="red">
		<Callout.Icon>
			<InfoCircledIcon />
		</Callout.Icon>
		<Callout.Text>
			{error}
		</Callout.Text>
	</Callout.Root>
}
   

    <form className='max-w-xl space-y-3' onSubmit={onSubmit}>

        <TextField.Root placeholder="Title" {...register('title')} />
        {/* {errors.title && (<Text color="red" as="p">{errors.title.message}</Text>)}  instead of this =>> ErrorMessage*/}
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
   

      <Controller name="description" 
      control={control} 
      render = {({field }) => <SimpleMDE placeholder="Description of an issue" {...field} /> } />
      {errors.description && (<Text color="red" as="p">{errors.description.message}</Text>)}
       
      <Button disabled={isSubmitting}>Submit{isSubmitting && <Spinner />}</Button>
  
    </form>
    </div>
  )
}

export default NewIssuePage;