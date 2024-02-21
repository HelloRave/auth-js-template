'use client'

import Link from "next/link";
import { useForm } from "react-hook-form";
import InputGroup from "../../components/InputGroup";
import { TLoginSchema, authenticate } from "./action";
import { useFormState } from "react-dom";

export default function LoginHookForm() {
    const {
        register,
        formState: { isSubmitting, isValid, errors },
    } = useForm<TLoginSchema>({
        mode: 'onTouched',
    });

    const emailValidation = {
        label: 'Email',
        type: 'text',
        register: register,
        rules: { required: 'Email is required' },
        errors: errors,
    }

    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <div className="min-h-full flex justify-center my-10">
            <div className="flex flex-col justify-center items-center w-1/2 py-10 shadow-md rounded bg-white">
                <div className="sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold text-gray-900">
                        Login
                    </h2>
                </div>
                <div className="mt-10 sm:w-full sm:max-w-sm">
                    <form action={dispatch} className="flex flex-col gap-3">
                        <div>
                            <InputGroup<TLoginSchema>
                                name='email'
                                placeholder="joe@email.com"
                                {...emailValidation}
                            />
                        </div>
                        <div>
                            <InputGroup<TLoginSchema>
                                label="Password"
                                name="password"
                                type="password"
                                register={register}
                                rules={{ required: 'Password is required' }}
                                errors={errors}
                            />
                        </div>
                        <button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                            className="bg-indigo-600 mt-5 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
                                        disabled:bg-slate-300
                                        hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 rounded"
                        >
                            Submit
                        </button>
                    </form>
                    {
                        errorMessage && <p>{errorMessage}</p>
                    }
                    <div className="flex flex-col gap-3 items-center mt-5">
                        <button>
                            Google
                        </button>
                    </div>
                    <div className="mt-5">
                        <p className="text-center">
                            {
                                `New user? Register `
                            }
                            <Link href={'/auth/register'}
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