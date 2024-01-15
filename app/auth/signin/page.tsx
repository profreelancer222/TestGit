"use client";
import Image from 'next/image'
import Link from 'next/link'
import Input from '../../../components/semicomponents/Input'
import Button from '../../../components/semicomponents/Input'
import coffeePicture from '../../../public/assest/pictures/coffee.png'
import logo from '../../../public/assest/pictures/logo.png'
import search from '../../../public/assest/icons/search.svg'
import eye from '../../../public/assest/icons/eye.svg'
import facebook from '../../../public/assest/icons/facebook.svg'
import google from '../../../public/assest/icons/google.svg'
import { test } from './basicdata'
import { useEffect, useState } from 'react';
import { Router } from "next/router";
import { useCookies } from "react-cookie";
import isEmpty from "is-empty";
import axios from "axios";
import qs from "qs";
import { ToastContainer, toast } from 'react-toastify';



export default function Page() {
	const router = Router
	const [cookies, setCookie] = useCookies(['jwtToken']);
	const [user, setUser] = useState("");

	const [type, setType] = useState(true); // type = false -> sign in page, true -> sign up
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const logIn = async () => {

		await axios.post(`http://localhost:8000/api/login`, qs.stringify({ email: email, password: password }))
			.then(result => {
				console.log(result.data);
				localStorage.setItem("token", result.data.token);
				toast((result.data.token) ? "success" : null)
				toast(result.data.error)
				if(result.data.token) 
					location.href = "/job/hire"
			})
			.catch(
				err => {
					console.log(err.message)
					toast(err.message)
				}
			)
	}

	const googleLoginMiddleware = async () => {
		 axios.defaults.headers.common['authorization'] = user;
			//console.log(user.access_token);
			await axios
			  .get(
				`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user}`,
				{
				  headers: {
					Authorization: `Bearer ${window.localStorage.getItem("token")}`,
					Accept: "application/json",
				  },
				}
			  )
			  .then((res) => {
				console.log(res.data);
				location.href="/job/hire";
			  })
			  .catch((err) => console.log(err));
	}

	return (
		<div className="w-full h-[300vh] bg-slate-200 justify-center items-center inline-flex"><ToastContainer />
			<div className="w-[721px] h-[557px]">
				<div className="w-[721px] h-[557px] self-center grow shrink basis-0 p-6 bg-white rounded-2xl shadow justify-center items-center gap-6 inline-flex">
					<Image
						className="self-stretch rounded-lg"
						width={246}
						height={509}
						src={coffeePicture}
						alt="Sign image"
					/>
					<div className="grow shrink basis-0 self-stretch pt-6 flex-col justify-start items-center gap-6 inline-flex">
						<div className="w-[258px] h-7 justify-center items-center inline-flex">
							<Image className='w-[258px] h-7 relative' src={logo} alt='Logo image' />
						</div>
						<div className="flex-col justify-start items-center gap-1 flex">
							<div className="text-sky-700 text-base font-semibold font-['Rubik']">{"Welcome to back"}</div>
							<div className="text-zinc-400 text-[30px] font-normal font-['Rubik']">{"Sign in to continue"}</div>
						</div>
						<div className="self-stretch h-[136px] flex-col justify-start items-center gap-[18px] flex">
							<div className="self-stretch h-[59px] flex-col justify-start items-start gap-2.5 flex">
								<div className="text-neutral-600 text-sm font-normal font-['Rubik']">Email Address</div>
								<Input type="search" onChange={(value) => setEmail(value)} value={email} />
							</div>
							<div className="self-stretch h-[59px] flex-col justify-start items-start gap-2.5 flex">
								<div className="text-neutral-600 text-sm font-normal font-['Rubik']">User Password</div>
								<Input type="password" onChange={(value) => setPassword(value)} value={password} />
							</div>
						</div>
						
						<div className="self-stretch justify-start items-center gap-3 inline-flex">
							<div className="grow shrink basis-0 h-[0px] border border-zinc-400"></div>
							<div className="text-zinc-400 text-sm font-normal font-['Rubik']">or</div>
							<div className="grow shrink basis-0 h-[0px] border border-zinc-400"></div>
						</div>
						<div className="self-stretch h-[76px] flex-col justify-start items-start gap-3 flex">
						
						</div>
					</div>
					<button className="w-[403px] h-8 px-6 py-2 bg-indigo-900 rounded-lg justify-center items-center gap-2.5 inline-flex" onClick={logIn}>
							<div className="text-slate-200 text-sm font-normal font-['Rubik'] capitalize">Login</div>
						</button>
				</div>
			</div>
		</div>
	)
}   