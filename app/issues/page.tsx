import React from 'react'
import { Button, TextField} from '@radix-ui/themes'
import Link from 'next/link'

const IssuesPage = () => {
  return (
    <div>
            
            <div><Button><Link href='/issues/new'>Add New Issue</Link></Button></div>

            
        

    </div>
  
  )
}

export default IssuesPage