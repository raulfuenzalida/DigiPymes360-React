import { useEffect, useState } from "react";
import gato_naranja from "../img/gato_naranja.jpg";

export default function Perfil() {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("UserData");
        if (storedUser) setUserData(JSON.parse(storedUser));
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        const fieldMap = {
            emailTextInput: "email",
            addressTextInput: "direccion",
            telefonoTextInput: "telefono",
        };
        setUserData((prev) => ({ ...prev, [fieldMap[id]]: value }));
    };

    const handleUpdateAll = async () => {
        try {
            const params = new URLSearchParams({
                id: userData.id_usuario,
                nuevo_email: userData.email,
                nueva_password: userData.password,
                direccion: userData.direccion,
                telefono: userData.telefono,
            });

            const response = await fetch(`http://54.236.21.136:8080/api/v2/user/putAddressPhone?${params.toString()}`, {
                method: "PUT",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(JSON.stringify(errorData));
            }

            const data = await response.json();
            console.log("Actualización exitosa:", data);
            alert("Datos actualizados correctamente.");
        } catch (error) {
            console.error("Error en actualización:", error);
            alert("Error al actualizar: " + error.message);
        }
    };


    if (!userData)
        return <p className="text-center mt-5">Cargando perfil...</p>;

    return (
        <main className="min-h-screen">
            <form className="perfilUsuario" onSubmit={(e) => e.preventDefault()}>
                <div className="mt-4 text-center">
                    <h3><strong>Perfil de {userData.nombre}</strong></h3>
                </div>

                <div className="text-center mb-4">
                    <img src={gato_naranja} className="rounded-circle" alt="perfil" width="120" />
                </div>

                <div className="mb-3">
                    <label htmlFor="emailTextInput" className="form-label">Correo</label>
                    <input
                        type="email"
                        id="emailTextInput"
                        className="form-control"
                        value={userData.email || ""}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="addressTextInput" className="form-label">Dirección</label>
                    <input
                        type="text"
                        id="addressTextInput"
                        className="form-control"
                        value={userData.direccion || ""}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="telefonoTextInput" className="form-label">Teléfono</label>
                    <input
                        type="text"
                        id="telefonoTextInput"
                        className="form-control"
                        value={userData.telefono || ""}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>

                {message && <p className="text-center mt-3">{message}</p>}

                <div className="d-flex justify-content-center gap-3 mt-4">

                    <button
                        type="button"
                        className="btn btn-danger px-5"
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = "/login";
                        }}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </form>
        </main>
    );
}
