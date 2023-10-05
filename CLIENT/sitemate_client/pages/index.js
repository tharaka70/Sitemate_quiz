import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [issues, setIssues] = useState([]);

  const router = useRouter()

  useEffect(() => {
    // Fetch data from the endpoint
    fetch('http://127.0.0.1:8000/issues')
      .then(response => response.json())
      .then(data => setIssues(data))
      .catch(error => console.error('Error:', error));
  }, []);


  const deleteIssue = (issueId) => {
    fetch(`http://127.0.0.1:8000/issue/${issueId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
    })
    .then(response => {
      if (response.ok) {
        fetch('http://127.0.0.1:8000/issues')
        .then(response => response.json())
        .then(data => setIssues(data))
        .catch(error => console.error('Error:', error));
        return response.json();
         // Parse the JSON response if the request is successful
      }
      throw new Error('Network response was not ok.');
    })
    .then(deletedIssue => {
      // Handle the deleted issue data
      console.log('Deleted Issue:', deletedIssue);
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
    });

  }

  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
    <h1 className='text-neutral-400'>All ISSUES</h1>
    <div className='text-neutral-400'>
      <ul>
        {issues.map(issue => (
          <li key={issue.id}>
            <p  className='text-neutral-400'><span  className='text-neutral-200'>Issue Id :</span>{issue.id}</p>
            <p className='text-neutral-400'><span  className='text-neutral-200'>Title :</span>{issue.title}</p>
            <p  className='text-neutral-400'><span  className='text-neutral-200'>Description :</span>{issue.description}</p>
            <button  className='text-green-400  hover:text-green-200'>View</button> <button  className='text-blue-400  hover:text-blue-200'>Edit</button> <button onClick={() => deleteIssue(issue.id)} className='text-red-400 hover:text-red-200'>Delete</button>
            <p className='text-neutral-400'>-----------------------------</p>
          </li>
        ))}
      </ul>
    </div>
   
    </main>
  )
}
