import { useState, useEffect } from "react"
import { Controller } from "react-hook-form"
import ReactSelect from "react-select"
import { FormGroup } from "./FormGroup"

export function TextContainers({ 
  inputArray, 
  register, 
  errors, 
  control,
  setValue
}) {

  const [checkboxStates, setCheckboxStates] = useState({})

  useEffect(() => {
    // Initialize checkbox states for all end_date fields
    const initStates = {}
    inputArray.forEach(input => {
      if(input.name.includes("endDate") || input.type==="date" && input.isEndDate){
        initStates[input.name] = !input.defaultValue // true if value is null
      }
    })
    setCheckboxStates(initStates)
  }, [inputArray])

  const handleCheckboxChange = (name) => {
    const newState = !checkboxStates[name]
    setCheckboxStates(prev => ({ ...prev, [name]: newState }))
    if(newState){
      setValue(name, null)
    }
  }

  return (
    <>
      {inputArray?.map((input, index) => {
        const isEndDate = input.isEndDate
        const checkboxChecked = checkboxStates[input.name]

        return (
          <div key={index} className="flex flex-col w-[90%] justify-center items-center mb-2">
            {input.type === "text" || input.type === "password" ? (
              <input
                type={input.type}
                placeholder={input.placeholder}
                className="rounded w-full border text-center bg-white"
                {...register(input.name, input.validation)}
              />
            ) : input.type === "date" ? (
              <div className="w-full flex flex-col justify-center items-center">
                {isEndDate && (
                  <div className="flex items-center mb-2">
                    <input 
                      type="checkbox"
                      checked={checkboxChecked}
                      onChange={() => handleCheckboxChange(input.name)}
                      className="mr-2"
                    />
                    <span>In Progress</span>
                  </div>
                )}

                {(!isEndDate || !checkboxChecked) && (
                  <input 
                    type="date"
                    className="border w-full"
                    {...register(input.name, input.validation)}
                  />
                )}
              </div>
            ) : input.type === "select" ? (
              <Controller
                name={input.name}
                control={control}
                rules={{ required: "Please select a value" }}
                render={({ field }) => (
                  <ReactSelect {...field} options={input.options} onChange={field.onChange} 
                    className="crud-react-select"
                  />
                )}
              />
            ) : (
              <textarea
                placeholder={input.placeholder}
                className="rounded w-full text-center bg-white lg:h-40 border"
                {...register(input.name, input.validation)}
              />
            )}

            <FormGroup errorMessage={errors?.[input.name]?.message}/>
          </div>
        )
      })}
    </>
  )
}

