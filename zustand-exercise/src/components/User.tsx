import { useState, type FormEvent } from "react"
import { useUserStore } from "../store/user.store"

const User = () => {
   const { users, addUser, deleteUser  } = useUserStore()
   const [ fnameInput, setFnameInput ] = useState<string>('')
   const [ lnameInput, setLnameInput ] = useState<string>('')
   const [ ageInput, setAgeInput ] = useState<number>(0)
   const [ hobbiesInput, setHobbiesInput ] = useState<string[]>([])

   // const handleChange = (hobby: string) => {
   //    setHobbiesInput((prev) => prev.includes(hobby) ? prev.filter(h => h !== hobby) :[...prev, hobby] )
   // };

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      addUser({
         firstname: fnameInput,
         lastname: lnameInput,
         age: ageInput,
         hobbies: hobbiesInput
      })
   }

   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setHobbiesInput((prev) => [...prev, value]);
    } else {
      setHobbiesInput((prev) => prev.filter((hobby) => hobby !== value));
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
         {users.map(u => (
            <li>
               <span>{u.firstname} {u.lastname} - {u.age} years old - Hobbies: {u.hobbies.map(h => (
                  <p>{h}</p>
               ))}</span>
               <button onClick={() => deleteUser(u.id)}>Delete User</button>
            </li>
         ))}
      </ul>

      <form style={{
         display: "flex",
         flexDirection: "column",
         padding: "10px"
      }} onSubmit={handleSubmit}>
         <input type="text" value={fnameInput} placeholder="Enter First name..." onChange={(e) => setFnameInput(e.target.value)} />
         <input type="text" value={lnameInput} placeholder="Enter Last name..." onChange={(e) => setLnameInput(e.target.value)} />
         <input type="number" value={ageInput} onChange={(e) => setAgeInput(Number(e.target.value))} />
         <div>
            <h4>Hobbies: </h4>
            <input type="checkbox" value="skiing" onChange={handleCheckboxChange} name="skiing"/> 
            <label htmlFor="skiing">Skiing</label>
            <input type="checkbox" value="Fishing Sharks" onChange={handleCheckboxChange} name="Fishing Sharks"/> 
            <label htmlFor="Fishing Sharks">Fishing Sharks</label>
            <label htmlFor="Flying">
               <input type="checkbox" value="Flying" onChange={handleCheckboxChange} name="Flying"/> 
               Flying
            </label>

         </div>

         <button>Add user</button>
      </form>
    </div>
  )
}

export default User