interface cardProps {
    jobTitle: string,
    companyName: string,
    jobDescription: string
}

export default function Card ({jobTitle,companyName,jobDescription}: cardProps){
    return(
        <div 
            className="p-8 border-gray-100 border-2 shadow-lg bg-white  
            transition ease-in-out delay-150 hover:scale-105 duration-100
            " 
        >
            <h1 className="text-2xl text-blue-700">{jobTitle}</h1>
            <h2 className="text-sm text-gray-800">{companyName}</h2>
            <div dangerouslySetInnerHTML={{__html: jobDescription}}
                className= "text-gray-500 text-sm mt-4 truncate line-clamp-3"
            />
        </div>
    );
}