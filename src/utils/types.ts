export type InputType = {
    value:string | string[],
    error:string
}

export type RegistrationKeys = keyof RegistrationType;

export type RegistrationType = {
    full_name:InputType,
    email:InputType,
    password:InputType,
    role:InputType,
    speedBuildGoals:InputType,
    teamSize:InputType,
    frameworks:InputType
}