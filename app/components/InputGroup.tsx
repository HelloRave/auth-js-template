import { DetailedHTMLProps, Fragment, InputHTMLAttributes } from "react";
import {
    DeepMap, FieldError, FieldValues, Path, RegisterOptions, UseFormRegister
} from "react-hook-form";

export type FormInputProps<TFormValues extends FieldValues> = {
    readonly label: string;
    readonly name: Path<TFormValues>;
    readonly register: UseFormRegister<TFormValues>;
    readonly errors?: Partial<DeepMap<TFormValues, FieldError>>;
    readonly rules?: RegisterOptions;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export default function InputGroup<TFormValues extends FieldValues>({
    label, name, register, errors, rules, ...props
}: FormInputProps<TFormValues>) {
    return (
        <Fragment>
            <label htmlFor={name} className="block text-sm font-medium text-gray-900">
                {label}
            </label>
            <input
                className={`block mt-2 w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900
                    shadow-sm ring-1 ring-inset focus:outline-none
                    ${errors?.[name] ? 'ring-pink-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500' : 'ring-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500'}`}
                {...props}
                {...register(name, rules)}
            />
            {
                errors?.[name] && (
                    <p className="text-pink-500">{errors[name].message}</p>
                )
            }
        </Fragment>
    )
}
