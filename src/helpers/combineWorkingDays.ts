import {Days, IWorkingDays} from "../types";

function combineWorkingDays(workingDays: [Date]){
    const days: [object:IWorkingDays] = [{}]

    workingDays.forEach(day => {
        const obj = {
                    working_dates: day,
                    working_days_string: Days[new Date(day).getDay()],
                    working_days: new Date(day).getDate(),
                }

                days.push(obj)
    })
    days.shift()
    return days
}

export {combineWorkingDays}