import React, { ReactNode } from "react";

interface BlogsProps{
    children: ReactNode
}

const HomeLayout: React.FC<BlogsProps> = ({children}) => {
    return (
        <div>HomeLayout</div>
    )
}

export default HomeLayout