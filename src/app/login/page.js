"use client"
import Image from "next/image";
import { jsPDF } from "jspdf";

export default function Home() {
    // Función para generar y descargar el PDF
    const generarPDF = () => {
        const doc = new jsPDF();
        doc.text("Hola, este es un PDF generado con jsPDF", 10, 10);
        doc.save("ejemplo.pdf"); // Esto descarga el PDF
    };
    return (
        <div>
            <h1>Generador de PDF</h1>
            <button onClick={generarPDF}>Descargar PDF</button>
        </div>
    );
}

