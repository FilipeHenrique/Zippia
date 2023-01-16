import { api } from "@/services/axios";
import { GetServerSideProps } from "next";
import { Key, useEffect, useState } from "react";
import Image from 'next/image';
import Card from "@/components/Card";
import ZippiaLogo from '../../assets/zippialogo.png'

interface Job {
    jobTitle: string,
    companyName: string,
    jobDescription: string
    postingDate: string
}

interface JobsProps {
    jobsResponse: Job[]
}


export default function Jobs({jobsResponse}: JobsProps){

    const [jobs,setJobs] = useState(jobsResponse);
    
    function sortJobsByCompanyName () {

        let sortedJobs = [...jobsResponse];

        // sort by alphabetical order
        sortedJobs.sort((a: Job,b: Job)=>{
            if (a.companyName < b.companyName) {
                return -1;
            }
            if (a.companyName > b.companyName) {
                 return 1;
            }
            return 0;
        })

        setJobs(sortedJobs);
    }

    function filterJobsInLastSevenDays () {
        
        let filteredJobs = [...jobsResponse];

        filteredJobs = filteredJobs.filter((job)=>{

            let today = new Date();
            let jobDate = new Date(job.postingDate);

            // difference in miliseconds
            var Difference_In_Time = today.getTime() - jobDate.getTime();

            // difference in days = difference in miliseconds divided per miliseconds in a day
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

            if(Difference_In_Days <= 7){
                return 1;
            }

        })

        setJobs(filteredJobs);

    }

    function clearFilters () {
        setJobs(jobsResponse);
    }

    return(
        <div className="bg-gray-50">
            
            <div className="flex flex-col items-center z-10 bg-gray-50 py-10">
                <Image
                    className="w-80 mb-2"
                    src={ZippiaLogo} alt={"Zippia Logo"}   
                />
                <p className="text-gray-500 mb-2"> Jobs Sorting options:</p>
                <div 
                    className="flex flex-col items-center justify-center space-y-2
                     sm:flex-row sm:space-x-2 sm:space-y-0"
                >
                    <button onClick={()=>{filterJobsInLastSevenDays()}} className="btn-primary">Latest Jobs (7 Days)</button>
                    <button onClick={()=>{sortJobsByCompanyName()}} className="btn-primary">Company Name</button>
                    <button onClick={()=>{clearFilters()}} className="btn-primary">Set to Default</button>
                </div>
            </div>

            <div className="space-y-6 mt-6 bg px-16 pb-16">
                {
                    jobs?.map((job: Job, index: number)=>{
                        return(
                            <Card 
                                key={index} 
                                jobTitle={job.jobTitle} 
                                jobDescription={job.jobDescription} 
                                companyName={job.companyName} 
                            />
                        )
                    }).slice(0,10)
                }
            </div>
        </div>
    );

}

export const getServerSideProps: GetServerSideProps = async () => {

    const requestPayload = {
        "companySkills": true,
        "dismissedListingHashes": [],
        "fetchJobDesc": true,
        "jobTitle": "Business Analyst",
        "locations": [],
        "numJobs": 20,
        "previousListingHashes": []
    }

    const jobsResponse = await api.post('api/jobs',requestPayload);
  
    return {
      props: {
        jobsResponse: jobsResponse.data.jobs
      },
    }
  }