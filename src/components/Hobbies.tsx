import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

  const Hobbies = () => {
  interface Hobbies {
    id: number,
    name: string,
    description: string,
    img: string
  }
  
  const [hobbies, setHobbies] = useState<Hobbies[]>([]);

  const getUserHobbies = async () => {
    const res:AxiosResponse = await axios.get('http://localhost:5000/api/hobbies');

    const data = await res.data;

    await setHobbies(data);
  }

  useEffect(() => {
    getUserHobbies();
  }, [])
  return (
    <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {
              //Check if there are hobbies in the query
              hobbies.length > 0 ?
              <> {
              hobbies.map(hobby => {
                return (
                    <div className="p-4 md:w-1/3">
                      <div className="h-full rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
                      <img className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100" src={hobby.img} alt="hobby_img"/>
                        <div className="p-6">
                          <h1 data-for="name" className="title-font text-lg font-medium text-gray-600 mb-3">{hobby.name}</h1>
                          <p className="leading-relaxed mb-3">{hobby.description}</p>
                          <div className="flex items-center flex-wrap ">
                            <a href={`https://en.wikipedia.org/wiki/${hobby.name}`}  className="bg-gradient-to-r from-cyan-400 to-blue-400 hover:scale-105 drop-shadow-md shadow-cla-blue px-4 py-1 rounded-lg">Learn more</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    )
                  }) 
                } </> : 
                (<div className="bg-purple-700 relative overflow-hidden h-screen">
                      <div className="inset-0 bg-black opacity-25 absolute">
                      </div>
                    <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
                      <div className="w-full font-mono flex flex-col items-center relative z-10">
                         <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4">
                          Hobbies Not Found
                        </h1>
                        <p className="font-extrabold text-8xl my-44 text-white animate-bounce">
                          404
                        </p>
                      </div>
                    </div>
                  </div>
                  )
            }
          </div>
        </div>
      </section>
  )
}

export default Hobbies