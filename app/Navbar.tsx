'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { ImAndroid } from "react-icons/im"

import classnames from 'classnames';

const Navbar = () => {
    const currentPath = usePathname()
    console.log(currentPath);

    const links = [
        {label: "Dashboard", href: "/"},
        {label: "Issues", href: "/issues"},
    ];

  return (

    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/"><ImAndroid /></Link>
        <ul className='flex space-x-6'>
           { links.map(link => 
            <Link key={link.href} 
            // className={`${link.href=== currentPath ? 'text-zinc-900' : 'text-zinc-600'} hover:text-zinc-800 transition-colors` }
            className={ classnames({
                'text-zinc-900': link.href === currentPath,
                'text-zinc-600': link.href !== currentPath,
                'hover:text-zinc-800 transition-colors' : true
            })}
            href={link.href}>{link.label}
            </Link>
           )
        }
{/* 
            <li><Link className="text-zinc-600 hover:text-zinc-800 transition-colors" href="/">Dashboard</Link></li>
            <li><Link className="text-zinc-600" href="/issues">Issues</Link></li> */}
        </ul>
        </nav>
  )
}

export default Navbar