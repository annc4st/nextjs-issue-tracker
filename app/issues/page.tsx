'use client';
import React, { useState, useEffect} from 'react'
import { Button, TextField} from '@radix-ui/themes'
import Link from 'next/link'
import axios from 'axios'

const IssuesPage = () => {
    const [issues, setIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect (() => {
        const fetchIssues = async() => {
            try {
                setIsLoading(true);
                //fetch issues

                const response = await axios.get('/api/issues');
                setIssues(response.data)
            } catch (error) {
                console.error(error);
                setError('Error occurred while fetching issues.');
            } finally {
                setIsLoading(false);
              }
        };
        fetchIssues();
    }, []);


  return (
    <div>
            
        <div><Button><Link href='/issues/new'>Add New Issue</Link></Button></div>

        <div className="overflow-auto">
        <table className="table-auto border-collapse border border-gray-400 w-full mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">ID</th>
              <th className="border border-gray-400 px-4 py-2">Title</th>
              <th className="border border-gray-400 px-4 py-2">Description</th>
              <th className="border border-gray-400 px-4 py-2">Status</th>
              <th className="border border-gray-400 px-4 py-2">Created At</th>
              <th className="border border-gray-400 px-4 py-2">Updated At</th>
              <th className="border border-gray-400 px-4 py-2">Update Status</th>
            </tr>
          </thead>
  <tbody>
       {issues && (
                issues.map((issue) => ( 
                    <tr key={issue.id}>
                        <td className="border border-gray-400 px-4 py-2">{issue.id}</td>
                        <td className="border border-gray-400 px-4 py-2">{issue.title}</td>
                        <td className="border border-gray-400 px-4 py-2">{issue.description}</td>
                        <td className="border border-gray-400 px-4 py-2">{issue.STATUS}</td>
                        <td className="border border-gray-400 px-4 py-2"> {new Date(issue.createdAt).toLocaleString()}</td>
                        <td className="border border-gray-400 px-4 py-2">{new Date(issue.updatedAt).toLocaleString()}</td>
                        <td className="border border-gray-400 px-4 py-2"></td>
                    </tr>
                ))
            )}
            </tbody>
            </table>

        </div>
        </div>

  
  )
}

export default IssuesPage