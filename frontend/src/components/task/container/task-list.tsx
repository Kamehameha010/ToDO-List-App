import { TaskItem } from "../card/task-item"

const tasks = [
  {
    "_id": "66b3fa0c1a5e3c4a9f3b8a01",
    "title": "Comprar víveres",
    "description": "Leche, huevos, pan, frutas",
    "priority": "medium",
    "created_at": 1722355920000,
    "status": "active"
  },
  {
    "_id": "66b3fa0c1a5e3c4a9f3b8a02",
    "title": "Enviar reporte mensual",
    "description": "Enviar informe financiero al jefe",
    "priority": "high",
    "created_at": 1722173700000,
    "status": "done"
  },
  {
    "_id": "66b3fa0c1a5e3c4a9f3b8a03",
    "title": "Llamar al médico",
    "description": "Agendar cita de chequeo general",
    "priority": "low",
    "created_at": 1722262800000,
    "status": "active"
  },
  {
    "_id": "66b3fa0c1a5e3c4a9f3b8a04",
    "title": "Estudiar para examen",
    "description": "Revisar capítulos 4 al 6 del libro de matemáticas",
    "priority": "high",
    "created_at": 1722002700000,
    "status": "active"
  },
  {
    "_id": "66b3fa0c1a5e3c4a9f3b8a05",
    "title": "Lavar el auto",
    "description": "Limpiar por dentro y por fuera",
    "priority": "low",
    "created_at": 1722088800000,
    "status": "done"
  }
]



export function TaskList() {

    return (
        <>
            <div className="grid grid-cols-1 gap-8">

                {
                    tasks.map(task => <TaskItem key={task._id} {...task} />)
                }

            </div>
        </>
    )
}