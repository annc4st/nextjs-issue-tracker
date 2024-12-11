'use client';

import { TextField, TextInput, TextArea, Button, Callout } from '@radix-ui/themes'
import {InfoCircledIcon }  from  '@radix-ui/react-icons';
import dynamic from 'next/dynamic';
 

// Dynamically import react-simplemde-editor to ensure it only loads on the client
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });
import 'easymde/dist/easymde.min.css';
import axios from 'axios'

import {useForm, Controller} from 'react-hook-form'
import { useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';

 interface IssueForm {
  title: string;
  description: string;
 }

const NewIssuePage = () => {
  const {register, control, handleSubmit} = useForm<IssueForm>();
  // console.log(register('title'));
  const router = useRouter();
  const [error, setError] = useState('');


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
   

    <form className='max-w-xl space-y-3' 
    onSubmit={handleSubmit( async (data) => {
      try {
       
        await axios.post('/api/issues', data);
        router.push('/issues')  /// send user to issues page
      
      } catch (error) {
        console.log(error)
        setError('Error occurred.')
      }
    }) }>

        <TextField.Root placeholder="Title" {...register('title')} />
   

      <Controller name="description" 
      control={control} 
      render = {({field }) => <SimpleMDE placeholder="Description of an issue" {...field} /> } />
       
      <Button>Submit</Button>
    </form>
    </div>
  )
}

export default NewIssuePage;