import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);


    useEffect(() => {

        let passwords = localStorage.getItem("passwords");

        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }

        return () => {

        }
    }, [])


    const copyText = (text) => {
        toast(' 🙄 copied to clipboard ', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
           
        });
        navigator.clipboard.writeText(text);

    }
    const savePassword = () => {

        if(form.site.length > 3 && form.username.length > 3 && form.password.length>3){
            setPasswordArray([...passwordArray, {...form, id : uuidv4()}]);
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id : uuidv4()}]));
        console.log([...passwordArray, form]);
        setForm({ site: "", username: "", password: "" })
        toast('😎 Password Saved !', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
           
        });
        }
        else{
            toast('Error : Somthing Went Wrong !!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
           
        });
        }
        
    }

    const deletePassword = (id) => {
        let c = confirm("Do you really want to Delete this ?");
        if(c){
            setPasswordArray(passwordArray.filter((item)=>item.id !== id));
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item)=>item.id !== id)));
        toast('💀 Password Deleted !!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
           
        });
        }
        
       
    }
    const editPassword = (id) => {
  let editItem = passwordArray.find((item) => item.id === id);
  if (editItem) {
    setForm({
      site: editItem.site,
      username: editItem.username,
      password: editItem.password
    });
  }
   setPasswordArray(passwordArray.filter((item)=>item.id !== id));
}

    function showPassword() {
        passwordRef.current.type = "text";
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png";
            passwordRef.current.type = "password";
        }
        else {
            ref.current.src = "icons/eyecross.png";
            passwordRef.current.type = "text";
        }


    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className=" p-2 md:mx-auto md:w-[67vw] md:p-0 md:mycontainer min-h-[87.7vh] md:min-h-[84.4vh]">
                <h1 className='text-4xl font-bold text-center'><span className='text-green-500'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/&gt;</span></h1>
                <p className='text-green-900 text-center text-lg'>Your Own Password Manager</p>
                <div className="flex flex-col p-4 text-white gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className=' rounded-full border border-green-500 text-black p-4 py-1 w-full' type="text" name='site' />
                    <div className="flex flex-col md:flex-row gap-8 w-full ">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className=' w-full rounded-full border border-green-500 text-black p-4 py-1' type="text" name='username' />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className=' w-full rounded-full border border-green-500 text-black p-4 py-1' type="password" name='password' /><span onClick={showPassword} className='absolute right-[3px] top-[4px] cursor-pointer text-black'>
                                <img ref={ref} className='p-1' width={26} src="public/icons/eye.png" alt="" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='text-black flex gap-2 justify-center items-center bg-green-600 rounded-full px-8 py-2 w-fit hover:bg-green-500 border-2 border-green-900'><lord-icon
                        src="https://cdn.lordicon.com/efxgwrkc.json"
                        trigger="hover">
                    </lord-icon>Save Password</button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>NO Passwords To Show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto text-[10px] md:text-[15px] md:w-full overflow-hidden rounded-md mb-10">
                            <thead className=' bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Passwords</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((e, index) => {
                                    return <tr key={index}>
                                        <td className=' border border-white py-2 text-center'>
                                            <div className='flex justify-center items-center'>
                                                <a href={e.site} target='_blank'>{e.site}

                                                </a>
                                                <div className="lordiconcopy size-7 cursor-pointer" onClick={() => copyText(e.site)}>

                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='border border-white py-2 text-center w-32'>
                                            <div className='flex justify-center items-center'>
                                                {e.username}
                                                <div className="lordiconcopy size-7 cursor-pointer" onClick={() => copyText(e.username)}>

                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='border border-white py-2 text-center w-32'>
                                            <div className='flex justify-center items-center'>
                                                {e.password}
                                                <div className="lordiconcopy size-7 cursor-pointer" onClick={() => copyText(e.password)}>

                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        <td className='border border-white py-2 text-center w-32'>
                                            <span className='cursor-pointer mx-1' onClick={()=>{editPassword(e.id)}} >
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1'onClick={()=>{deletePassword(e.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                        </td>
                                    </tr>
                                })}


                            </tbody>
                        </table>}

                </div>
            </div>


        </>
    )
}


export default Manager
