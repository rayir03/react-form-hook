import "./App.css";
import { useForm } from "react-hook-form";

const App = () => {

  const { register, handleSubmit, 
    formState:{ errors },
    watch,
    setValue
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  })

  return (
    <form onSubmit={onSubmit}>
      {/* nombre */}
      <label htmlFor="nombre">Nombre</label>
      <input type="text" {...register("nombre", {
        required: {
          value: true,
          message: "El campo nombre es requerido"
        },
        minLength: {
          value: 3,
          message: "El campo nombre debe tener al menos 3 caracteres"
        },
        maxLength: {
          value: 20,
          message: "El campo nombre no debe tener más de 20 caracteres"
        }
      })}/>
      {
        errors.nombre  && <span>{errors.nombre.message}</span>
      }
      
      {/* correo */}

      <label htmlFor="correo">Correo</label>
      <input type="email" autoComplete="correo"{...register("correo", {
        required: {
          value: true,
          message: "El campo correo es requerido"
        },
        
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          message: "Correo no válido"
        },
      })}/>
      {
        errors.correo && <span>Correo requerido</span>
      }

      {/* password */}

      <label htmlFor="password">Password</label>
      <input 
        type="password" 
        name="password" 
        autoComplete="new-password" 
        {...register("password", {
        required: {
          value: true,
          message: "El campo password es requerido"

        },
        minLength: {
          value: 8,
          message: "El campo password debe tener al menos 8 caracteres"

        }
      })}/>
      {
        errors.password && <span>{errors.password.message}</span>
      }

      {/* confirm password */}

      <label htmlFor="confirmarPassword">Confirmar Password</label>
      <input type="password" name="confirmarPassword" autoComplete="new-password"  {...register("confirmarPassword", {
        required: {
          value: true,
          message: "El campo confirmar password es requerido"
        },
        validate: value => value === watch("password") || "Los passwords no coinciden"
      })}/>
      {
        errors.confirmarPassword && <span>{errors.confirmarPassword.message}</span>
      }

      {/* Fecha de nacimiento */}

      <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
      <input 
        type="date" 
        {...register("fechaNacimiento", {
        required: {
          value: true,
          message: "El campo fecha de nacimiento es requerido"
        },
        validate: (value) => {
          const fechaNacimiento = new Date(value)
          const fechaActual = new Date()
          const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
          return edad >= 18 ||  "Debe ser mayor de edad";
        }
      })}/>
      {
        errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>
      }

      {/* pais */}

      <label htmlFor="pais">Pais</label>
      <select {...register("pais")}>
        <option value="mx">México</option>
        <option value="us">Estados Unidos</option>
        <option value="es">España</option>
      </select>

      {
        watch("pais") === "es" && (
          <>
            <input
            type="text"
            placeholder="Provincia"
            {...register("provincia", {
              required: {
                value: true,
                message: "El campo provincia es requerido"
              }
            })}
            >
            </input>
            {
              errors.provincia && <span>{errors.provincia.message}</span>
            }

          </>
        )
      }

      {/* file */}

      <label htmlFor="foto">Foto de Perfil</label>
      <input type="file" onChange={e => {
        setValue("fotoDeUsuario", e.target.files[0].name)
      }}/>

      {/* terminos */}
      <label htmlFor="terminos">Acepto términos y condiciones</label>
      <input type="checkbox" {...register("terminos", {
        required: {
          value: true,
          message: "Debes aceptar los términos y condiciones"
        },
      })}/>

      {
        errors.terminos && <span>{errors.terminos.message}</span>
      }

      <button type="submit">
        Enviar
      </button>

      <pre>
        {JSON.stringify(watch(), null, 2)}
      </pre>
    </form>
  )
}

export default App
