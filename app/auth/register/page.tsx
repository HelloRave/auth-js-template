"use client"

import InputGroup from "@/app/components/InputGroup";
import { TSignupSchema, signUpSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { registerUser } from "./action";

export default function RegisterHookForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset,
    } = useForm<TSignupSchema>({
        mode: 'onTouched',
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = handleSubmit(async data => {
        console.log(data)
        const result = await registerUser(data);

        console.log(result)

        if (!result) {
            console.log('Something went wrong');
            return;
        }

        if (result.error) {
            console.log(result.error);
            return;
        }

        reset();
    })

    return (
        <div className="min-h-full flex justify-center my-10">
            <div className="flex flex-col justify-center items-center w-1/2 py-10 shadow-md rounded bg-white">
                <div className="sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold text-gray-900">
                        Sign up for an account
                    </h2>
                </div>
                <div className="mt-10 sm:w-full sm:max-w-sm">
                    <form onSubmit={onSubmit} className="flex flex-col gap-3">
                        <div>
                            <InputGroup<TSignupSchema>
                                label="Name"
                                name="name"
                                type="text"
                                register={register}
                                errors={errors}
                            />
                        </div>
                        <div>
                            <InputGroup<TSignupSchema>
                                label="Email"
                                name="email"
                                type="email"
                                register={register}
                                errors={errors}
                            />
                        </div>
                        <div>
                            <InputGroup<TSignupSchema>
                                label="Password"
                                name="password"
                                type="password"
                                register={register}
                                errors={errors}
                            />
                        </div>
                        <div>
                            <InputGroup<TSignupSchema>
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                register={register}
                                errors={errors}
                            />
                        </div>
                        <button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                            className="bg-indigo-600 mt-10 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
                                        disabled:bg-slate-300
                                        hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 rounded"
                        >
                            Submit
                        </button>
                    </form>
                    <div className="mt-5 flex flex-col items-center gap-3">
                        <button>Google</button>
                    </div>
                    <div className="mt-5">
                        <p className="text-center">
                            {
                                `Already have an account? Login `
                            }
                            <Link href={'/auth/login'}
                                className="underline"
                            >
                                here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}