import { FormGroup } from "./FormGroup";

export function TextContainers({ inputArray, register, errors }) {
  return (
    <>
      {inputArray?.map((input, index) => (
        <div key={index} className="flex flex-col w-full justify-center items-center mb-2">
          {input.type === "text" || input.type === "date" || input.type === "password"? (
            <input
              type={input.type}
              placeholder={input.placeholder}
              className="rounded w-9/10 text-center bg-white"
              {...register(input.name, input.validation)}
            />
          ) : (
            <textarea
              placeholder={input.placeholder}
              className="rounded w-9/10 text-center bg-white h-20"
              {...register(input.name, input.validation)}
            />
          )}

          <FormGroup errorMessage={errors?.[input.name]?.message}/>
        </div>
      ))}
    </>
  )
}
