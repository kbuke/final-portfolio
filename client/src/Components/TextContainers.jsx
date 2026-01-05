import { useEffect, useState } from "react";
import { FormGroup } from "./FormGroup";
import ReactSelect from "react-select"
import { Controller } from "react-hook-form";

export function TextContainers({ 
  inputArray, 
  register, 
  errors, 
  control,
  setValue,
  unregister,
  endDate
}) {
  const [inProgress, setInProgress] = useState(true)

  useEffect(() => {
    if(inProgress && setValue && endDate){
      setValue(endDate, null)
      unregister(endDate)
    }
  }, [inProgress, setValue, endDate])

  return (
    <>
      {inputArray?.map((input, index) => (
        <div key={index} className="flex flex-col w-[90%] justify-center items-center mb-2">
          {input.type === "text" || input.type === "password"? (
            <input
              type={input.type}
              placeholder={input.placeholder}
              className="rounded w-full border text-center bg-white"
              {...register(input.name, input.validation)}
            />
          ) : 
          input?.type === "date"
            ?
            <div className="w-full flex flex-col justify-center items-center">
              <p className="font-bold">
                {input?.label}
              </p>
              {input?.endDate?
                inProgress
                  ? <div className="flex flex-col justify-center items-center">
                    <input 
                      type="checkbox"
                      checked={inProgress}
                      onChange={() => setInProgress(!inProgress)}
                    />
                    <p>In Progress</p>
                  </div>
                  : <div className="flex flex-col w-full items-center justify-center">
                      <div className="w-full justify-center items-center flex flex-col">
                        <input 
                          type="checkbox"
                          checked={inProgress}
                          onChange={() => setInProgress(!inProgress)}
                          
                        />
                        <p>In Progress?</p>
                      </div>

                      <input 
                        type={input?.type}
                        className="border w-full"
                        {...register(input.name, input.validation)}
                      />
                  </div>
                :
                <input 
                  type={input?.type}
                  className="border w-full"
                  {...register(input.name, input.validation)}
                />
              }
            </div>
            :
            input?.type === "select" ? (
              <Controller
                name={input.name}
                control={control}
                rules={{ required: "Please select a tech type" }}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    options={input.options}
                    onChange={field.onChange}
                  />
                )}
              />
            ) :
            (
              <textarea
                placeholder={input.placeholder}
                className="rounded w-full text-center bg-white lg:h-40 border"
                {...register(input.name, input.validation)}
              />
            )}
          <FormGroup errorMessage={errors?.[input.name]?.message}/>
        </div>
      ))}
    </>
  )
}
