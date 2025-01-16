import React, { useState } from "react";
import styles from "./ModalEdit.module.css";

function ModalEdit({ video, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    titulo: video.titulo,
    urlCapa: video.urlCapa,
    categoria: video.categoria,
    link: video.link,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.titulo ||
      !formData.urlCapa ||
      !formData.categoria ||
      !formData.link
    ) {
      alert("Todos os campos precisam ser preenchidos.");
      return;
    }

    const hasChanges = Object.keys(formData).some(
      (key) => formData[key] !== video[key]
    );

    if (hasChanges) {
      const updatedVideo = { ...video, ...formData };
      onUpdate(updatedVideo);
    } else {
      alert("Não há alterações para salvar.");
    }
  };

  const handleClear = () => {
    setFormData({
      titulo: "",
      urlCapa: "",
      categoria: "",
      link: "",
    });
  };

  if (!video) return null;

  return (
    <div className={`${styles.modal} ${styles.show}`}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>
          X
        </button>
        <h2 className={styles.editarCard}>EDITAR CARD</h2>
        <form onSubmit={handleSubmit}>
          <label className={styles.formLabel}>Título</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleInputChange}
            className={styles.inputField}
          />

          <label className={styles.formLabel}>URL da Capa</label>
          <input
            type="text"
            name="urlCapa"
            value={formData.urlCapa}
            onChange={handleInputChange}
            className={styles.inputField}
          />

          <label className={styles.formLabel}>Categoria</label>
          <div className={styles.inputGroup}>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              className={styles.inputField}
            >
              <option value="">Selecione a categoria</option>
              <option value="Front End">Front End</option>
              <option value="Back End">Back End</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>

          <label className={styles.formLabel}>Link do Vídeo</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            className={styles.inputField}
          />

          <div className={styles.actionButtons}>
            <button type="submit" className={styles.save}>
              SALVAR
            </button>
            <button
              type="button"
              className={styles.clear}
              onClick={handleClear}
            >
              LIMPAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEdit;
