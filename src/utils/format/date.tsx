export const formatDate = (date:string) =>{
    const splitDate = date.split("T")[0].split("-")
    if(splitDate.length === 3){
        const newDate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`
        return newDate;
    }
    return Error;
}
