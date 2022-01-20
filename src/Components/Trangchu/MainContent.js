import React from 'react'
import Article from './Article'
function MainContent({posts,user}) {
    return (
        <div>
            
            <Article posts={posts} user={user} />

        </div>
    )
}

export default MainContent
