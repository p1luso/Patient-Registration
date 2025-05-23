import React, { useState } from "react";
import { usePatients } from "../../context/patientContext";
import { toast } from "react-toastify";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";

const PatientForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phonePrefix: "+54",
    phoneNumber: "",
    documentPhoto: null,
  });

  const handleClose = () => {
    setFormData({
      fullName: "",
      email: "",
      phonePrefix: "+54",
      phoneNumber: "",
      documentPhoto: null,
    });
    onClose();
  };

  const { newPatient } = usePatients();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      documentPhoto: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.email.endsWith("@gmail.com")) {
      toast.error("El correo debe ser de Gmail", { position: "top-right" });
  
      setFormData((prev) => ({
        ...prev,
        email: prev.email.split("@")[0] + "@gmail.com",
      }));
  
      return;
    }
  
    const cleanedPhoneNumber = formData.phoneNumber.replace(/\D/g, "");
    const fullPhoneNumber = `${formData.phonePrefix}${cleanedPhoneNumber}`;
  
    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phoneNumber", fullPhoneNumber);
    formDataToSend.append("documentPhoto", formData.documentPhoto);
  
    try {
      const response = await newPatient(formDataToSend);
  
      if (response.success) {
        toast.success("Paciente registrado correctamente", { position: "top-right" });
        setTimeout(() => {
          window.location.reload();
        }, 500);
        onClose();
      } else {
        toast.error(response.message || "Ocurrió un error inesperado", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ocurrió un error inesperado", { position: "top-right" });
    }
  };
  

  return (
    <div className="patient-form-overlay">
      <div className="patient-form-container">
        <button
          onClick={handleClose}
          className="close-button"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          &times;
        </button>
        <h2>Agregar Paciente</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label htmlFor="fullName">Nombre Completo</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
              onInvalid={(e) =>
                e.target.setCustomValidity("Solo se permiten correos de Gmail")
              }
              onInput={(e) => e.target.setCustomValidity("")}
              required
            />
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{ flex: "0.3" }}>
              <label htmlFor="phonePrefix">Prefijo</label>
              <input
                type="text"
                id="phonePrefix"
                name="phonePrefix"
                value={formData.phonePrefix}
                onChange={handleChange}
                required
                maxLength="4"
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ flex: "0.7" }}>
              <label htmlFor="phoneNumber">Número de Teléfono</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
                required
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="documentPhoto">Foto del Documento</label>
            <input
              type="file"
              id="documentPhoto"
              name="documentPhoto"
              accept="image/jpeg"
              onChange={handleFileChange}
              required
            />
          </div>
          <div>
            <button type="submit">Agregar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
