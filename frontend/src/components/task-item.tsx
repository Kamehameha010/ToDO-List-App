
export function TaskItem (){
    return(
        <>
        <div className="border rounded-md p-4 border-stone-200 flex items-start justify-between shadow-sm max-w-xl">
        <div className="flex items-start gap-3"> 
            <input type="checkbox" name="status" className="mt-4"/>
            <div>
                <h3>Nombre de tarea</h3>
                <p>Descripcion de la tarea</p>
            </div>
        </div>
        </div>
        </>
    )
}