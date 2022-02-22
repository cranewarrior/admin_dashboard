import React, {useState, useEffect} from 'react';
import TotalUser from './TotalUser';
import { UserIcon, UserAddIcon, UserGroupIcon, UserRemoveIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import {role, plan, status} from '../data'
import UserFilter from './UserFilter';
import UserTable from './UserTable';
import {useSelector, useDispatch} from 'react-redux'

export default function Users() {
  const [showUsers, setShowUsers] = useState(10)
  const [userSlice, setUserSlice] = useState([[]])
  const [buttonActive, setButtonActive] = useState("1")

  function numberOfUser(e){
    setShowUsers(+e.target.value)
    setButtonActive("1")
  }

    useEffect(()=>{
        !userSlice[+buttonActive-1] && setButtonActive((userSlice.length).toString())
    },[userSlice])

  return (
    <section className="users">

        <div className="totalUsers grid grid-cols-4 gap-10 my-8">
            <TotalUser amount="45,443" desc="Total Users" Icon={UserIcon} bg="bg-indigo-100" color="text-indigo-500"/>
            <TotalUser amount="5,937" desc="Paid Users" Icon={UserAddIcon} bg="bg-red-100" color="text-red-500"/>
            <TotalUser amount="23,474" desc="Active Users" Icon={UserGroupIcon} bg="bg-green-100" color="text-green-500"/>
            <TotalUser amount="354" desc="Pending Users" Icon={UserRemoveIcon} bg="bg-orange-100" color="text-orange-500"/>
        </div>
        
        <div className="filtersContainer bg-white px-8 py-6 rounded-xl shadow-lg mb-8">
          <h3 className="filterHeader font-medium text-3xl text-gray-600 pb-8">Filters</h3>
          <div className="filterBody grid grid-cols-3 gap-10">
            <UserFilter option="Role" setting={role}/>
            <UserFilter option="Plan" setting={plan}/>
            <UserFilter option="Status" setting={status}/>
          </div>
        </div>

        <div className="usersContainer bg-white rounded-xl shadow-lg">
          <div className="usersContainer_header px-7 py-6 flex items-center justify-between">

            <div className="userEntries">
              <label htmlFor="rows" className="label__style">show</label>
              <select id="rows" className="input__style mx-3" onChange={numberOfUser}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <label htmlFor="rows"  className="label__style">Entries</label>
            </div>

            <div className="addUser flex gap-5 items-center">
              <div className="inputBox">
                <label htmlFor="input" className="label__style mr-3">search:</label>
                <input type="search" id="input" className="input__style"/>
              </div>
              <button className="rounded-lg text-2xl px-8 py-3 bg-blue-600 text-white capitalize hover:shadow-lg hover:shadow-blue-400">add new user</button>
            </div>

          </div>

          <UserTable showUsers={showUsers} userSlice={userSlice} setUserSlice={setUserSlice} buttonActive={buttonActive} setButtonActive={setButtonActive}/>

          <div className="userNav_container flex justify-end py-7 px-4">
            <div className="userNavigation flex items-center bg-gray-100 rounded-full">
              <ChevronLeftIcon className="w-5 h-5 ml-3 mr-5 text-gray-500 cursor-pointer"/>
              {
                userSlice.map((slice, index)=>(
                <button key={index} onClick={e=>setButtonActive(e.target.innerText)} className={`w-12 h-12 rounded-full ${index+1==buttonActive?'bg-blue-500 text-white':'text-gray-500'} font-medium text-xl`}>
                  {index+1}
                </button>
                ))
              }
              <ChevronRightIcon className="w-5 h-5 p ml-3 mr-5 text-gray-500 cursor-pointer"/>
            </div>
          </div>
        </div>
    </section>
  )
}
